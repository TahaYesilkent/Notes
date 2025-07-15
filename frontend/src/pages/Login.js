import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Link'i import ediyoruz
import ErrorModal from "../components/ErrorModal"; // ErrorModal'ı import ettiğinizden emin olun

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null); // error yerine errorMessage kullanalım

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Her yeni denemede hata mesajını temizle

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let msg = "Giriş yaparken bir sorun oluştu. Lütfen tekrar deneyin.";
        try {
          const errorData = await response.json();
          if (response.status === 401) { // Unauthorized (Yetkisiz) hatası
            msg = "E-posta veya şifre hatalı.";
          } else if (response.status === 400 && errorData.error === "Kullanıcı bulunamadı") {
            msg = "Bu e-posta adresine kayıtlı bir hesap bulunamadı.";
          } else if (errorData && errorData.error) {
            msg = errorData.error; // Backend'den gelen diğer spesifik hatalar
          }
        } catch (jsonError) {
          // JSON parse edilemezse
          const errorText = await response.text();
          msg = errorText || msg;
        }
        setErrorMessage(msg);
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      // Eğer backend login sırasında kullanıcı adını veya e-postasını dönüyorsa, onu da saklayabiliriz
      // localStorage.setItem("userName", data.userName || data.email); // Örneğin

      navigate("/dashboard");
    } catch (err) {
      // Ağ hatası veya diğer beklenmedik hatalar
      setErrorMessage("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center p-6 font-sans">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-12 transition-all duration-300 transform hover:scale-[1.01] border-b-4 border-blue-600"
      >
        <h2 className="text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 drop-shadow-md">
          Hoş Geldin! 👋
        </h2>

        {errorMessage && (
          <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />
        )}

        <div className="mb-6">
          <label htmlFor="email-input" className="block mb-3 text-lg font-semibold text-gray-800">
            E-posta Adresi
          </label>
          <input
            type="email"
            id="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@mail.com"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 text-lg"
            required
          />
        </div>

        <div className="mb-10">
          <label htmlFor="password-input" className="block mb-3 text-lg font-semibold text-gray-800">
            Şifre
          </label>
          <input
            type="password"
            id="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrenizi girin"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 text-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform active:scale-98 text-xl flex items-center justify-center"
        >
          Giriş Yap
        </button>

        {/* Yeni Eklenen Kısım */}
        <p className="mt-8 text-center text-gray-600 text-md">
          Hesabın yok mu?{" "}
          <Link to="/register" className="text-blue-600 font-bold hover:underline hover:text-blue-800 transition duration-200">
            Kayıt Ol
          </Link>
        </p>
      </form>
    </div>
  );
}