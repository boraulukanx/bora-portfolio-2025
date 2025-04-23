import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
        staggerChildren: 0,
        delayChildren: 0,
      },
    },
  };
};

// Detaylı proje verileri
const projectsDetailed = [
  {
    id: "hasatyolu-transportation",
    name: "Hasatyolu Nakliyat Logistics",
    description:
      "A comprehensive MERN stack logistics application for transportation and shipping management. Users can track inventory, monitor shipments in real-time, view detailed delivery statistics, and generate reports through an intuitive dashboard interface.",
    longDescription:
      "Hasatyolu Nakliyat Logistics is a powerful MERN stack web application designed to streamline logistics operations for transportation companies. This comprehensive platform offers end-to-end management of shipping logistics, from inventory tracking to delivery confirmation. The application features an intuitive dashboard that provides real-time monitoring of shipments, detailed delivery statistics, and customizable reporting tools. With secure user authentication, role-based access controls, and a responsive design that works across all devices, Hasatyolu Nakliyat Logistics helps transportation companies optimize their operations, reduce costs, and improve customer satisfaction.",
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
    challenges:
      "Creating a robust logistics tracking system presented several key challenges: developing a scalable database structure capable of handling complex relationships between products, shipments, and delivery routes; implementing real-time tracking capabilities that update across all user interfaces; ensuring data security for sensitive logistics information; and designing an intuitive user interface that provides comprehensive information without overwhelming users.",
    solutions:
      "To address these challenges, we implemented MongoDB for its flexible document structure, which efficiently handles the complex relationships in logistics data. Real-time updates were achieved through Socket.IO, providing immediate status changes across all connected clients. For security, we implemented JWT authentication with role-based access controls. The frontend was built with React, incorporating responsive design principles and interactive data visualization tools that present complex logistics information in an accessible format. The Express/Node.js backend includes optimized API endpoints for fast data retrieval even under heavy load, ensuring the application remains responsive during peak usage periods.",

    live_demo_link: "https://hasatyolu-logistics.netlify.app",
  },
  {
    id: "bergama-search",
    name: "Bergama - Semantic Search Engine - Enterpreneurship",
    description:
      "An entrepreneurship project with semantic search capabilities using embedding algorithms and Milvus to find relevant paragraphs from a book database based on search queries.",
    longDescription: `
      Bergama is an innovative entrepreneurship project that revolutionizes the way people search for information in books. Using advanced semantic search capabilities powered by embedding algorithms and Milvus vector database, Bergama allows users to find relevant paragraphs from a comprehensive book database based on their search queries.
      
      As a software engineer and full stack developer on this project, I've contributed to creating a seamless experience where users can enter a topic or question in the search bar, and the system returns the most semantically relevant paragraphs along with detailed page and paragraph information from the book database.
      
      The project combines a React.js frontend with a Python backend, providing a modern and intuitive user interface while leveraging Python's powerful machine learning capabilities for the semantic search functionality.
      
      Notably, this project was submitted to Y Combinator, highlighting its potential and innovative approach to information retrieval.
    `,
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
    ],
    image: bergamaLogo,
    challenges: `
      Throughout the development of Bergama, several complex challenges were addressed:
      
      1. **Vector Search Optimization**: Implementing efficient vector search algorithms to handle large-scale book databases while maintaining fast query response times.
      
      2. **Semantic Relevance**: Ensuring the search results were truly semantically relevant to user queries, requiring careful fine-tuning of embedding models.
      
      3. **Integration Complexity**: Bridging the React.js frontend with the Python backend required thoughtful API design and seamless data flow.
      
      4. **Database Management**: Creating and maintaining a structured database of books with indexed paragraphs for efficient retrieval.
    `,
    solutions: `
      The technological solutions implemented in this project include:
      
      1. **Embedding Algorithms** for converting text into semantic vectors
      2. **Milvus Vector Database** for efficient similarity search
      3. **RESTful API** built with Python for backend services
      4. **React.js** for building a responsive user interface
      5. **Vector Similarity Scoring** to rank results by relevance
      6. **Structured Book Database** with paragraph-level indexing
    `,
    source_code_link: "",
    live_demo_link: "http://20.199.76.22/",
  },
  {
    id: "vision-community",
    name: "Vision - Support Community",
    description:
      "A community platform for Turkish-speaking students studying abroad, providing psychological support. Built as a blog/forum website with full-stack technologies.",
    longDescription: `
      Vision is a specialized community platform designed to provide psychological support to Turkish-speaking students studying abroad. As a founding member and the designer of this platform, I've helped create a safe space where students can share experiences, seek advice, and find support from peers facing similar challenges.
      
      The platform functions as a blog/forum website where users can create accounts, post questions or stories, comment on others' posts, and access resources specifically tailored to the psychological wellbeing of international students.
      
      Built using a full-stack approach with React, Node.js, Express, and MongoDB, Vision delivers a seamless and intuitive user experience while providing robust backend functionality.
      
      The current scope focuses on Turkish-speaking students, but the platform is designed with scalability in mind to potentially accommodate other language communities in the future.
    `,
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
    challenges: `
      Developing Vision presented unique challenges:
      
      1. **Cultural Sensitivity**: Creating a platform that addresses the specific cultural needs and challenges faced by Turkish students abroad.
      
      2. **Community Building**: Establishing an initial user base and fostering active participation in the early stages of the platform.
      
      3. **Content Moderation**: Implementing systems to ensure all content remains supportive and constructive while respecting user privacy.
      
      4. **Resource Management**: Curating and organizing psychological support resources that are both accessible and relevant to the target audience.
    `,
    solutions: `
      Technical solutions implemented include:
      
      1. **React** for a responsive frontend interface
      2. **Node.js and Express** for server-side application logic
      3. **MongoDB** for flexible data storage and retrieval
      4. **User Authentication** with secure credential management
      5. **Responsive Design** for seamless access across devices
      6. **Forum and Blog Functionality** with sophisticated content organization
    `,
    live_demo_link: "https://vision-project.onrender.com",
  },
  {
    id: "ecommerce-app",
    name: "E-Commerce Application",
    description:
      "A uniquely designed e-commerce application with user authentication, category browsing, and shopping cart functionality. Built with modern web technologies and deployed via Firebase.",
    longDescription: `
      This e-commerce application features a unique and contemporary design implemented with HTML5, CSS, JavaScript, and React. The project demonstrates my ability to create fully functional commercial platforms with user authentication, product browsing, and shopping cart functionality.
      
      The application allows users to:
      • Sign up and log in with secure authentication
      • Browse products by categories
      • Search for specific products
      • Add items to shopping cart
      • Manage cart contents
      • Complete the checkout process
      
      Deployed via Firebase, the application benefits from reliable hosting, real-time database functionality, and secure authentication services, creating a complete and production-ready e-commerce solution.
    `,
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
    challenges: `
      The development process included these challenges:
      
      1. **User Experience Design**: Creating an intuitive shopping experience that guides users naturally through the browsing and purchasing process.
      
      2. **State Management**: Implementing efficient state management for shopping cart functionality across the application.
      
      3. **Authentication**: Building secure user authentication while maintaining a smooth onboarding experience.
      
      4. **Performance Optimization**: Ensuring fast loading times and responsive behavior across different devices and screen sizes.
    `,
    solutions: `
      The project leveraged these technical solutions:
      
      1. **React** for building a component-based user interface
      2. **Firebase Authentication** for secure user management
      3. **Firebase Hosting** for reliable application deployment
      4. **Responsive Design** principles for cross-device compatibility
      5. **State Management** with React hooks and context
      6. **Category-based Navigation** for intuitive product browsing
    `,
    live_demo_link: "https://e-commerce-boraulukan-new.web.app/home",
  },
  {
    id: "certificate-tracking",
    name: "Certificate Tracking Application",
    description:
      "A dissertation project creating a certificate tracking application for maximizing efficiency in project and health & safety management, featuring password security with hashing techniques.",
    longDescription: `
      This Certificate Tracking Application was developed as my dissertation project to address real-world challenges in project management and health & safety compliance. The application efficiently tracks certifications, ensuring organizations can maintain proper documentation and compliance with regulatory requirements.
      
      Developed using Java, NetBeans, MySQL, and Google Cloud Platform, this multifunctional application offers:
      • Centralized certificate management
      • Expiration tracking and notifications
      • User role management
      • Reporting and analytics
      • Secure document storage
      • Compliance monitoring
      
      Security was a primary concern, with user passwords protected using advanced hashing techniques to ensure data confidentiality and integrity throughout the system.
    `,
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
    challenges: `
      Key challenges addressed in this project included:
      
      1. **Data Security**: Implementing robust security measures for sensitive certification data and user credentials.
      
      2. **Usability**: Designing an intuitive interface for users with varying levels of technical proficiency.
      
      3. **Database Design**: Creating an efficient database structure to handle complex relationships between certificates, users, projects, and compliance requirements.
      
      4. **Cloud Integration**: Integrating the application with Google Cloud Platform for enhanced accessibility and scalability.
    `,
    solutions: `
      Technical solutions implemented in this project:
      
      1. **Java** for application development with NetBeans IDE
      2. **MySQL** for relational database management
      3. **Password Hashing** for secure credential storage
      4. **Google Cloud Platform** for cloud infrastructure
      5. **MVC Architecture** for maintainable code organization
      6. **Automated Notification System** for certificate expiration alerts
    `,
    source_code_link: "https://github.com/boraulukanx/Dissertation",
    live_demo_link: "",
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Proje ID'sine göre veriyi bul
    const foundProject = projectsDetailed.find((p) => p.id === id);

    if (foundProject) {
      setProject(foundProject);
      setLoading(false);
    } else {
      // Proje bulunamazsa, projeler sayfasına yönlendir
      navigate("/projects");
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.section
      variants={staggerContainer()}
      initial="show"
      animate="show"
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
          }}
          className="absolute bottom-[100px] right-[100px] w-[250px] h-[250px] bg-purple-400/10 rounded-full blur-[90px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Back button */}
        <motion.div variants={fadeIn("down", "tween", 0, 1)} className="mb-10">
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back to Projects</span>
          </button>
        </motion.div>

        {/* Project header */}
        <motion.div variants={fadeIn("down", "tween", 0, 1)} className="mb-10">
          <h1 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            {project.name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={`${project.name}-${tag.name}`}
                className={`text-[14px] ${tag.color} px-3 py-1 rounded-full bg-tertiary`}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Main content - New layout with image on left and content on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          {/* Left column - Image */}
          <motion.div
            variants={fadeIn("right", "tween", 0, 1)}
            className="md:col-span-5 flex items-start"
          >
            <div className="w-full rounded-2xl shadow-xl overflow-hidden flex justify-center bg-tertiary/30 backdrop-blur-sm p-6 sticky top-24">
              <img
                src={project.image}
                alt={project.name}
                className="max-w-full max-h-[350px] object-contain rounded-lg"
              />
            </div>
          </motion.div>

          {/* Right column - Project description */}
          <motion.div
            variants={fadeIn("left", "tween", 0, 1)}
            className="md:col-span-7"
          >
            <div className="bg-tertiary/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl h-full">
              <h2 className="text-white font-bold text-2xl mb-6 border-b border-secondary/30 pb-3">
                Project Description
              </h2>
              <div className="text-secondary whitespace-pre-line">
                {project.longDescription}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Project info, challenges and solutions in a 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Project info */}
          <motion.div variants={fadeIn("up", "tween", 0, 1)}>
            <div className="bg-tertiary/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl h-full">
              <h2 className="text-white font-bold text-2xl mb-6 border-b border-secondary/30 pb-3">
                Project Details
              </h2>

              <div className="space-y-6">
                {/* Technologies */}
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={`detail-${tag.name}`}
                        className={`text-[14px] ${tag.color} px-3 py-1 rounded-full bg-tertiary/50`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Links
                  </h3>
                  <div className="space-y-3">
                    {project.source_code_link && (
                      <a
                        href={project.source_code_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>Source Code</span>
                      </a>
                    )}

                    {project.live_demo_link && (
                      <a
                        href={project.live_demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Challenges */}
          <motion.div variants={fadeIn("up", "tween", 0.1, 1)}>
            <div className="bg-tertiary/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl h-full">
              <h2 className="text-white font-bold text-2xl mb-6 border-b border-secondary/30 pb-3">
                Challenges
              </h2>
              <div className="text-secondary whitespace-pre-line">
                {project.challenges}
              </div>
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div variants={fadeIn("up", "tween", 0.2, 1)}>
            <div className="bg-tertiary/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl h-full">
              <h2 className="text-white font-bold text-2xl mb-6 border-b border-secondary/30 pb-3">
                Solutions
              </h2>
              <div className="text-secondary whitespace-pre-line">
                {project.solutions}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDetail;
