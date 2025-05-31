import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inisialisasi Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo Teman, Saya Adalah Rima alias Bot Yang Diciptakan Oleh Galuh! Jika ada yang ingin kamu tanyakan tentang Galuh, silakan tanya saja!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0); // State untuk waktu dalam milidetik
  const [timeZone, setTimeZone] = useState("Asia/Jakarta"); // Default ke WIB
  const messagesEndRef = useRef(null);

  // Menghitung waktu (milidetik) saat isLoading aktif
  useEffect(() => {
    let timer;
    if (isLoading) {
      const startTime = Date.now();
      timer = setInterval(() => {
        setLoadingTime(Date.now() - startTime);
      }, 100); // Update setiap 100ms untuk animasi halus
    } else {
      setLoadingTime(0); // Reset waktu saat loading selesai
    }
    return () => clearInterval(timer); // Bersihkan interval saat komponen unmount atau isLoading berubah
  }, [isLoading]);

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

    // Respons yang telah ditentukan (terkait portofolio)
    if (["halo", "hai", "hi", "woi", "p"].includes(lowerInput)) {
      botResponse = "Halo saya adalah bot yang dirancang untuk menjawab pertanyaan tentang Galuh Saputra apakah ada yang ingin kamu tanyakan tentang dia? misalnya, apa hobi dia? atau siapa galuh sebenarnya? bebas tanya saja sesukamu!";
    } else if (
      lowerInput.includes("siapa pemilik situs") ||
      lowerInput.includes("dibuat") ||
      lowerInput.includes("pembuat website") ||
      lowerInput.includes("siapa yang membuat")
    ) {
      botResponse = "Website ini dibuat oleh orang dengan username instagram: @2.shinnra. Jika ada yang ingin di tanyakan atau ingin lebih dekat bisa follow instagram tersebut!";
    } else if (
      lowerInput.includes("apa hobi galuh") ||
      lowerInput.includes("hobi galuh") ||
      lowerInput.includes("hobi") ||
      lowerInput.includes("hobi dia")
    ) {
      botResponse = "Hobi Galuh adalah bermain Game, Coding, dan Desain. ";
    } else if (
      lowerInput.includes("siapa galuh") ||
      lowerInput.includes("who") ||
      lowerInput.includes("dia")
    ) {
      botResponse = "Galuh Saputra adalah seorang pelajar jurusan RPL di SMK Brantas Karangkates. Ia memiliki minat besar dalam pengembangan tampilan web dan desain grafis";
    } 
     else if (
      lowerInput.includes("nomor wa") ||
      lowerInput.includes("nomor") ||
      lowerInput.includes("wa") ||
      lowerInput.includes("whatsapp")
    ) {
      botResponse = "+62 852-3659-5907 itu adalah nomor WhatsApp Galuh. Kamu bisa menghubungi dia untuk pertanyaan lebih lanjut!";
    }else {
      // Pertanyaan di luar topik portofolio, gunakan Gemini API untuk jawaban umum
      try {
        const result = await model.generateContent(
          `Tanggapi pertanyaan atau pernyataan berikut dalam bahasa yang sama dengan input. Berikan jawaban yang ramah, singkat, dan informatif sebagai asisten Galuh bernama rima yang ber tujuan membantu untuk menjelajahi dan menjelaskan portofolio. jangan ada jawaban array []. jika ada yang bertanya tentang download jawab untuk download pada website tidak bisa dan harus menghubungi Galuh langsung. jika ada yang tanya live demo jawab untuk live demo bisa langsung di coba. Jika ada yang bertanya instagram atau ig jawab @2.shinnra. Jika ada yang tanya nomor wa whatsapp jawab +6285236595907 Jika pertanyaan terlalu luas atau tidak jelas, berikan arahan untuk mencari di sumber lain. Jangan sebutkan bahwa kamu menggunakan API eksternal. Input: "${input}"`
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

  // Format waktu loading ke detik dan milidetik
  const formatLoadingTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 100); // Ambil 1 digit milidetik
    return `${seconds}.${milliseconds}s`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <style>
        {`
          @keyframes glow {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 200% 50%;
            }
          }
          .glow-effect {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.1) 0%,
              rgba(255, 255, 255, 0.8) 50%,
              rgba(255, 255, 255, 0.1) 100%
            );
            background-size: 200% auto;
            animation: glow 1.5s linear infinite;
          }
          .dark .glow-effect {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.1) 0%,
              rgba(255, 255, 255, 0.4) 50%,
              rgba(255, 255, 255, 0.1) 100%
            );
            background-size: 200% auto;
            animation: glow 1.5s linear infinite;
          }
        `}
      </style>

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
        <div className="mt-2 w-90 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-primary text-white p-3 flex justify-between items-center">
            <span className="font-semibold">Rima (Bot)</span>
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
          <div className="h-72 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-lg p-2 text-left ${
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
                <div className="bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 rounded-lg p-2 shadow text-left glow-effect">
                  <p>Sedang berpikir... ({formatLoadingTime(loadingTime)})</p>
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