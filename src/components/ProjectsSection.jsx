import { useState, useEffect } from "react";
import { ArrowRight, Download, ExternalLink } from "lucide-react";


const tagIcons = {
  Figma: (
    <img
      src="/icons/figma.svg"
      alt="Figma"
      className="h-5 w-5"
   
    />
  ),
  Tailwind: (
    <img
      src="/icons/tailwind.svg"
      alt="Tailwind"
      className="h-5 w-5"
     
    />
  ),
    
  React: (
    <img
      src="/icons/react.svg"
      alt="Tailwind"
      className="h-5 w-5"
     
    />
  ),
  Laravel: (
    <img
      src="/icons/laravel.svg"
      alt="Tailwind"
      className="h-5 w-5"
     
    />
  ),
  Supabase: (
    <img
      src="/icons/supabase.svg"
      alt="Tailwind"
      className="h-5 w-5"
     
    />
  ),
 
  // Tambahkan tag lain sesuai kebutuhan
};


const projects = [
  {
    id: 1,
    title: "Paquito Thumbnail",
    description: "YouTube Thumbnail.",
    image: "/projects/paquito.jpg",
    tags: ["Figma"],
  },
  {
    id: 2,
    title: "Business Man",
    description: "Wallpaper for Desktop Display.",
    image: "/projects/workyboys.jpg",
    tags: ["Figma"],
  },
  {
    id: 3,
    title: "Money Rain",
    description: "Wallpaper for Desktop Display.",
    image: "/projects/money3.jpg",
    tags: ["Figma"],
  },
];

export const ProjectsSection = () => {
  const [activePreview, setActivePreview] = useState(null);

  // Disable page scroll when preview is open
  useEffect(() => {
    document.body.style.overflow = activePreview ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePreview]);

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
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card rounded-lg overflow-hidden shadow-xs"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 "
                />
              </div>
              <div className="p-6">
               <div className="flex flex-wrap gap-2 mb-4">
  {project.tags.map((tag) => (
    <div
      key={tag}
      className="relative group flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
    >
      {tagIcons[tag] || tag}

      {/* Tooltip hanya pakai Tailwind */}
      {tagIcons[tag] && (
        <span className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {tag}
        </span>
      )}
    </div>
  ))}
</div>

                <h3 className="text-xl font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex space-x-4">
                  {/* Preview Button with its own tooltip */}
                  <div className="relative group">
                    <button
                      onClick={() => setActivePreview(project.image)}
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </button>
                    <span className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Preview
                    </span>
                  </div>

                  {/* Download Link with its own tooltip */}
                  <div className="relative group">
                    <a
                      href={project.image}
                      download
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Download size={20} />
                    </a>
                    <span className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Download
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button inline-flex items-center gap-2"
            href="https://github.com/machadop1407"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check My GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Preview Modal */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred backdrop, page still visible */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            onClick={() => setActivePreview(null)}
          />
          {/* Preview box */}
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
    </section>
  );
};
