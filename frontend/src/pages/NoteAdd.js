import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";

export default function NoteAdd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Giriş yapmanız gerekiyor. Lütfen giriş yapın.");
      return;
    }

    try {
      let uploadedFileName = null;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("http://localhost:5000/api/note/upload", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        });

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json();
          throw new Error(errorData.error || "Dosya yüklenirken bir sorun oluştu.");
        }

        const uploadData = await uploadRes.json();
        uploadedFileName = uploadData.fileName;
      }

      const noteRes = await fetch("http://localhost:5000/api/note", {
        method: "POST",
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

      if (!noteRes.ok) {
        const errorData = await noteRes.json();
        throw new Error(errorData.error || "Not eklenirken bir sorun oluştu.");
      }

      setSuccessMessage("Notunuz başarıyla eklendi!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setErrorMessage(err.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-12 transform transition-all duration-300 hover:scale-[1.01] border-b-8 border-indigo-700 relative overflow-hidden">

        {/* Arka plan efektleri */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-spin-slow origin-bottom-left"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-spin-slow animation-delay-2000 origin-top-right"></div>

        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 mb-10 drop-shadow-lg">
            Yeni Ders Notu Oluştur
          </h2>

          {/* ✅ FORM ALANI */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div>
              <label htmlFor="title" className="block mb-2 text-lg font-semibold text-gray-700">
                Ders Adı
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Dersin adını buraya yazın"
                required
                className="w-full p-4 rounded-xl border border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 text-lg"
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-2 text-lg font-semibold text-gray-700">
                Açıklama
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Notunuzun detaylarını ve önemli bilgileri ekleyin"
                required
                className="w-full p-4 rounded-xl border border-blue-300 resize-y focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 text-lg"
              />
            </div>

            <div>
              <label htmlFor="file-upload" className="block mb-2 text-lg font-semibold text-gray-700">
                Dosya Yükle (PDF, Word, TXT vb.)
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="block w-full text-gray-700 file:bg-indigo-600 file:text-white file:rounded-lg file:px-6 file:py-3 file:font-semibold hover:file:bg-indigo-700 transition cursor-pointer text-base"
              />
            </div>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform active:scale-98 text-xl"
              >
                Notu Kaydet
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 border-2 border-indigo-600 text-indigo-700 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors duration-300 transform active:scale-98 text-lg"
              >
                Geri Dön
              </button>
            </div>
          </form>

          {/* Modallar */}
          {successMessage && (
            <SuccessModal message={successMessage} onClose={() => setSuccessMessage("")} />
          )}
          {errorMessage && (
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
          )}
        </div>
      </div>
    </div>
  );
}
