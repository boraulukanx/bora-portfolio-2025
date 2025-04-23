import { motion } from "framer-motion";
import { useRef } from "react";
import ThreeBackground from "../components/ThreeBackground";
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

const Home = () => {
  const overviewRef = useRef(null);

  const scrollToSection = () => {
    overviewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative w-full h-screen mx-auto overflow-hidden">
        {/* Three.js background */}
        <ThreeBackground />

        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 px-6"
        >
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-secondary" />
            <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-secondary" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 z-10">
            <div className="flex-1">
              <motion.h1
                variants={fadeIn("right", "tween", 0.1, 1)}
                className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2"
              >
                Hi, I'm <span className="text-secondary">Bora</span>
              </motion.h1>
              <motion.p
                variants={fadeIn("right", "tween", 0.2, 1)}
                className="text-secondary font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 whitespace-nowrap"
              >
                Junior Full Stack Developer & 5G Core Engineer
              </motion.p>

              <motion.p
                variants={fadeIn("right", "tween", 0.3, 1)}
                className="text-white-100 mt-6 text-[17px] max-w-3xl leading-[30px]"
              >
                Currently working as a 5G Core Engineer at Servlane UK, with a
                2.1 Computer Science degree from the University of Surrey. I
                develop web applications, user interfaces, and backend services,
                combining modern web technologies and 5G core network solutions
                to create robust and scalable systems that solve real-world
                problems.
              </motion.p>

              <motion.div
                variants={fadeIn("right", "tween", 0.4, 1)}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  to="/contact"
                  className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl hover:bg-secondary hover:text-black transition-all duration-300"
                >
                  Contact Me
                </Link>
                <Link
                  to="/projects"
                  className="border-2 border-secondary py-3 px-8 outline-none w-fit text-white font-bold rounded-xl hover:bg-secondary hover:text-black transition-all duration-300"
                >
                  View Projects
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={fadeIn("left", "tween", 0.3, 1)}
              className="md:flex-none md:w-auto w-[220px] mx-auto md:mx-0 mt-6 md:mt-0"
            >
              <div className="relative">
                <div className="w-[180px] h-[180px] rounded-full border-2 border-secondary p-1 shadow-xl shadow-cyan-500/20 overflow-hidden">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D4E03AQFPvJG_zNg4ig/profile-displayphoto-shrink_200_200/B4EZZV3Z3EHkAc-/0/1745197311209?e=1750896000&v=beta&t=jQWnLu3bwLcv2PMObXploX_6miFdZVYvOKbCIBjmLLw"
                      alt="Bora Ulukan"
                      className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                    />
                  </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -z-10 w-[200px] h-[200px] border-2 border-secondary/30 rounded-full -left-[10px] -top-[10px]"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating 3D elements */}
        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
          <button
            onClick={scrollToSection}
            className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2 cursor-pointer hover:bg-secondary/20 transition-colors duration-300"
            aria-label="Scroll to overview"
          >
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </button>
        </div>
      </section>

      {/* Expertise Section */}
      <section
        ref={overviewRef}
        className="bg-primary w-full min-h-screen relative"
      >
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-secondary uppercase tracking-wider text-[14px] mb-2">
              My Focus Areas
            </p>
            <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
              Expertise Overview.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center p-8 bg-tertiary rounded-2xl hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-secondary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                  />
                </svg>
              </div>
              <h3 className="text-white font-bold text-[24px] mb-4">
                Full Stack Web Development
              </h3>
              <p className="text-secondary text-center text-[16px] leading-[28px]">
                Creating complete web applications by mastering both frontend
                and backend technologies. I design responsive user interfaces
                with React while implementing robust server-side logic with
                Node.js and database management with MongoDB. This end-to-end
                approach allows me to deliver cohesive, scalable solutions with
                seamless integration between all system components.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <span className="px-4 py-2 bg-black-100 text-white rounded-full text-sm">
                  React
                </span>
                <span className="px-4 py-2 bg-black-100 text-white rounded-full text-sm">
                  Node.js
                </span>
                <span className="px-4 py-2 bg-black-100 text-white rounded-full text-sm">
                  MongoDB
                </span>
                <span className="px-4 py-2 bg-black-100 text-white rounded-full text-sm">
                  Tailwind CSS
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center p-8 bg-tertiary rounded-2xl hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-secondary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-bold text-[24px] mb-4">
                5G Core Engineering
              </h3>
              <p className="text-secondary text-center text-[16px] leading-[28px]">
                Working with 5G core network architectures to design and
                implement next-generation telecommunications systems. My
                expertise in network protocols, virtualization, and cloud
                infrastructure enables me to develop scalable and reliable 5G
                core components.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <span className="px-4 py-2 bg-black-100 text-white rounded-full text-sm">
                  Network Functions
                </span>
                <span className="px-4 py-2 bg-black-100 text-white rounded-full text-sm">
                  Virtualization
                </span>
                <span className="px-4 py-2 bg-black-100 text-white rounded-full text-sm">
                  Kubernetes
                </span>
                <span className="px-4 py-2 bg-black-100 text-white rounded-full text-sm">
                  Microservices
                </span>
              </div>
            </motion.div>
          </div>

          {/* Featured technologies section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <p className="text-secondary uppercase tracking-wider text-[14px] mb-2">
                Technologies I Work With
              </p>
              <h2 className="text-white font-bold md:text-[30px] sm:text-[26px] xs:text-[22px] text-[20px]">
                Featured Tools & Frameworks
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: "React", icon: "⚛️" },
                { name: "Node.js", icon: "🟢" },
                { name: "Express", icon: "🚂" },
                { name: "MongoDB", icon: "🍃" },
                { name: "Java", icon: "☕" },
                { name: "MySQL", icon: "🐬" },
                { name: "AWS", icon: "☁️" },
                { name: "Google Cloud", icon: "🌐" },
                { name: "Tailwind", icon: "🌊" },
                { name: "Git", icon: "🔄" },
                { name: "RESTful APIs", icon: "🔌" },
                { name: "Python", icon: "🐍" },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-tertiary p-4 rounded-xl flex flex-col items-center justify-center h-[100px] shadow-lg shadow-primary/20 border border-white/5 hover:border-secondary/30 transition-all"
                >
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <p className="text-white text-sm">{tech.name}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary text-black py-3 px-8 rounded-xl font-bold hover:bg-white transition-all duration-300"
                >
                  View All Skills
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
