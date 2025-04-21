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

const About = () => {
  const services = [
    {
      title: "Full Stack Developer",
      icon: "💻",
      description:
        "I build responsive web applications using React, Node.js, and modern frameworks to create seamless user experiences.",
    },
    {
      title: "5G Core Engineer",
      icon: "📡",
      description:
        "I design and implement 5G core network solutions, focusing on network function virtualization and service-based architecture.",
    },
    {
      title: "Backend Developer",
      icon: "🔧",
      description:
        "I create robust server-side applications with Node.js, Express, and MongoDB for scalable and efficient data management.",
    },
    {
      title: "Frontend Designer",
      icon: "🎨",
      description:
        "I design intuitive and visually appealing user interfaces that enhance user experience and engagement.",
    },
  ];

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
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full border border-secondary/20 border-dashed"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[250px] -right-[250px] w-[500px] h-[500px] rounded-full border border-secondary/20 border-dashed"
        />
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[200px] -right-[200px] w-[400px] h-[400px] rounded-full border border-secondary/20 border-dashed"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeIn("right", "tween", 0.1, 1)}
          className="mt-4"
        >
          <p className="text-secondary uppercase tracking-wider text-[14px]">
            Introduction
          </p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Overview.
          </h2>
        </motion.div>

        <motion.p
          variants={fadeIn("left", "tween", 0.2, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I'm a junior developer with expertise in JavaScript and
          telecommunications technologies, specializing in frameworks like
          React, Node.js, and 5G core networks. I'm a quick learner and
          collaborate closely with teams to create efficient, scalable solutions
          that bridge web development and telecommunications infrastructure.
          Let's work together to bring innovative technology solutions to life!
        </motion.p>

        <div className="mt-20 flex flex-wrap gap-10">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>

        {/* Skills section */}
        <motion.div variants={fadeIn("up", "tween", 0.3, 1)} className="mt-24">
          <p className="text-secondary uppercase tracking-wider text-[14px]">
            My Skillset
          </p>
          <h2 className="text-white font-black md:text-[48px] sm:text-[40px] xs:text-[30px] text-[24px] mt-2">
            Technologies & Tools
          </h2>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {[
              "HTML5",
              "CSS3",
              "JavaScript",
              "React",
              "Node.js",
              "Express",
              "MongoDB",
              "5G Core",
              "Network Functions",
              "RESTful APIs",
              "Git",
              "Docker",
              "CI/CD",
              "Tailwind CSS",
              "Framer Motion",
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-tertiary rounded-xl p-4 h-[100px] flex items-center justify-center"
              >
                <p className="text-white text-center font-medium">{skill}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const ServiceCard = ({ index, title, icon, description }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.4, 0.75)}
    whileHover={{ scale: 1.05, y: -10 }}
    className="xs:w-[250px] w-full bg-tertiary p-6 rounded-2xl shadow-card flex flex-col items-center"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-white text-[20px] font-bold text-center mb-4">
      {title}
    </h3>
    <p className="text-secondary text-[14px] text-center">{description}</p>
  </motion.div>
);

export default About;
