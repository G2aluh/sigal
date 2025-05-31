import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const LanguageContext = createContext();

const translations = {
  id: {
    navbar: {
      home: "Beranda",
      about: "Tentang",
      skills: "Keterampilan",
      projects: "Proyek",
      contact: "Kontak",
      portfolio: "Portofolio Saya",
      language: "Bahasa",
      indonesian: "Indonesia",
      english: "Inggris",
    },
    chatbot: {
      initialMessage: "Halo Teman Saya Adalah Bot Yang Diciptakan Oleh Galuh!",
      placeholder: "Ketik pesan...",
      assistant: "Asisten Portofolio",
      thinking: "Sedang berpikir...",
      chatWithMe: "Chat dengan saya",
    },
    projects: {
      title: "Unggulan",
      titleHighlight: "Proyek",
      description: "Berikut adalah beberapa proyek terbaru saya. Setiap proyek dibuat dengan perhatian terhadap detail, performa, dan pengalaman pengguna.",
    },
  },
  en: {
    navbar: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      portfolio: "My Portfolio",
      language: "Language",
      indonesian: "Indonesian",
      english: "English",
    },
    chatbot: {
      initialMessage: "Hello, I am a bot created by Galuh!",
      placeholder: "Type a message...",
      assistant: "Portfolio Assistant",
      thinking: "Thinking...",
      chatWithMe: "Chat with me",
    },
    projects: {
      title: "Featured",
      titleHighlight: "Projects",
      description: "Here are some of my recent projects. Each project was carefully crafted with attention to detail, performance, and user experience.",
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "id";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    for (const k of keys) {
      value = value[k];
      if (!value) return key;
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => useContext(LanguageContext);