export default function Modal({ title, message, onConfirm, onCancel, confirmText = "Evet", cancelText = "İptal" }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center animate-fadeIn">
        <h3 className="text-xl font-bold text-red-600 mb-4">{title}</h3>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
