import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "Types of Amino Acids and Their Roles",
    image:
      "https://i.pinimg.com/1200x/21/ee/a6/21eea62375d7cde6d5d07bf7d5ad8da5.jpg",
    description:
      "Amino acids are the building blocks of proteins. They play vital roles in muscle growth, tissue repair, and enzyme production. Learn the difference between essential and non-essential amino acids.",
    Link: "https://my.clevelandclinic.org/health/articles/22243-amino-acids"
  },
  {
    id: 2,
    title: "Understanding Different Body Types",
    image:
      "https://i.pinimg.com/736x/ca/83/b0/ca83b0374e2c2845ca72f6d8cc5b115c.jpg",
    description:
      "Every individual has a unique body type — ectomorph, mesomorph, or endomorph. Understanding yours can help you optimize your diet and workout routine for better fitness results.",
    Link: "https://www.verywellhealth.com/body-types-11735067"
  },
  {
    id: 3,
    title: "Importance of Balanced Nutrition",
    image:
      "https://i.pinimg.com/1200x/06/b2/78/06b278eac200a74161b0efef6a4c9e67.jpg",
    description:
      "Balanced nutrition ensures that your body gets the right amount of vitamins, minerals, and macronutrients to function efficiently and prevent lifestyle diseases.",
    Link: "https://www.narayanahealth.org/blog/importance-of-balanced-diet-for-a-healthy-lifestyle"
  },
  {
    id: 4,
    title: "Role of Water in Fitness and Health",
    image:
      "https://i.pinimg.com/1200x/20/0a/99/200a99b83a6960a3e114246ffcbdcbc8.jpg",
    description:
      "Water regulates body temperature, and flushes out toxins. Staying hydrated is one of the simplest ways to maintain good health and performance.  Do you know how much water you should drink daily?",
    Link: "https://www.apexhospitals.com/blogs-articles/Role-of-Water-in-a-Healthy-Lifestyle"
  },
  {
    id: 5,
    title: "Micronutrients You Shouldn’t Ignore",
    image:
      "https://www.lifecoachcode.com/wp-content/uploads/2024/05/Unveiling-the-Vital-Role-of-Micronutrients-in-Supporting-Optimal-Health-All-You-Need-to-Know.png",
    description:
      "Micronutrients like iron, calcium, and vitamin D may be required in small amounts, but they have a huge impact on energy levels, bone strength, and immunity.",
    Link: "https://myhealthmeter.com/blog/details/micro-nutrients-deficiency"
  },
  {
    id: 6,
    title: "The Power of Protein in Your Diet",
    image:
      "https://i.pinimg.com/1200x/df/87/52/df8752cfdaeb689633f2ae0d5f5b94de.jpg",
    description:
      "Proteins are the main building blocks of your body. They’re used to make muscle, organs, and skin, as well as enzymes, hormones. Do you know how much protein you need daily?",
    Link: "https://www.healthline.com/nutrition/how-much-protein-per-day"
  },
  {
    id: 7,
    title: "Calorie Needs for Different Lifestyles",
    image:
      "https://i.pinimg.com/736x/b8/38/8b/b8388b0891ce2db7bf274d88e4b4e67a.jpg",
    description:
      "Calorie denotes a unit of energy that you derive from the food and drinks you consume and the amount of energy you use to perform various physical activities.",
    Link: "https://www.apollohospitals.com/diseases-and-conditions/how-much-calories-do-i-need-per-day"
  },

];

const Blog = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section
      id="blog"
      className="py-12 md:py-20 px-4 md:px-8 lg:px-12 flex flex-col items-center bg-transparent font-body relative overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brandGreen-500/10 rounded-full filter blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brandOrange-500/10 rounded-full filter blur-[120px] pointer-events-none -z-10"></div>

      <motion.div
        className="w-full max-w-7xl flex flex-col items-center z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-5 text-center"
        >
          Do you <span className="text-brandGreen-500">know?</span>
        </motion.h2>

        <motion.div variants={itemVariants} className="w-full relative max-w-[100vw]">
          <div
            className="w-full relative"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
            }}
          >
            {/* The scrollable track */}
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-[10vw] sm:px-[5vw]">
              {blogs.map((blog) => (
                <div key={blog.id} className="blog-card group snap-center shrink-0 w-[85vw] sm:w-[350px] flex flex-col h-full bg-white/40 backdrop-blur-md rounded-2xl border border-surface-border">
                  <div className="relative h-56 sm:h-48 overflow-hidden rounded-t-2xl shrink-0">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-text-primary mb-2 line-clamp-2">{blog.title}</h3>
                      <p className="text-text-secondary text-xs sm:text-sm leading-relaxed line-clamp-3">{blog.description}</p>
                    </div>

                    {/* Upgraded Button */}
                    <a href={blog.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 sm:mt-6 flex items-center justify-center w-full py-2.5 sm:py-3 px-4 bg-brandGreen-500/10 hover:bg-brandGreen-500/20 text-brandGreen-600 font-bold text-sm rounded-xl transition-all duration-300 group/btn">
                      <span>Read More</span>
                      <svg className="w-4 h-4 ml-2 transform transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Blog;
