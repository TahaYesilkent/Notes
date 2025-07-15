import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Modal from "../components/Modal";
import SuccessModal from "../components/SuccessModal";

export default function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("Giriş yapmalısınız. Yönlendiriliyorsunuz...");
          setTimeout(() => navigate("/login"), 1500);
          return;
        }

        const res = await fetch("http://localhost:5000/api/note", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!res.ok) throw new Error("Notlar alınamadı.");
        const data = await res.json();
        const selected = data.find((n) => String(n.id) === id);

        if (!selected) throw new Error("Aradığınız not bulunamadı.");
        setNote(selected);
      } catch (err) {
        setErrorMessage(err.message || "Not detayları yüklenirken bir hata oluştu.");
        console.error("Not detayları alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleArchive = async () => {
    setModalOpen(false);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/note/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (res.ok) {
        setSuccessMessage("🗂 Not başarıyla arşive taşındı.");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setErrorMessage("Arşivleme başarısız.");
      }
    } catch {
      setErrorMessage("Arşivleme sırasında ağ hatası oluştu.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-red-300">
          <p className="text-xl text-red-700 font-semibold mb-4">Hata: {errorMessage}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-5xl mx-auto space-y-10 animate-fade-in-up">

        {/* Başlık */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-blue-500">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">{note.title}</h1>
          <p className="text-sm text-gray-500">
            Oluşturulma:{" "}
            {new Date(note.createdAt).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Açıklama */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-blue-400">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Açıklama</h2>
          <div className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2 rounded-md bg-gray-50 text-gray-800 leading-relaxed text-base whitespace-pre-line">
  <p className="break-words">
    {note.description}
  </p>
</div>

        </div>

        {/* Dosya */}
        {note.filePath && (
          <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-blue-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Yüklü Dosya</h2>
            <a
              href={`http://localhost:5000/uploads/${note.filePath}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline text-lg"
            >
              📄 Dosyayı Aç ({note.filePath.split("/").pop()})
            </a>
          </div>
        )}
      </div>

      {/* Sabit Butonlar */}
      <div className="fixed bottom-6 right-6 flex flex-col sm:flex-row gap-4 z-50">
        <Link
          to={`/notes/edit/${note.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold shadow-md transition"
        >
          ✏️ Güncelle
        </Link>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-md transition"
        >
          🗂 Arşive Taşı
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-3 rounded-lg font-semibold shadow-md transition"
        >
          ◀️ Geri Dön
        </button>
      </div>

      {/* Modal ve Başarı Mesajı */}
      {modalOpen && (
        <Modal
          title="Notu Arşive Taşı"
          message="Bu not arşive taşınacaktır. Devam etmek istiyor musunuz?"
          onConfirm={handleArchive}
          onCancel={() => setModalOpen(false)}
          confirmText="Evet, Taşı"
          cancelText="Vazgeç"
        />
      )}

      {successMessage && (
        <SuccessModal message={successMessage} onClose={() => setSuccessMessage("")} />
      )}
    </div>
  );
}
