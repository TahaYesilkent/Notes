import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email"); // Email token oluşturulurken localStorage'a eklenmeli
    if (!token) {
      navigate("/login");
    } else {
      setEmail(userEmail || "Bilinmeyen kullanıcı");
    }
  }, [navigate]); // navigate bağımlılık dizisine eklendi

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 text-center transform transition-all duration-300 hover:scale-[1.01] border-l-4 border-indigo-600">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 mb-8 drop-shadow-md">
          👤 Profilim
        </h1>

        <div className="mb-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm">
          <p className="text-gray-600 text-lg font-medium mb-2">Giriş Yapılan E-posta Adresi:</p>
          <span className="inline-block text-indigo-800 bg-indigo-200 px-5 py-3 rounded-full font-semibold text-xl break-words">
            {email}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold py-4 rounded-xl shadow-lg hover:from-red-600 hover:to-rose-700 transition-all duration-300 transform active:scale-98 text-xl flex items-center justify-center"
        >
          <span className="mr-3 text-2xl"></span> Çıkış Yap
        </button>
      </div>
    </div>
  );
}