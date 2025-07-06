import { useState, useEffect } from "react";
import {
  ArrowRight,
  ExternalLink,
  Camera,
  Globe,
  Code as CodeIcon,
  Download as DownloadIconLucide,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Map tag names to SVG icons (place your SVGs in public/icons/)
const tagIcons = {
  Figma: <img src="/icons/figma.svg" alt="Figma" className="h-5 w-5" />,
  Tailwind: (
    <img src="/icons/tailwind.svg" alt="Tailwind" className="h-5 w-5" />
  ),
  React: <img src="/icons/react.svg" alt="React" className="h-5 w-5" />,
  Laravel: <img src="/icons/laravel.svg" alt="Laravel" className="h-5 w-5" />,
  Supabase: (
    <img src="/icons/supabase.svg" alt="Supabase" className="h-5 w-5" />
  ),
  Gsap: <img src="/icons/gsap-text-xlarge.svg" alt="GSAP" className="h-5 w-5" />,
};

const projects = [
  {
    id: 1,
    title: "Paquito Thumbnail",
    description: "YouTube Thumbnail.",
    images: ["/projects/paquito.jpg"],
    tags: ["Figma"],
    icons: { preview: ExternalLink, download: DownloadIconLucide },
  },
  {
    id: 2,
    title: "Business Man",
    description: "Wallpaper for Desktop Display.",
    images: ["/projects/workyboys.jpg"],
    tags: ["Figma"],
    icons: { preview: ExternalLink, download: DownloadIconLucide },
  },
  {
    id: 3,
    title: "Money Rain",
    description: "Wallpaper for Desktop Display.",
    images: ["/projects/money3.jpg"],
    tags: ["Figma"],
    icons: { preview: ExternalLink, download: DownloadIconLucide },
  },
  {
    id: 4,
    title: "Modern Portfolio",
    description: "Portfolio with Arknights theme.",
    images: ["/projects/porto1.png"],
    tags: ["React", "Tailwind", "Gsap"],
    previewUrl: "https://shin2.vercel.app",
    githubUrl: "https://github.com/G2aluh/shin2",
    icons: { preview: ExternalLink, liveDemo: Globe },
  },
  {
    id: 5,
    title: "Baca",
    description: "Place for read a news.",
    images: ["/projects/baca.png"],
    tags: ["Laravel", "Supabase"],
    icons: { preview: ExternalLink, liveDemo: Globe },
  },
  {
    id: 6,
    title: "Strong Man",
    description: "Youtube Thumbnail.",
    images: ["/projects/moge.jpg", "/projects/moge2.jpg"],
    tags: ["Figma"],
    icons: { preview: ExternalLink, liveDemo: Globe },
  },
  {
    id: 7,
    title: "AI Amazing",
    description: "UI/UX Design about AI Tools.",
    images: ["/projects/landing.png", "/projects/fitur.png", "/projects/rate.png", "/projects/trial.png", "/projects/Footer.png"],
    tags: ["Figma"],
    icons: { preview: ExternalLink},
  },
  {
    id: 8,
    title: "Mario",
    description: "Landing page Mario.",
    images: ["/projects/Mario.jpg"],
    tags: ["Figma"],
    icons: { preview: ExternalLink},
  },
  {
    id: 9,
    title: "Anime Website",
    description: "UI design for someone who want to watch anime.",
    images: ["/projects/Landing Anime.jpg"],
    tags: ["Figma"],
    icons: { preview: ExternalLink},
  },
  {
    id: 10,
    title: "Thumbnail Livestream",
    description: "Design thumbnail for livestream Mobile Legends.",
    images: ["/projects/Livetream.jpg"],
    tags: ["Figma"],
    icons: { preview: ExternalLink},
  },
];

export const ProjectsSection = () => {
  const [activePreview, setActivePreview] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [toast, setToast] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    document.body.style.overflow = activePreview ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePreview]);

  useEffect(() => {
    if (toast && !isExiting) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setToast(null);
          setIsExiting(false);
        }, 300); // Match slide-out animation duration
      }, 3000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message) => {
    setIsExiting(false);
    setToast(message);
  };

  const closeToast = () => {
    setIsExiting(true);
    setTimeout(() => {
      setToast(null);
      setIsExiting(false);
    }, 300); // Match slide-out animation duration
  };

  // Filter projects based on active tab
  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    if (activeTab === "Web/App") {
      return project.tags.some((tag) =>
        ["React", "Tailwind", "Gsap", "Laravel", "Supabase"].includes(tag)
      );
    }
    if (activeTab === "Design") {
      return project.tags.includes("Figma");
    }
    return true;
  });

  // Handle image navigation
  const handleNextImage = () => {
    if (activePreview) {
      const project = projects.find((p) => p.images.includes(activePreview));
      const totalImages = project.images.length;
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
      setActivePreview(project.images[(currentImageIndex + 1) % totalImages]);
    }
  };

  const handlePrevImage = () => {
    if (activePreview) {
      const project = projects.find((p) => p.images.includes(activePreview));
      const totalImages = project.images.length;
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
      setActivePreview(project.images[(currentImageIndex - 1 + totalImages) % totalImages]);
    }
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <style>
        {`
          @keyframes slide-in {
            0% {
              transform: translateX(100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slide-out {
            0% {
              transform: translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateX(100%);
              opacity: 0;
            }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out forwards;
          }
          .animate-slide-out {
            animation: slide-out 0.3s ease-in forwards;
          }
        `}
      </style>
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border bg-secondary p-1">
            {["All", "Web/App", "Design"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary-foreground/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card rounded-lg overflow-hidden shadow-xs flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.images[0]} // Display first image as thumbnail
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-grow flex flex-col">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <div
                      key={tag}
                      className="relative group flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tagIcons[tag] || tag}
                      {tagIcons[tag] && (
                        <span className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          {tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                {/* Action Icons */}
                <div className="mt-auto flex space-x-1">
                  {project.icons.preview && (
                    <button
                      onClick={() => {
                        setActivePreview(project.images[0]);
                        setCurrentImageIndex(0);
                      }}
                      className="flex items-center justify-center h-8 w-8 text-foreground/80 hover:text-primary bg-secondary/50 rounded transition-colors duration-300 relative group"
                      title="Preview"
                    >
                      <project.icons.preview size={18} />
                      <span className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Preview
                      </span>
                    </button>
                  )}
                  {project.icons.liveDemo && project.previewUrl && (
                    <a
                      href={project.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-8 w-8 text-foreground/80 hover:text-primary bg-secondary/50 rounded transition-colors duration-300 relative group"
                      title="Live Demo"
                    >
                      <project.icons.liveDemo size={18} />
                      <span className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Live Demo
                      </span>
                    </a>
                  )}
                  {project.icons.download && (
                    <button
                      onClick={() =>
                        showToast(
                          "Sorry, downloading is not allowed! You can view the project online or Contact the owner of the website."
                        )
                      }
                      className="flex items-center justify-center h-8 w-8 text-foreground/80 hover:text-primary bg-secondary/50 rounded transition-colors duration-300 relative group"
                      title="Download"
                    >
                      <project.icons.download size={18} />
                      <span className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Download
                      </span>
                    </button>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-8 w-8 text-foreground/80 hover:text-primary bg-secondary/50 rounded transition-colors duration-300 relative group"
                      title="GitHub"
                    >
                      <Github size={18} />
                      <span className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        GitHub
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button inline-flex items-center gap-2"
            href="#contact"
          >
            Contact Me <ArrowRight size={16} />
          </a>
        </div>
      </div>

    {/* Preview Modal */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            onClick={() => {
              setActivePreview(null);
              setCurrentImageIndex(0);
            }}
          />
          <div className="relative rounded-lg max-w-4xl w-full mx-4 shadow-lg overflow-hidden bg-gray-200/80 backdrop-filter backdrop-blur-md">
            <div className="relative p-4">
              <img
                src={activePreview}
                alt="Preview"
                className="w-full h-auto rounded-md shadow-xl"
              />
              {/* Navigation Buttons */}
              {projects.find((p) => p.images.includes(activePreview)).images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    title="Previous Image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    title="Next Image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 max-w-xs w-full">
          <div
            className={`
              bg-red-800 text-white rounded-lg shadow-lg p-4 flex items-center justify-between
              ${isExiting ? "animate-slide-out" : "animate-slide-in"}
            `}
          >
            <span>{toast}</span>
          </div>
        </div>
      )}
    </section>
  );
};