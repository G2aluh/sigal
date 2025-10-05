import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const skills = [
  /* …daftar skills seperti sebelumnya… */
   // Frontend
 
  { name: "JavaScript", level: 52, category: "frontend" },
  { name: "React", level: 59, category: "frontend" },
  { name: "Tailwind CSS", level: 92, category: "frontend" },
  

  // Backend

  { name: "Express", level: 61, category: "backend" },
  { name: "MongoDB", level: 60, category: "backend" },
  { name: "Supabase", level: 67, category: "backend" },


  //Design
  { name: "UI/UX Design", level: 64, category: "design" },
  { name: "Thumbnail", level: 83, category: "design" },
 

  // Tools
  { name: "Git/GitHub", level: 89, category: "tools" },
  { name: "ComandPrompt", level: 90, category: "tools" },
  { name: "OpenAI", level: 90, category: "tools" },
  { name: "Grok", level: 90, category: "tools" },
  { name: "Figma", level: 97, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
];

const categories = ["all", "frontend", "backend", "design", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("design");
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        {/* Kategori */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-md hover:text-primary cursor-pointer transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground hover:text-white"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name + activeCategory}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <h3 className="font-semibold text-lg mb-4">{skill.name}</h3>

              {/* Progress Bar dengan Framer Motion */}
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden mb-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="bg-primary  h-2 rounded-full origin-left"
                />
              </div>

              {/* Persentase animasi */}
              <div className="text-right">
                <CountUp
                  start={0}
                  end={skill.level}
                  duration={1.5}
                  suffix="%"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
