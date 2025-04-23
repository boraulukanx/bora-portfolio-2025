import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bergamaLogo from "../assets/bergamaLogo.png";
import visionLogo from "../assets/visionLogo.jpeg";
import hasatyoluLogo from "../assets/logisticsLogo.png";

// Animasyon varyantları
const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

const staggerContainer = (staggerChildren, delayChildren) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};

// Statik proje verileri
const projectData = [
  {
    id: "bergama-search",
    name: "Bergama - Semantic Search Engine",
    description:
      "An entrepreneurship project with semantic search capabilities using embedding algorithms and Milvus to find relevant paragraphs from a book database based on search queries.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "python",
        color: "green-text-gradient",
      },
      {
        name: "milvus",
        color: "pink-text-gradient",
      },
      {
        name: "embedding",
        color: "purple-text-gradient",
      },
    ],
    image: bergamaLogo,
    source_code_link: "",
    live_demo_link: "http://20.199.76.22/",
  },
  {
    id: "vision-community",
    name: "Vision Beyond - Support Community App",
    description:
      "A community platform for Turkish-speaking students studying abroad, providing psychological support. Built as a blog/forum website with full-stack technologies.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
      {
        name: "express",
        color: "orange-text-gradient",
      },
    ],
    image: visionLogo,
    source_code_link: "https://github.com/boraulukanx/vision-project",
    live_demo_link: "https://vision-project.onrender.com",
  },
  {
    id: "hasatyolu-transportation",
    name: "Hasatyolu Nakliyat - Logistics App",
    description:
      "A comprehensive MERN stack logistics application for transportation and shipping management. Users can track inventory, monitor shipments in real-time, view detailed delivery statistics, and generate reports through an intuitive dashboard interface.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "express",
        color: "pink-text-gradient",
      },
      {
        name: "nodejs",
        color: "orange-text-gradient",
      },
    ],
    image: hasatyoluLogo,
    source_code_link:
      "https://github.com/boraulukanx/hasatyolu-transportation-frontend",
    live_demo_link: "",
  },
  {
    id: "ecommerce-app",
    name: "E-Commerce App",
    description:
      "A uniquely designed e-commerce application with user authentication, category browsing, and shopping cart functionality. Built with modern web technologies and deployed via Firebase.",
    tags: [
      {
        name: "html5",
        color: "blue-text-gradient",
      },
      {
        name: "css",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
      {
        name: "react",
        color: "orange-text-gradient",
      },
      {
        name: "firebase",
        color: "purple-text-gradient",
      },
    ],
    image:
      "data:image/png;base64,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",
    source_code_link: "https://github.com/",
    live_demo_link: "https://e-commerce-boraulukan-new.web.app/home",
  },
  {
    id: "certificate-tracking",
    name: "Certificate Tracking App",
    description:
      "A dissertation project creating a certificate tracking application for maximizing efficiency in project and health & safety management, featuring password security with hashing techniques.",
    tags: [
      {
        name: "java",
        color: "blue-text-gradient",
      },
      {
        name: "mysql",
        color: "green-text-gradient",
      },
      {
        name: "netbeans",
        color: "pink-text-gradient",
      },
      {
        name: "gcp",
        color: "purple-text-gradient",
      },
    ],
    image:
      "https://bora-ulukan-portfolio-5f7b3.web.app/static/media/dissertation.1e3eee4bb9567506577d.png",
    source_code_link: "https://github.com/boraulukanx/Dissertation",
    live_demo_link: "",
  },
];

const Projects = () => {
  // Tüm projeleri doğrudan gösteriyoruz
  const projects = projectData;

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="min-h-screen pt-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            y: [0, 15, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[100px] left-[100px] w-[200px] h-[200px] bg-blue-400/10 rounded-full blur-[90px]"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[100px] right-[100px] w-[250px] h-[250px] bg-purple-400/10 rounded-full blur-[90px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeIn("down", "tween", 0.1, 1)}
          className="text-center mb-16"
        >
          <p className="text-secondary uppercase tracking-wider text-[14px] mb-2">
            My work
          </p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Projects.
          </h2>
          <motion.p
            variants={fadeIn("up", "tween", 0.3, 1)}
            className="mt-3 text-secondary text-[17px] max-w-3xl mx-auto leading-[30px]"
          >
            Following projects showcase my skills and experience through
            real-world examples of my work. Each project is briefly described
            with links to code repositories and live demos.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          className="mt-12 flex flex-wrap justify-center gap-7"
        >
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const ProjectCard = ({
  index,
  id,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.75)}
      whileHover={{ y: -10 }}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-full flex flex-col"
    >
      <Link to={`/projects/${id}`} className="flex-grow">
        <div className="relative w-full h-[230px] overflow-hidden rounded-2xl">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl transition-all duration-500 hover:scale-110"
          />

          <div className="absolute inset-0 flex justify-end m-3 gap-2"></div>
        </div>

        <div className="mt-5">
          <motion.h3
            whileHover={{ x: 5 }}
            className="text-white font-bold text-[24px] cursor-pointer"
          >
            {name}
          </motion.h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Link>

      <div className="mt-4 flex gap-3">
        <a
          href={live_demo_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-4 bg-black-200 text-white rounded-md text-sm text-center hover:bg-secondary hover:text-black transition-all duration-300"
        >
          Live Demo
        </a>
        <Link
          to={`/projects/${id}`}
          className="flex-1 py-2 px-4 border border-secondary text-white rounded-md text-sm text-center hover:bg-secondary hover:text-black transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default Projects;
