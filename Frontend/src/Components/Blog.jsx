import React from "react";
import { Link } from "react-router-dom";

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
    Link:"https://myhealthmeter.com/blog/details/micro-nutrients-deficiency"
  },
  {
    id: 6,
    title: "The Power of Protein in Your Diet",
    image:
      "https://i.pinimg.com/1200x/df/87/52/df8752cfdaeb689633f2ae0d5f5b94de.jpg",
    description:
      "Proteins are the main building blocks of your body. They’re used to make muscle, organs, and skin, as well as enzymes, hormones. Do you know how much protein you need daily?",
    Link:"https://www.healthline.com/nutrition/how-much-protein-per-day"
  },
  {
    id: 7,
    title: "Calorie Needs for Different Lifestyles",
    image:
      "https://i.pinimg.com/736x/b8/38/8b/b8388b0891ce2db7bf274d88e4b4e67a.jpg",
    description:
      "Calorie denotes a unit of energy that you derive from the food and drinks you consume and the amount of energy you use to perform various physical activities.",
    Link:"https://www.apollohospitals.com/diseases-and-conditions/how-much-calories-do-i-need-per-day"
  },

];

const Blog = () => {
  return (
    <div
      className="h-[70vh] bg-green-400 py-5 px-15 m-25 mx-40 rounded-lg  overflow-hidden"
      id="blog"
    >
      <h1 className="text-3xl md:text-2xl font-serif font-bold text-shadow-white text-black mb-10">
        Do you know ?
        <hr className="mt-1 font-extrabold" />
      </h1>


      <div className="blog-slider">
        <div className="blog-track">

          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <img src={blog.image} alt={blog.title} />
              <div className="content">
                <h2>{blog.title}</h2>
                <p>{blog.description}</p>
              </div>
              <a href={blog.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm font-light mt-1 ml-4">
                Read More
              </a>
            </div>
          ))}

          {blogs.map((blog) => (
            <div key={`dup-${blog.id}`} className="blog-card">
              <img src={blog.image} alt={blog.title} />
              <div className="content">
                <h2>{blog.title}</h2>
                <p>{blog.description}</p>
              </div>
              <a href={blog.Link}
                target="_blank"
                rel="noopener noreferrer" className="text-blue-500  text-sm font-light ml-4 mt-1">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
