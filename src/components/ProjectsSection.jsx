import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ExternalLink,
  Globe,
  Download as DownloadIconLucide,
  Github,
  MessageCircle,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
    image: "/projects/paquito.jpg",
    tags: ["Figma"],
    icons: { preview: ExternalLink, download: DownloadIconLucide },
  },
  {
    id: 2,
    title: "Business Man",
    description: "Wallpaper for Desktop Display.",
    image: "/projects/workyboys.jpg",
    tags: ["Figma"],
    icons: { preview: ExternalLink, download: DownloadIconLucide },
  },
  {
    id: 3,
    title: "Money Rain",
    description: "Wallpaper for Desktop Display.",
    image: "/projects/money3.jpg",
    tags: ["Figma"],
    icons: { preview: ExternalLink, download: DownloadIconLucide },
  },
  {
    id: 4,
    title: "Modern Portfolio",
    description: "Portfolio with Arknights theme.",
    image: "/projects/porto1.png",
    tags: ["React", "Tailwind", "Gsap"],
    previewUrl: "https://shin2.vercel.app",
    githubUrl: "https://github.com/G2aluh/shin2",
    icons: { preview: ExternalLink, liveDemo: Globe },
  },
];

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Chatbot Component
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo Teman Saya Adalah Bot Yang Diciptakan Oleh Galuh!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setIsLoading(true);

    // Process response
    const lowerInput = input.toLowerCase().trim();
    let botResponse = "Hmm, that's an interesting question! For more details, check the Contact section.";

    // Predefined responses
    if (["halo", "hai", "hi", "woi", "p", ].includes(lowerInput)) {
      botResponse = "Halo saya adalah Galuh Saputra apakah ada yang ingin kamu tanyakan tentang aku? misalnya hobiku? apa yang aku sukai? bebas tanya saja sesukamu!";
    } else if (
      lowerInput.includes("who created") ||
      lowerInput.includes("dibuat") ||
      lowerInput.includes("pembuat website") ||
      lowerInput.includes("siapa yang membuat")
    ) {
      botResponse = "Website ini dibuat oleh Galuh Saputra, seorang web developer yang suka dengan React, Tailwind, dan Figma!";
    } else if (
      lowerInput.includes("apa hobi galuh") || 
      lowerInput.includes("hobi galuh") 
    ) {
      botResponse = "Hobi Galuh adalah bermain Game, Coding, dan Desain. Ia juga suka belajar teknologi baru!";
    }

    else if (
      lowerInput.includes("siapa galuh") ||
      lowerInput.includes("who") ||
      lowerInput.includes("dia")
    ) {
      botResponse = "Galuh adalah pria tampan dan pemberani dari Jawa!";
    }

    

    else {
      // Use Gemini API for random questions with language adaptation
      try {
        const result = await model.generateContent(
          `Respond to the following question or statement in the same language as the input. Keep the tone friendly and professional, and provide a concise answer suitable for a portfolio website chatbot. If the question is unrelated to the portfolio, suggest contacting the owner for more details. Input: "${input}"`
        );
        const response = await result.response;
        botResponse = response.text();
      } catch (error) {
        console.error("Gemini API error:", error);
        botResponse = lowerInput.includes("indonesia") || lowerInput.includes("siapa")
          ? "Maaf, saya tidak bisa memproses pertanyaan itu. Coba lagi atau hubungi pemilik website!"
          : "Sorry, I couldn't process that question. Please try again or contact the owner!";
      }
    }

    // Add bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsLoading(false);
    }, 500);

    setInput("");
  };

  // Scroll to perspective
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-12 w-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-300"
        title="Chat with me"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-primary text-white p-3 flex justify-between items-center">
            <span className="font-semibold">Portfolio Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-2 ${
                    msg.sender === "user"
                      ? "bg-primary text-white dark:bg-blue-500 dark:text-white"
                      : "bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 rounded-lg p-2 shadow">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type a message..."
              disabled={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const ProjectsSection = () => {
  const [activePreview, setActivePreview] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    document.body.style.overflow = activePreview ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePreview]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="bg-card rounded-lg overflow-hidden shadow-xs flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
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
                        onClick={() => setActivePreview(project.image)}
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
                        onClick={() => setShowAlert(true)}
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
            );
          })}
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
            onClick={() => setActivePreview(null)}
          />
          <div className="relative rounded-lg max-w-4xl w-full mx-4 shadow-lg overflow-hidden bg-gray-200/80 backdrop-filter backdrop-blur-md">
            <div className="p-4">
              <img
                src={activePreview}
                alt="Preview"
                className="w-full h-auto rounded-md shadow-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Alert */}
      {showAlert && (
        <div
          role="alert"
          className="fixed bottom-5 right-5 bg-red-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-50"
        >
          🚧 Cant be downloaded. You can contact the owner for more and download the file
        </div>
      )}

      {/* Chatbot */}
      <Chatbot />
    </section>
  );
};