import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";

export default function NoteEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [currentFileName, setCurrentFileName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Lütfen giriş yapınız.");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/note`, {
          headers: { Authorization: "Bearer " + token },
        });
        if (!res.ok) throw new Error("Not alınamadı.");

        const notes = await res.json();
        const note = notes.find((n) => n.id === parseInt(id));
        if (!note) throw new Error("Not bulunamadı.");

        setTitle(note.title);
        setDescription(note.description);
        setCurrentFileName(note.filePath || "");
      } catch (err) {
        alert(err.message);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Lütfen giriş yapınız.");
      navigate("/login");
      return;
    }

    try {
      let uploadedFileName = currentFileName;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("http://localhost:5000/api/note/upload", {
          method: "POST",
          headers: { Authorization: "Bearer " + token },
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Dosya yükleme başarısız.");

        const uploadData = await uploadRes.json();
        uploadedFileName = uploadData.fileName;
      }

      const res = await fetch(`http://localhost:5000/api/note/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          title,
          description,
          filePath: uploadedFileName,
        }),
      });

      if (!res.ok) throw new Error("Not güncelleme başarısız.");

      setSuccessMessage("Not başarıyla güncellendi.");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-800 to-blue-900 flex items-center justify-center p-6 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10 transform transition-all duration-300 hover:scale-[1.01]"
      >
        {/* Sol sütun */}
        <div className="flex flex-col justify-between space-y-7">
          <div>
            <h2 className="text-5xl font-extrabold text-blue-800 mb-8 text-center md:text-left drop-shadow-md">
               Notu Düzenle
            </h2>

            <label htmlFor="title" className="block mb-3 text-lg font-semibold text-gray-700">
              Ders Adı
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ders adını girin"
              required
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 text-lg"
            />

            <label htmlFor="description" className="block mt-7 mb-3 text-lg font-semibold text-gray-700">
              Açıklama
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={12}
              placeholder="Notunuzun açıklamasını yazın"
              required
              className="w-full p-4 rounded-xl border border-gray-300 resize-y focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 text-lg"
            />
          </div>
        </div>

        {/* Sağ sütun */}
        <div className="flex flex-col justify-between">
          <div>
            <label htmlFor="file-upload" className="block mb-4 text-lg font-semibold text-gray-700">
              Dosya Yükle
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
              className="block w-full text-gray-800 text-base file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition duration-300 cursor-pointer"
            />
            {currentFileName && (
              <p className="mt-5 text-md text-gray-600 flex items-center">
                <span className="text-xl mr-2">📎</span> Mevcut Dosya:{" "}
                <a
                  href={`http://localhost:5000/uploads/${currentFileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-800 ml-1"
                >
                  {currentFileName}
                </a>
              </p>
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-98 text-xl"
            >
               Notu Güncelle
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full mt-5 border border-blue-600 text-blue-700 font-semibold py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 text-lg"
            >
               Geri Dön
            </button>
          </div>
        </div>

        {successMessage && (
          <SuccessModal
            message={successMessage}
            onClose={() => setSuccessMessage("")}
          />
        )}
      </form>
    </div>
  );
}