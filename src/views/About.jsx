import React, { useContext } from "react";
import { techStack } from "../constants";
import { ThemeContext } from "../themeProvider";
import { motion } from "framer-motion";
import profilePhoto from "../assets/ims.webp"; // Adjust path to your photo
import invenTrackImg from "../assets/inventrack.jpeg"; // Adjust path to your image
const About = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  
  return (
    <div id="about" className={darkMode ? "bg-white" : "bg-gray-900"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={
            darkMode
              ? "text-5xl font-bold px-4 md:px-0 text-center text-gray-800"
              : "text-5xl font-bold px-4 md:px-0 text-center text-white"
          }
        >
          About Us
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-16">
          {/* Photo Section - Enhanced with better shadow and hover effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3 flex justify-center"
          >
            <div className={`relative rounded-full p-1 ${darkMode ? 
              "bg-gradient-to-br from-blue-100 to-blue-200" : 
              "bg-gradient-to-br from-blue-800 to-blue-900"} 
              shadow-xl hover:shadow-2xl transition-shadow duration-300`}>
              <img 
                src={profilePhoto} 
                alt="Profile Photo"
                className="rounded-full w-64 h-64 object-cover border-[6px] border-white dark:border-gray-800 hover:scale-[1.02] transition-transform duration-300"
              />
              {/* Optional decorative element */}
              <div className={`absolute -bottom-3 -right-3 w-16 h-16 rounded-full ${darkMode ? "bg-blue-500" : "bg-blue-600"} flex items-center justify-center text-white font-bold text-xl`}>
                👋
              </div>
              <motion.div
  className={`absolute -bottom-3 -right-3 w-16 h-16 rounded-full ${darkMode ? "bg-blue-500" : "bg-blue-600"} flex items-center justify-center text-2xl`}
  animate={{ 
    rotate: [0, 20, -20, 0] 
  }}
  transition={{ 
    repeat: Infinity, 
    duration: 2 
  }}
>
😚
</motion.div>
            </div>
          </motion.div>

          {/* Text Content - Improved spacing and animation */}
          <motion.div 
            className="w-full lg:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div>
                <h4 className="text-3xl font-semibold text-blue-500">
                  A bit about us
                </h4>
                <p className={
                  darkMode
                    ? "mt-4 text-xl text-justify text-gray-600 leading-relaxed"
                    : "mt-4 text-xl text-justify text-gray-200 leading-relaxed"
                }>
                  We're a team of self-taught web developers passionate about creating exceptional digital experiences. 
                  With a keen eye for user experience, we craft reusable and efficient code that brings designs 
                  to life. We thrive at the intersection of technology and creativity, guiding projects from 
                  initial concept through to successful deployment. Currently deepening our expertise in 
                  backend development and scalable system architecture.
                </p>
              </div>

              <div>
                <h4 className="text-3xl font-semibold text-blue-500">
                  Technologies and Tools
                </h4>
                <p className={
                  darkMode
                    ? "mt-4 text-xl text-justify text-gray-600 leading-relaxed"
                    : "mt-4 text-xl text-justify text-gray-200 leading-relaxed"
                }>
                  We leverage cutting-edge technologies combined with battle-tested open-source solutions 
                  to build performant, accessible websites and applications. Our toolkit is optimized for 
                  creating seamless experiences across all devices - from smartphones to desktops.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Section - Enhanced grid layout */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {techStack.map((el, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-xl flex items-center space-x-3 transition-all ${darkMode ? 
                "bg-gray-100 hover:bg-gray-200" : 
                "bg-gray-800 hover:bg-gray-700"}`}
            >
              <img alt={el.name} src={el.link} className="w-10 h-10 object-contain" />
              <span className={`font-medium ${darkMode ? "text-gray-800" : "text-white"}`}>
                {el.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;