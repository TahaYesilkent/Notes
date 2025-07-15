import { useEffect } from "react";

export default function SuccessModal({ message, onClose, duration = 1000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeIn scale-100 transition-all duration-300 w-80 relative">
        <p className="text-lg text-green-700 font-semibold mb-4">{message}</p>

        <div className="relative h-2 w-full bg-green-100 rounded overflow-hidden">
          <div className="absolute left-0 top-0 h-full bg-green-600 animate-progressBar" />
        </div>

       
      </div>
    </div>
  );
}
