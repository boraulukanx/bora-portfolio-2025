import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    id: "e-commerce-platform",
    name: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product listings, shopping cart, user authentication, and payment processing capabilities.",
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
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    source_code_link: "https://github.com/",
    live_demo_link: "https://example.com/",
  },
  {
    id: "social-media-dashboard",
    name: "Social Media Dashboard",
    description:
      "An analytics dashboard for social media monitoring with real-time data visualization and trend analysis tools.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    source_code_link: "https://github.com/",
    live_demo_link: "https://example.com/",
  },
  {
    id: "task-management-app",
    name: "Task Management App",
    description:
      "A collaborative task management application with features like drag-and-drop task organization, user assignment, and deadline notifications.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    source_code_link: "https://github.com/",
    live_demo_link: "https://example.com/",
  },
  {
    id: "portfolio-website",
    name: "Portfolio Website",
    description:
      "A responsive portfolio website built with React, Tailwind CSS and Framer Motion for smooth animations and transitions.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "framer-motion",
        color: "pink-text-gradient",
      },
    ],
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    source_code_link: "https://github.com/",
    live_demo_link: "https://example.com/",
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

          <div className="absolute inset-0 flex justify-end m-3 gap-2">
            <div
              onClick={(e) => {
                e.preventDefault();
                window.open(source_code_link, "_blank");
              }}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-1/2 h-1/2 object-contain"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="white"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
          </div>
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
