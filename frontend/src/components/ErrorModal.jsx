// components/ErrorModal.jsx

export default function ErrorModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center border-t-4 border-red-500">
        <h2 className="text-xl font-bold text-red-600 mb-3">Hata</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          Tamam
        </button>
      </div>
    </div>
  );
}
