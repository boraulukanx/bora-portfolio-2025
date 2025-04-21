import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

// Detaylı proje verileri - normalde gerçek projelerinizi ekleyeceksiniz
const projectsDetailed = [
  {
    id: "e-commerce-platform",
    name: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product listings, shopping cart, user authentication, and payment processing capabilities.",
    longDescription: `
      This comprehensive e-commerce solution provides everything needed for modern online retail. The platform features a responsive design that works flawlessly across all devices, ensuring customers can shop anywhere, anytime.
      
      Key features include:
      • Advanced product filtering and search functionality
      • Secure user authentication and account management
      • Real-time inventory tracking
      • Integrated payment processing with multiple gateways
      • Order management and tracking
      • Admin dashboard with sales analytics
      • Wishlist and favorite products
      • Product reviews and ratings
    `,
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
    gallery: [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
    ],
    challenges: `
      Throughout the development of this project, several challenges were encountered and overcome:
      
      1. **Performance Optimization**: Initial loading times were high due to large product images. This was solved by implementing lazy loading and image optimization.
      
      2. **Cart Synchronization**: Keeping the cart synchronized across multiple devices was challenging. A solution was implemented using web sockets and local storage.
      
      3. **Payment Security**: Ensuring secure payment processing required implementing strict validation and encryption methods.
    `,
    solutions: `
      The technological solutions implemented in this project include:
      
      1. **React Context API** for global state management
      2. **MongoDB Atlas** for cloud database with automated backups
      3. **JWT Authentication** for secure user sessions
      4. **Stripe API Integration** for payment processing
      5. **Responsive Design** using Tailwind CSS
      6. **RESTful API** built with Node.js and Express
    `,
    source_code_link: "https://github.com/",
    live_demo_link: "https://example.com/",
  },
  {
    id: "social-media-dashboard",
    name: "Social Media Dashboard",
    description:
      "An analytics dashboard for social media monitoring with real-time data visualization and trend analysis tools.",
    longDescription: `
      This social media dashboard provides comprehensive analytics across multiple platforms in a single, unified interface. It enables marketers and social media managers to track performance, monitor engagement, and identify trends without switching between different tools.
      
      Key features include:
      • Real-time data visualization across multiple social networks
      • Customizable dashboards and widgets
      • Automated report generation
      • Sentiment analysis of comments and messages
      • Competitor tracking and benchmarking
      • Content performance metrics
      • Audience demographics and insights
      • Scheduled posting and campaign management
    `,
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
    gallery: [
      "https://randomuser.me/api/portraits/women/1.jpg",
      "https://randomuser.me/api/portraits/men/4.jpg",
      "https://randomuser.me/api/portraits/women/5.jpg",
    ],
    challenges: `
      Several interesting challenges were overcome during this project:
      
      1. **API Rate Limiting**: Integrating with multiple social media APIs with different rate limits required implementing a sophisticated queuing system.
      
      2. **Real-time Updates**: Providing real-time updates without excessive API calls was solved using websockets and smart polling strategies.
      
      3. **Data Visualization Complexity**: Creating intuitive visualizations for complex data sets required careful UX research and iterative design.
    `,
    solutions: `
      Technical solutions implemented include:
      
      1. **React with Redux** for state management
      2. **D3.js and Chart.js** for data visualization
      3. **Social media APIs** integration (Twitter, Facebook, Instagram, LinkedIn)
      4. **Socket.io** for real-time updates
      5. **Node.js backend** with Express
      6. **SCSS modules** for component styling
    `,
    source_code_link: "https://github.com/",
    live_demo_link: "https://example.com/",
  },
  {
    id: "task-management-app",
    name: "Task Management App",
    description:
      "A collaborative task management application with features like drag-and-drop task organization, user assignment, and deadline notifications.",
    longDescription: `
      This task management application aims to streamline team workflows by providing a visual, intuitive interface for task organization and project management. It emphasizes collaboration and transparency while maintaining simplicity.
      
      Key features include:
      • Kanban board with customizable columns
      • Drag-and-drop task reorganization
      • Task assignment with user avatars
      • Deadline tracking with notifications
      • File attachments and commenting system
      • Time tracking for tasks and projects
      • Recurring task automation
      • Project templates and task dependencies
    `,
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
    gallery: [
      "https://randomuser.me/api/portraits/men/2.jpg",
      "https://randomuser.me/api/portraits/women/6.jpg",
      "https://randomuser.me/api/portraits/men/7.jpg",
    ],
    challenges: `
      The development process included these challenges:
      
      1. **Real-time Collaboration**: Ensuring that all users see the same board state in real-time required implementing a robust synchronization system.
      
      2. **Drag and Drop Performance**: Maintaining smooth performance during drag and drop operations with many tasks required optimization.
      
      3. **Notification System**: Creating a notification system that works across different time zones was complex.
    `,
    solutions: `
      The application was built using:
      
      1. **Next.js** for server-side rendering and routing
      2. **Supabase** for database, authentication, and real-time subscriptions
      3. **React Beautiful DND** for drag and drop functionality
      4. **Vercel** for deployment and serverless functions
      5. **Service Workers** for offline capability
      6. **Notification API** for alerts and reminders
    `,
    source_code_link: "https://github.com/",
    live_demo_link: "https://example.com/",
  },
  {
    id: "portfolio-website",
    name: "Portfolio Website",
    description:
      "A responsive portfolio website built with React, Tailwind CSS and Framer Motion for smooth animations and transitions.",
    longDescription: `
      This modern portfolio website showcases professional work, skills, and experience with an emphasis on visual appeal and smooth user experience. The design focuses on presenting information clearly while incorporating engaging animations.
      
      Key features include:
      • Responsive design that works on all device sizes
      • Animated page transitions and UI elements
      • Project showcase with detailed case studies
      • Skills and experience visualization
      • Contact form with validation
      • Dark/light mode toggle
      • Blog section with featured articles
      • Performance optimization for fast loading
    `,
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
    gallery: [
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/8.jpg",
      "https://randomuser.me/api/portraits/women/9.jpg",
    ],
    challenges: `
      The primary challenges in this project were:
      
      1. **Animation Performance**: Ensuring smooth animations even on lower-end devices required careful optimization.
      
      2. **Content Management**: Creating a system that makes it easy to update projects and content without changing code.
      
      3. **Accessibility**: Maintaining accessibility standards while using animations and interactive elements.
    `,
    solutions: `
      The website was built using:
      
      1. **React** for component-based UI development
      2. **Tailwind CSS** for styling without leaving the HTML
      3. **Framer Motion** for advanced animations and transitions
      4. **React Router** for navigation
      5. **Email.js** for contact form functionality
      6. **Intersection Observer API** for scroll-based animations
    `,
    source_code_link: "https://github.com/",
    live_demo_link: "https://example.com/",
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

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

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Back button */}
        <motion.div
          variants={fadeIn("down", "tween", 0.1, 1)}
          className="mb-10"
        >
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
        <motion.div
          variants={fadeIn("down", "tween", 0.2, 1)}
          className="mb-10"
        >
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

        {/* Project gallery */}
        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          className="mb-16 relative"
        >
          <div className="w-full h-[400px] sm:h-[500px] overflow-hidden rounded-2xl relative">
            <motion.img
              src={project.gallery[currentImage]}
              alt={`${project.name} screenshot ${currentImage + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Navigation arrows */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === 0 ? project.gallery.length - 1 : prev - 1
                  )
                }
                className="bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === project.gallery.length - 1 ? 0 : prev + 1
                  )
                }
                className="bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Thumbnail indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {project.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImage ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            variants={fadeIn("right", "tween", 0.4, 1)}
            className="md:col-span-2"
          >
            <h2 className="text-white font-bold text-[24px] mb-4">Overview</h2>
            <div className="text-secondary text-[16px] whitespace-pre-line">
              {project.longDescription}
            </div>

            <h2 className="text-white font-bold text-[24px] mt-10 mb-4">
              Challenges
            </h2>
            <div className="text-secondary text-[16px] whitespace-pre-line">
              {project.challenges}
            </div>

            <h2 className="text-white font-bold text-[24px] mt-10 mb-4">
              Solutions
            </h2>
            <div className="text-secondary text-[16px] whitespace-pre-line">
              {project.solutions}
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "tween", 0.4, 1)}
            className="md:col-span-1"
          >
            <div className="bg-tertiary p-6 rounded-2xl">
              <h2 className="text-white font-bold text-[24px] mb-4">
                Project Details
              </h2>

              <div className="mb-6">
                <h3 className="text-secondary font-medium text-[16px] mb-2">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={`details-${tag.name}`}
                      className="bg-black-100 px-3 py-1 text-[14px] rounded-full text-white"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-secondary font-medium text-[16px] mb-2">
                  Links
                </h3>
                <div className="flex flex-col gap-3">
                  <a
                    href={project.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-secondary transition-colors"
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
                  <a
                    href={project.live_demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-secondary transition-colors"
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
                </div>
              </div>
            </div>

            {/* Next/Prev project navigation */}
            <div className="mt-8 bg-tertiary p-6 rounded-2xl">
              <h3 className="text-white font-bold text-[18px] mb-4">
                Explore More Projects
              </h3>
              <div className="flex flex-col gap-4">
                {projectsDetailed
                  .filter((p) => p.id !== id)
                  .slice(0, 2)
                  .map((p) => (
                    <a
                      key={p.id}
                      href={`/projects/${p.id}`}
                      className="group flex items-start gap-3 hover:bg-black-100 p-2 rounded-lg transition-colors"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-white font-medium group-hover:text-secondary transition-colors">
                          {p.name}
                        </h4>
                        <p className="text-secondary text-[12px] line-clamp-1">
                          {p.description}
                        </p>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDetail;
