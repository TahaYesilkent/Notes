import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import Modal from "../components/Modal";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Lütfen giriş yapınız.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/note", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) throw new Error("Notlar yüklenirken hata oluştu.");

      const data = await res.json();
      setNotes(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const openModal = (id) => {
    setSelectedNoteId(id);
    setModalOpen(true);
  };

  const handleArchive = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/note/${selectedNoteId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) throw new Error("Arşive taşıma işlemi başarısız.");

      setNotes((prev) => prev.filter((note) => note.id !== selectedNoteId));
      setSuccessMessage("🗂 Not arşive taşındı.");
      setModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // Yardımcı fonksiyon: metni belirli uzunlukta kes, gerekiyorsa "..." ekle
  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Yükleniyor...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4 md:mb-0 drop-shadow-sm">
            Not Defteri
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/notes/add"
            className="flex items-center bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg font-semibold"
          >
            <span className="mr-2 text-xl">✨</span> Yeni Not Ekle
          </Link>
          <Link
            to="/archive"
            className="flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg font-semibold"
          >
            <span className="mr-2 text-xl">🗄️</span> Arşiv
          </Link>
          <Link
            to="/profile"
            className="flex items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg font-semibold"
          >
            <span className="mr-2 text-xl">👤</span> Profil
          </Link>
        </div>
      </header>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-3xl shadow-lg p-8">
          <p className="text-gray-600 text-2xl font-medium mb-4">
            Henüz hiç notunuz bulunmamaktadır.
          </p>
          <p className="text-gray-500 text-lg">
            Hemen yukarıdaki "Yeni Not Ekle" butonuna tıklayarak ilk notunuzu oluşturun!
          </p>
        </div>
      ) : (
        <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-3xl shadow-lg p-7 transition transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between border border-gray-100 hover:border-blue-300 duration-300"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
                  {truncate(note.title, 35)}
                </h2>
                <p className="text-gray-600 text-base mb-4 line-clamp-3">
                  {truncate(note.description, 80)}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 justify-between items-center pt-4 border-t border-gray-100">
                <Link
                  to={`/notes/edit/${note.id}`}
                  className="text-blue-600 hover:text-blue-800 font-semibold flex items-center group"
                >
                  <span className="text-lg mr-1 transform group-hover:scale-110 transition-transform duration-200">
                    
                  </span>{" "}
                  Düzenle
                </Link>
                <Link
                  to={`/notes/details/${note.id}`}
                  className="text-green-600 hover:text-green-800 font-semibold flex items-center group"
                >
                  <span className="text-lg mr-1 transform group-hover:scale-110 transition-transform duration-200">
                    
                  </span>{" "}
                  Görüntüle
                </Link>
                <button
                  onClick={() => openModal(note.id)}
                  className="text-red-600 hover:text-red-800 font-semibold flex items-center group"
                >
                  <span className="text-lg mr-1 transform group-hover:scale-110 transition-transform duration-200">
                    
                  </span>{" "}
                  Arşive Taşı
                </button>
              </div>
            </div>
          ))}
        </section>                                                                 
      )}

      {modalOpen && (
        <Modal
          title="Notu Arşive Taşı"
          message="Bu not  arşive taşınacaktır. Devam etmek istediğinize emin misiniz?"
          onConfirm={handleArchive}
          onCancel={() => setModalOpen(false)}  
          confirmText="Evet, Arşive Taşı"
          cancelText="İptal"
        />
      )}

      {successMessage && (
        <SuccessModal
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
    </div>
  );
}