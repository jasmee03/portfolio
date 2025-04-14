import React, { useContext, useState } from "react";
import { ThemeContext } from "../themeProvider";

// Import your project images from assets
import invenTrackImg from "../assets/inventrack.jpeg";
import profileImg from "../assets/profile1.jpg";
import weatherDashboardImg from "../assets/inventrack.jpeg";
import portfolioImg from "../assets/inventrack.jpeg";
import recipeFinderImg from "../assets/inventrack.jpeg";

const Projects = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [selectedProject, setSelectedProject] = useState(null);

  // Project data with local images
  const projects = [
    {
      id: 1,
      title: "Inventory Management System",
      detailedDescription: "A full-stack inventory management system for tracking stock levels, orders, and sales. Built with a responsive design and user-friendly interface.",
      technologies: ["HTML", "CSS", "JS", "MySQL", "PHP"],
      githubUrl: "https://github.com/jasmee03/IMS",
      liveUrl: "https://githubbox.com/jasmee03/IMS",
      image: invenTrackImg // Using imported image
    },
    {
      id: 2,
      title: "Portfolio Website",
      detailedDescription: "A personal portfolio website showcasing projects and skills. Built with React.js, Redux, and Material UI for a modern look and feel.",
      technologies: ["React.js", "Redux", "Material UI", "React Router"],
      githubUrl: "https://github.com/jasmee03/Portfolio_website",
      liveUrl: "https://githubbox.com/jasmee03/Portfolio_website",
      image: profileImg
    },
    {
      id: 3,
      title: "//coming soon...",
      detailedDescription: "",
      technologies: ["JavaScript", "OpenWeather API", "CSS3", "Geolocation API"],
      githubUrl: "https://github.com/username/weather-app",
      liveUrl: "https://weather-demo.com",
      image: weatherDashboardImg
    },
    {
      id: 4,
      title: "//coming soon...",
      detailedDescription: "",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "React Icons"],
      githubUrl: "https://github.com/username/portfolio",
      liveUrl: "",
      image: portfolioImg
    },
    {
      id: 5,
      title: "//coming soon...",
      detailedDescription: "",
      technologies: ["React", "Edamam API", "Context API", "React Router"],
      githubUrl: "https://github.com/username/recipe-finder",
      liveUrl: "https://recipefinder-demo.com",
      image: recipeFinderImg
    },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div
      id="projects"
      className={darkMode ? "bg-white text-black" : "bg-gray-900 text-white"}
    >
      <div className="max-w-7xl mx-auto x-4 sm:px-6 lg:px-8 px-4 pt-24 pb-12">
        <h2 className="text-5xl font-bold px-4 md:px-0 text-center">
          Projects
        </h2>
        <h4 className="mt-16 text-3xl font-semibold text-blue-600">
          What I Built
        </h4>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className={`rounded-lg overflow-hidden shadow-xl transition-transform hover:scale-105 ${
                darkMode ? "bg-gray-100" : "bg-gray-800"
              }`}
            >
              <div 
                className="cursor-pointer" 
                onClick={() => openModal(project)}
              >
                {/* Using the imported image directly */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          darkMode 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-blue-900 text-blue-100"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 flex space-x-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center py-2 px-4 rounded-lg ${
                    darkMode
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  } transition-colors`}
                >
                  GitHub
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 text-center py-2 px-4 rounded-lg ${
                      darkMode
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    } transition-colors`}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div 
              className={`relative max-w-4xl w-full rounded-lg p-6 max-h-[90vh] overflow-y-auto ${
                darkMode ? "bg-white text-black" : "bg-gray-800 text-white"
              }`}
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-2xl font-bold"
              >
                &times;
              </button>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {/* Using the imported image in modal */}
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full rounded-lg mb-4"
                  />
                  <div className="flex space-x-4">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 text-center py-2 px-4 rounded-lg ${
                        darkMode
                          ? "bg-gray-800 text-white hover:bg-gray-700"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      } transition-colors`}
                    >
                      View Code
                    </a>
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 text-center py-2 px-4 rounded-lg ${
                          darkMode
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        } transition-colors`}
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
                  <p className="mb-6">{selectedProject.detailedDescription}</p>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1 rounded-full ${
                            darkMode 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-blue-900 text-blue-100"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <a
          href="https://github.com/jasmee03"
          className="w-32 flex items-center py-4 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto mt-4"
        >
          Show More
          <svg
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Projects;