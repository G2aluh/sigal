import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [active, setActive] = useState("Home");

  // === Theme Management ===
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // === Scroll Spy ===
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let current = active;

      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = item.name;
          }
        }
      });

      if (current !== active) {
        setActive(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  return (
    <nav className="fixed z-0 top-0 left-0 w-full">
      {/* === Desktop Sidebar === */}
      <aside className="hidden md:flex flex-col justify-center h-screen w-52 px-6 bg-transparent ">
        <ul className="space-y-6 pointer-events-auto">
          {navItems.map((item) => (
            <li key={item.name} className="relative flex items-center">
              <span
                className={cn(
                  "absolute left-[-8px] top-1/2 -translate-y-1/2 bg-red-600 rounded-full transition-all duration-500",
                  active === item.name
                    ? "h-6 w-[1px] opacity-100 scale-100"
                    : "h-0 w-[2px] opacity-0 scale-0"
                )}
              />
              <a
                href={item.href}
                onClick={() => setActive(item.name)}
                className={cn(
                  "relative uppercase tracking-wide text-[13px] transition-all duration-300",
                  active === item.name
                    ? "text-white scale-125 ml-3"
                    : "text-white/70 hover:text-white"
                )}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* === Mobile Top Navbar === */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-end items-center p-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-white focus:outline-none"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* === Mobile Overlay Menu === */}
      <div
        className={cn(
          "fixed inset-0 bg-black/90 flex flex-col items-center justify-center space-y-8 text-xl text-white transition-all duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              setActive(item.name);
              setTimeout(() => {
                window.location.hash = item.href;
              }, 300);
            }}
            className={cn(
              "hover:text-red-500 transition-colors duration-300",
              active === item.name ? "text-red-500" : "text-white/80"
            )}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;