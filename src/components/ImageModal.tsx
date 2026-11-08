import React from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  imgSrc: string | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imgSrc, onClose }) => {
  if (!imgSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl max-h-[90vh] bg-[#113A35] rounded-3xl overflow-hidden shadow-2xl p-2 border border-emerald-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <img
          src={imgSrc}
          alt="การ์ดแต่งงาน อรุโณทัย & เอกวาล"
          className="w-full h-auto max-h-[85vh] object-contain rounded-2xl mx-auto"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};
