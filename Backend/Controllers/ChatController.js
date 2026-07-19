import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const pc = new Pinecone({ apiKey: process.env.VITE_PINECONE_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.VITE_GOOGLE_API_KEY);
const groq = new Groq({ apiKey: process.env.VITE_GROQ_API_KEY });

const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

export const askBot = async (req, res) => {
    try {
        const { question } = req.body;
        
        if (!question) {
            return res.status(400).json({ success: false, message: "Question is required" });
        }

        // 1. Embed the user's question using Gemini and slice to 768
        const result = await embeddingModel.embedContent(question);
        const queryEmbedding = result.embedding.values.slice(0, 768);

        // 2. Search Pinecone for relevant context
        const index = pc.index("fuelfit");
        const queryResponse = await index.query({
            vector: queryEmbedding,
            topK: 4,
            includeMetadata: true
        });

        // 3. Assemble the context from Pinecone matches
        let contextText = "";
        if (queryResponse.matches && queryResponse.matches.length > 0) {
            contextText = queryResponse.matches
                .map(match => match.metadata.text)
                .join("\n\n");
        }

        // 4. Construct prompt and call Groq LLM
        const systemPrompt = `You are the FuelFit Assistant, an AI built to help users understand and navigate the FuelFit fitness application.
Your goal is to be helpful, concise, and energetic. 

CRITICAL FORMATTING RULES:
1. Always structure your responses using line breaks. Do not send giant walls of text.
2. Use bullet points (using standard dashes "- " or numbers) when listing features, steps, or benefits to make it easy to read.
3. Keep paragraphs short (1-2 sentences maximum).
4. Do NOT use markdown bold/italics (like **bold**) because the frontend chat widget does not parse markdown.

Use the following FuelFit knowledge base context to answer the user's question. 
If the answer is not contained in the context, politely inform the user that you don't know and advise them to use the Feedback option to contact the Admin.
Do not invent information outside of the provided context.

Context:
${contextText}
`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.2,
            max_tokens: 250,
        });

        const answer = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

        res.status(200).json({ success: true, answer });

    } catch (error) {
        console.error("Error in askBot controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
