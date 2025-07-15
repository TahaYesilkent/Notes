import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName"); // istersen giriş yapan kullanıcının adını burada tutabilirsin

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-8 py-4 flex justify-between items-center shadow-lg font-sans relative z-20">
      <Link to="/" className="text-3xl font-extrabold tracking-wide hover:text-blue-200 transition-colors duration-300 transform hover:scale-105">
         Notlar
      </Link>

      {/* Orta Kısım - Linkler */}
      <div className="hidden md:flex space-x-7 items-center text-lg font-medium">
        {!token && (
          <Link
            to="/"
            className="hover:text-blue-200 transition-colors duration-300 px-3 py-2 rounded-md hover:bg-blue-600"
          >
            Ana Sayfa
          </Link>
        )}
        {token && (
          <Link
            to="/dashboard"
            className="hover:text-blue-200 transition-colors duration-300 px-3 py-2 rounded-md hover:bg-blue-600"
          >
            Dashboard
          </Link>
        )}
        {token && (
          <Link
            to="/notes/add"
            className="hover:text-blue-200 transition-colors duration-300 px-3 py-2 rounded-md hover:bg-blue-600"
          >
            Yeni Not Ekle
          </Link>
        )}
        {token && (
          <Link
            to="/archive"
            className="hover:text-blue-200 transition-colors duration-300 px-3 py-2 rounded-md hover:bg-blue-600"
          >
            Arşiv
          </Link>
        )}
        {token && (
          <Link
            to="/profile"
            className="hover:text-blue-200 transition-colors duration-300 px-3 py-2 rounded-md hover:bg-blue-600"
          >
            Profil
          </Link>
        )}
      </div>

      {/* Sağ Kısım - Kullanıcı Bilgisi ve Aksiyon Butonları */}
      <div className="flex items-center space-x-5">
        {token ? (
          <>
            {userName && (
              <span className="hidden lg:inline text-lg font-medium text-blue-100">
                Hoş geldin, <strong className="text-white">{userName}</strong>!
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Giriş Yap
            </Link>
            <Link
              to="/register"
              className="bg-blue-100 text-blue-800 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-200 transition-all duration-300 transform hover:scale-105 active:scale-95 hidden sm:inline-block"
            >
              Kayıt Ol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}