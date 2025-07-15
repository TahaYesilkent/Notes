import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorModal from "../components/ErrorModal"; // Ekledik

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let errorMsg = "Kayıt olurken bir sorun oluştu. Lütfen tekrar deneyin.";
        try {
          const errorData = await res.json();
          if (errorData && errorData.error === "Bu e-posta adresi zaten kayıtlı.") {
            errorMsg = "Bu e-posta adresi zaten kullanımda.";
          } else if (errorData && errorData.error) {
            errorMsg = errorData.error;
          }
        } catch (jsonError) {
          const errorText = await res.text();
          errorMsg = errorText || errorMsg;
        }
        setErrorMessage(errorMsg);
        return;
      }

      alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      navigate("/login");
    } catch (error) {
      setErrorMessage("Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 px-6 font-sans">
      <form
        onSubmit={handleRegister}
        className="bg-white p-12 rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 hover:scale-[1.01] border-t-4 border-blue-600"
      >
        <h2 className="text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 drop-shadow-md">
          Yeni Hesap Oluştur
          <span className="block text-2xl mt-2 text-gray-500 font-normal">Hızlı ve Kolay Kayıt</span>
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
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 text-lg"
            placeholder="ornek@mail.com"
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
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 text-lg"
            placeholder="En az 6 karakterli bir şifre girin"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform active:scale-98 text-xl flex items-center justify-center"
        >
          Kayıt Ol
        </button>

        <p className="mt-8 text-center text-gray-600 text-md">
          Zaten bir hesabın var mı?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline hover:text-blue-800 transition duration-200">
            Giriş Yap
          </Link>
        </p>
      </form>
    </div>
  );
}