import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import Chatbot from "./components/Chatbot";


function App() {
  return (
    <>
      <Chatbot></Chatbot>
      <Toaster />
      <BrowserRouter>
        <Routes>

          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
