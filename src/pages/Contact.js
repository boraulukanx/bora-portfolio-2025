import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize EmailJS with your user ID
    emailjs.init("lp6AJAPdncFt8Sbk7");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Send email using EmailJS
    emailjs
      .send(
        "service_pu3w496", // Your EmailJS service ID
        "template_h1t7psl", // Your EmailJS template ID
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }
      )
      .then(
        (result) => {
          setLoading(false);
          setSubmitted(true);
          setForm({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          setErrors({});

          // Reset submitted state after 5 seconds
          setTimeout(() => {
            setSubmitted(false);
          }, 5000);
        },
        (error) => {
          console.error("Failed to send email:", error);
          setLoading(false);
          // Optionally handle error state here
        }
      );
  };

  return (
    <section className="min-h-screen pt-20">
      <div className="xl:mt-12 flex md:flex-row flex-col-reverse gap-10 overflow-hidden max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-[0.75] bg-tertiary p-8 rounded-2xl"
        >
          <p className="text-secondary font-medium uppercase tracking-wider text-[14px]">
            Get in touch
          </p>
          <h3 className="text-white font-black text-[30px] sm:text-[40px] md:text-[50px]">
            Contact.
          </h3>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center py-10"
            >
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-secondary text-[24px] font-bold mb-4">
                Thank you for your message!
              </div>
              <p className="text-white-100 text-[16px]">
                I will get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-6"
            >
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">Your Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  className={`bg-black-100 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border ${
                    errors.name ? "border-red-500" : "border-transparent"
                  } font-medium focus:border-secondary transition-all`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </span>
                )}
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">Your Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email address?"
                  className={`bg-black-100 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border ${
                    errors.email ? "border-red-500" : "border-transparent"
                  } font-medium focus:border-secondary transition-all`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </span>
                )}
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">Subject</span>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={`bg-black-100 py-4 px-6 text-white rounded-lg outline-none border ${
                    errors.subject ? "border-red-500" : "border-transparent"
                  } font-medium focus:border-secondary transition-all`}
                >
                  <option value="" className="bg-black-200">
                    Select a subject
                  </option>
                  <option value="job" className="bg-black-200">
                    Job Opportunity
                  </option>
                  <option value="project" className="bg-black-200">
                    Project Inquiry
                  </option>
                  <option value="feedback" className="bg-black-200">
                    Feedback
                  </option>
                  <option value="other" className="bg-black-200">
                    Other
                  </option>
                </select>
                {errors.subject && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.subject}
                  </span>
                )}
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">
                  Your Message
                </span>
                <textarea
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What do you want to say?"
                  className={`bg-black-100 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border ${
                    errors.message ? "border-red-500" : "border-transparent"
                  } font-medium focus:border-secondary transition-all`}
                />
                {errors.message && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.message}
                  </span>
                )}
              </label>

              <button
                type="submit"
                disabled={loading}
                className="bg-black-200 py-3 px-8 mt-2 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-black-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-[0.25] h-auto xl:h-auto md:h-[550px] flex justify-center items-center"
        >
          <div className="w-full bg-tertiary p-8 rounded-2xl">
            <h3 className="text-white font-bold text-[24px] mb-5">
              Contact Information
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-white-100">boraulukan2000@hotmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-white-100">Woking, United Kingdom</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-white font-medium text-[18px] mb-4">
                Follow Me
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/boraulukanx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/bora-ulukan-913b531b2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
