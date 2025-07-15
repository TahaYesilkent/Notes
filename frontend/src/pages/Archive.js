import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import SuccessModal from "../components/SuccessModal";

export default function Archive() {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Yardımcı truncate fonksiyonu
  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/note/archived", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Arşivlenmiş notlar alınamadı");
        return res.json();
      })
      .then((data) => setArchivedNotes(data))
      .catch((err) => console.error(err));
  }, []);

  const handlePermanentDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/note/${selectedNoteId}/hard`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.ok) {
        setArchivedNotes((prev) => prev.filter((note) => note.id !== selectedNoteId));
        setModalOpen(false);
        setSuccessMessage("Not kalıcı olarak silindi.");
      } else {
        alert("Silme işlemi başarısız.");
      }
    } catch (error) {
      alert("Silme sırasında hata oluştu.");
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/note/${id}/restore`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.ok) {
        setArchivedNotes((prev) => prev.filter((note) => note.id !== id));
        setSuccessMessage("Not başarıyla geri yüklendi.");
      } else {
        alert("Geri yükleme başarısız.");
      }
    } catch (error) {
      alert("Geri yükleme sırasında hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 font-sans">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-12 text-center drop-shadow-lg animate-fade-in">
        🗂️ Arşivlenmiş Notlar
      </h1>

      {archivedNotes.length === 0 ? (
        <p className="text-center text-gray-500 text-2xl mt-20 animate-fade-in">
          📝 Arşivde henüz not bulunmamaktadır.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {archivedNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-3xl shadow-xl p-7 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
                  {/* Başlık 15 karakterden uzunsa kısalt */}
                  {truncate(note.title, 15)}
                </h2>
                <p className="text-gray-600 mb-5 text-base leading-relaxed">
                  {/* Açıklama 30 karakterden uzunsa kısalt */}
                  {truncate(note.description, 30)}
                </p>
                <p className="text-sm text-gray-400 font-medium italic">
                  Arşiv Tarihi:{" "}
                  {new Date(note.deletedAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleRestore(note.id)}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:scale-102 flex items-center justify-center text-lg font-medium"
                >
                  Geri Yükle
                </button>
                <button
                  onClick={() => {
                    setSelectedNoteId(note.id);
                    setModalOpen(true);
                  }}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl shadow-md hover:bg-red-700 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:scale-102 flex items-center justify-center text-lg font-medium"
                >
                  Kalıcı Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal
          title="Notu Kalıcı Olarak Sil"
          message="Bu notu geri getiremezsiniz. Silmek istediğinizden emin misiniz?"
          onConfirm={handlePermanentDelete}
          onCancel={() => setModalOpen(false)}
          confirmText="Evet, Sil"
          cancelText="Vazgeç"
        />
      )}

      {successMessage && (
        <SuccessModal message={successMessage} onClose={() => setSuccessMessage("")} />
      )}
    </div>
  );
}