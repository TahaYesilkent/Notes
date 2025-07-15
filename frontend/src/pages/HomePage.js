import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center px-6 font-sans relative overflow-hidden">
      {/* Arka plan animasyon elemanları */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-3xl shadow-2xl max-w-2xl p-14 text-center animate-fadeInUp transform transition-all duration-500 hover:scale-[1.02]">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 mb-8 leading-tight drop-shadow-lg">
          Notlarını Yönet, Başarını Katla!
          <span className="block text-4xl mt-3 text-blue-600"> Akıllı Not Defteri</span>
        </h1>
        <p className="text-gray-700 text-xl mb-12 leading-relaxed">
          Ders notlarınızı zahmetsizce düzenleyin, güvenle saklayın ve ihtiyaç duyduğunuz her an kolayca erişin.
          Öğrenme yolculuğunuzda size özel bir yardımcı!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="/login"
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:from-blue-700 hover:to-indigo-800 transition duration-300 transform hover:-translate-y-1 hover:scale-105 text-lg whitespace-nowrap"
          >
            <span className="mr-3 text-2xl"></span> Giriş Yap
          </Link>
          <Link
            to="/register"
            className="flex items-center justify-center bg-white border-2 border-blue-600 text-blue-700 px-10 py-4 rounded-full font-bold shadow-xl hover:bg-blue-50 transition duration-300 transform hover:-translate-y-1 hover:scale-105 text-lg whitespace-nowrap"
          >
            <span className="mr-3 text-2xl"></span> Hemen Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}