import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inisialisasi Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo Teman Saya Adalah Bot Yang Diciptakan Oleh Galuh!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeZone, setTimeZone] = useState("Asia/Jakarta"); // Default ke WIB
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Tambah pesan pengguna dengan timestamp
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input, timestamp: new Date() },
    ]);
    setIsLoading(true);

    // Proses respons
    const lowerInput = input.toLowerCase().trim();
    let botResponse = "Hmm, itu pertanyaan menarik! Untuk detail lebih lanjut, cek bagian Kontak.";

    // Respons yang telah ditentukan
    if (["halo", "hai", "hi", "woi", "p"].includes(lowerInput)) {
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
    } else if (
      lowerInput.includes("siapa galuh") ||
      lowerInput.includes("who") ||
      lowerInput.includes("dia")
    ) {
      botResponse = "Galuh adalah pria tampan dan pemberani dari Jawa!";
    } else {
      // Gunakan Gemini API untuk pertanyaan acak dengan adaptasi bahasa
      try {
        const result = await model.generateContent(
          `Tanggapi pertanyaan atau pernyataan berikut dalam bahasa yang sama dengan input. Pertahankan nada yang ramah dan profesional, serta berikan jawaban singkat yang cocok untuk chatbot situs portofolio. Jika pertanyaannya tidak terkait portofolio, sarankan untuk menghubungi pemilik situs untuk detail lebih lanjut. Input: "${input}"`
        );
        const response = await result.response;
        botResponse = response.text();
      } catch (error) {
        console.error("Kesalahan Gemini API:", error);
        botResponse = lowerInput.includes("indonesia") || lowerInput.includes("siapa")
          ? "Maaf, saya tidak bisa memproses pertanyaan itu. Coba lagi atau hubungi pemilik website!"
          : "Sorry, I couldn't process that question. Please try again or contact the owner!";
      }
    }

    // Tambah respons bot dengan timestamp
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse, timestamp: new Date() },
      ]);
      setIsLoading(false);
    }, 500);

    setInput("");
  };

  // Gulir ke bawah
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format timestamp berdasarkan zona waktu
  const formatTimestamp = (date) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: timeZone === "America/New_York",
      timeZone: timeZone,
    };
    return new Intl.DateTimeFormat(
      timeZone === "Asia/Jakarta" ? "id-ID" : "en-US",
      options
    ).format(date);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Tombol Toggle Chatbot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-12 w-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-300"
        title="Chat dengan saya"
      >
        <MessageCircle size={24} />
      </button>

      {/* Jendela Chatbot */}
      {isOpen && (
        <div className="mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-primary text-white p-3 flex justify-between items-center">
            <span className="font-semibold">Asisten Portofolio</span>
            <div className="flex items-center gap-2">
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="bg-primary text-white border border-white/20 rounded px-1 py-0.5 text-sm focus:outline-none"
              >
                <option value="Asia/Jakarta">WIB (Jakarta)</option>
                <option value="America/New_York">EST (US)</option>
              </select>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
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
                  className={`max-w-[70%] rounded-lg p-2 text-left ${
                    msg.sender === "user"
                      ? "bg-primary text-white dark:bg-blue-500 dark:text-white"
                      : "bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {formatTimestamp(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 rounded-lg p-2 shadow text-left">
                  <p>Sedang berpikir...</p>
                  <p className="text-xs mt-1 opacity-70">
                    {formatTimestamp(new Date())}
                  </p>
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
              placeholder="Ketik pesan..."
              disabled={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;