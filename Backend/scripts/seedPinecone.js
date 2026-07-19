import fs from 'fs';
import path from 'path';
import PDFParser from "pdf2json";
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables from the parent directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const PINECONE_API_KEY = process.env.VITE_PINECONE_API_KEY;
const GEMINI_API_KEY = process.env.VITE_GOOGLE_API_KEY;

if (!PINECONE_API_KEY || !GEMINI_API_KEY) {
    console.error("Missing API keys in .env. Ensure VITE_PINECONE_API_KEY and VITE_GOOGLE_API_KEY are set.");
    process.exit(1);
}

const pc = new Pinecone({ apiKey: PINECONE_API_KEY });
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

async function seed() {
    try {
        console.log("1. Reading PDF file...");
        const pdfPath = path.join(__dirname, '../Public/FuelFit_Brand_Document.pdf');
        
        if (!fs.existsSync(pdfPath)) {
            console.error(`PDF not found at ${pdfPath}`);
            return;
        }

        const pdfParser = new PDFParser(this, 1);
        
        pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
        pdfParser.on("pdfParser_dataReady", async pdfData => {
            const text = pdfParser.getRawTextContent();
            
            if (!text || text.trim() === '') {
                console.error("No text could be extracted from the PDF.");
                return;
            }

            console.log("2. Chunking text...");
            // Simple chunking strategy: split by double newlines or large paragraphs
            const rawChunks = text.split(/\r?\n/);
            let chunks = [];
            let currentChunk = "";
            
            for (const chunk of rawChunks) {
                const cleanChunk = chunk.replace(/\r?\n/g, ' ').trim();
                if (!cleanChunk || cleanChunk.startsWith("----------------") || cleanChunk.startsWith("Page")) continue;
                
                if (currentChunk.length + cleanChunk.length > 800) {
                    chunks.push(currentChunk);
                    currentChunk = cleanChunk;
                } else {
                    currentChunk += (currentChunk ? " " : "") + cleanChunk;
                }
            }
            if (currentChunk) chunks.push(currentChunk);

            console.log(`Created ${chunks.length} chunks. Generating embeddings...`);

            const index = pc.index("fuelfit");
            let vectors = [];

            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                // Generate embedding using Gemini and slice to 768 to match index
                const result = await embeddingModel.embedContent(chunk);
                const embedding = result.embedding.values.slice(0, 768);

                vectors.push({
                    id: `chunk-${i}`,
                    values: embedding,
                    metadata: {
                        text: chunk
                    }
                });
                
                console.log(`Embedded chunk ${i + 1}/${chunks.length}`);
                
                // Sleep slightly to avoid rate limits
                await new Promise(r => setTimeout(r, 500));
            }

            console.log("3. Upserting to Pinecone...");
            
            // Upsert in batches of 100
            const batchSize = 100;
            for (let i = 0; i < vectors.length; i += batchSize) {
                const batch = vectors.slice(i, i + batchSize);
                if (batch.length === 0) continue;
                console.log(`Upserting batch of size ${batch.length}`);
                
                try {
                    await index.upsert({ records: batch });
                    console.log(`Upserted batch ${Math.floor(i / batchSize) + 1}`);
                } catch (e) {
                    console.error("Upsert error:", e);
                }
            }

            console.log("✅ Successfully seeded Pinecone with FuelFit knowledge base!");
        });

        pdfParser.loadPDF(pdfPath);
        
    } catch (error) {
        console.error("Error during seeding process:", error);
    }
}

seed();
