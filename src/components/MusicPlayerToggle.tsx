import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingAudio } from '../utils/audioPlayer';

export const MusicPlayerToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    weddingAudio.toggle();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleToggle}
        title={isPlaying ? 'คลิกเพื่อหยุดเล่นเพลง' : 'คลิกเพื่อฟังเพลงคู่บ่าวสาว'}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-xl border transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-[#113A35] text-amber-200 border-amber-300/40 ring-2 ring-amber-300/30 shadow-emerald-950/20'
            : 'bg-white/95 backdrop-blur-md text-[#20635B] border-[#E8F4F2] hover:bg-[#F4FBF9] hover:border-[#14B8A6]/40 shadow-slate-200/60'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-500" />
          )}
        </div>

        {/* Animated equalizer waves when playing */}
        {isPlaying ? (
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium whitespace-nowrap text-amber-100">
              กำลังเล่นเพลงคู่บ่าวสาว
            </span>
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2.5 bg-amber-300 rounded-full animate-bounce [animation-delay:0ms]"></span>
              <span className="w-0.5 h-3.5 bg-amber-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
              <span className="w-0.5 h-2 bg-amber-300 rounded-full animate-bounce [animation-delay:300ms]"></span>
            </div>
          </div>
        ) : (
          <span className="text-xs font-medium whitespace-nowrap">
            เปิดเพลงคู่บ่าวสาว
          </span>
        )}
      </button>
    </div>
  );
};
