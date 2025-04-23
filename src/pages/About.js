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
        "I create modern web applications with React, Node.js, Express, and MongoDB, focusing on responsive design using Tailwind CSS, RESTful APIs, and efficient database management to deliver complete end-to-end solutions.",
    },
    {
      title: "5G Core Engineer",
      icon: "📡",
      description:
        "As a 5G Core Engineer at Servlane, I deploy and configure advanced network infrastructure, implement network function virtualization (NFV), and optimize network performance to support next-generation telecommunications.",
    },
    {
      title: "Java Developer",
      icon: "🔧",
      description:
        "I develop applications using Java, MySQL, and NetBeans to create database-driven programs and enterprise solutions. I integrate these applications with cloud services to enhance scalability, availability, and performance across different platforms.",
    },
    {
      title: "Technology Enthusiast",
      icon: "🎨",
      description:
        "I'm passionate about Cloud Engineering, Cybersecurity, DevOps, Full Stack Development, and Networking. I continuously explore these fields to expand my knowledge and stay current with the latest technologies and best practices.",
    },
  ];

  const interests = [
    {
      title: "Cloud Computing",
      icon: "☁️",
    },
    {
      title: "Cybersecurity",
      icon: "🔒",
    },
    {
      title: "DevOps",
      icon: "🔄",
    },
    {
      title: "Full Stack Development",
      icon: "⚛️",
    },
    {
      title: "Networking",
      icon: "🌐",
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
          I'm a Junior Full Stack Developer and 5G Core Engineer with a 2.1 in
          Computer Science from the University of Surrey. In my role at
          Servlane, I work with cutting-edge 5G network infrastructure, focusing
          on deployment, configuration, and optimization of core network
          functions. This includes implementing virtualized network elements,
          configuring hardware platforms, and ensuring seamless integration
          between various network components. On the development side, I create
          end-to-end web solutions, building responsive frontends with React and
          robust backends with Node.js. I'm particularly passionate about
          bridging the gap between telecommunications and web technologies to
          create innovative solutions.
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
            {/* Web Development Skills */}
            <div className="col-span-full mb-4">
              <h3 className="text-white text-[20px] font-bold mb-2">
                Web Development
              </h3>
              <div className="h-0.5 w-full bg-secondary/20 mb-6"></div>
            </div>
            {[
              "HTML5",
              "CSS3",
              "JavaScript",
              "React",
              "Node.js",
              "Express",
              "MongoDB",
              "RESTful APIs",
              "Git",
              "Tailwind CSS",
              "MySQL",
              "Java",
              "Python",
              "AWS",
              "Google Cloud",
            ].map((skill, index) => (
              <motion.div
                key={`web-${skill}`}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-tertiary rounded-xl p-4 h-[100px] flex items-center justify-center"
              >
                <p className="text-white text-center font-medium">{skill}</p>
              </motion.div>
            ))}

            {/* 5G Core Skills */}
            <div className="col-span-full mt-8 mb-4">
              <h3 className="text-white text-[20px] font-bold mb-2">
                5G Core Engineering
              </h3>
              <div className="h-0.5 w-full bg-secondary/20 mb-6"></div>
            </div>
            {[
              "5G Core Integration",
              "Network Commissioning",
              "Firmware Upgrades",
              "Linux System Administration",
              "Remote Server Management (iLO / iDRAC)",
              "CNIS",
              "NFVI",
              "DCGW",
              "IPWorks",
              "TMA",
              "ENIQ",
              "Physical Infrastructure Installation",
              "Network Troubleshooting",
              "Hardware Configuration",
              "Software Patching",
            ].map((skill, index) => (
              <motion.div
                key={`telecom-${skill}`}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.05,
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

        {/* Areas of Interest section */}
        <motion.div
          variants={fadeIn("up", "tween", 0.4, 1)}
          className="mt-16 mb-20"
        >
          <p className="text-secondary uppercase tracking-wider text-[14px]">
            What I'm Passionate About
          </p>
          <h2 className="text-white font-black md:text-[48px] sm:text-[40px] xs:text-[30px] text-[24px] mt-2 mb-12">
            Areas of Interest
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-tertiary p-8 rounded-xl w-[200px] h-[200px] flex flex-col items-center justify-center shadow-lg"
              >
                <div className="text-5xl mb-4">{interest.icon}</div>
                <h3 className="text-white text-center font-bold text-[18px]">
                  {interest.title}
                </h3>
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
