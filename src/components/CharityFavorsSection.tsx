import React from 'react';
import { Gift, Maximize2 } from 'lucide-react';

interface CharityFavorsSectionProps {
  onOpenImageModal: (imgSrc: string) => void;
}

export const CharityFavorsSection: React.FC<CharityFavorsSectionProps> = ({ onOpenImageModal }) => {
  const posterPath = '/assets/aistudio/________________________247fa940.png';

  return (
    <section id="favors" className="py-16 px-4 sm:px-6 bg-[#F4FBF9] border-t border-b border-[#E8F4F2] scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20635B]/10 text-[#20635B] text-xs font-semibold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Wedding Favors & Charity Project</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#113A35] font-['Kanit'] tracking-tight">
            ของชำร่วย
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#20635B] font-medium font-['Charm']">
            ขอเชิญร่วมส่งต่อความรัก โดยการเปลี่ยน &ldquo;ของชำร่วย&rdquo; เป็น &ldquo;การบริจาค&rdquo;
          </p>
        </div>

        {/* Centered Poster Showcase */}
        <div className="flex flex-col items-center">
          <div className="relative group w-full max-w-2xl bg-white p-3 sm:p-5 rounded-3xl shadow-sm border border-[#E8F4F2] overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative rounded-2xl overflow-hidden bg-emerald-50">
              <img
                src={posterPath}
                alt="ป้ายโครงการเปลี่ยนของชำร่วยเป็นการบริจาค อรุโณทัย & เอกวาล"
                className="w-full h-auto object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                onClick={() => onOpenImageModal(posterPath)}
              />
              
              {/* Floating zoom overlay button */}
              <button
                type="button"
                onClick={() => onOpenImageModal(posterPath)}
                className="absolute bottom-3 right-3 bg-[#113A35]/80 hover:bg-[#113A35] text-white p-2.5 rounded-full backdrop-blur-xs shadow-md transition-all cursor-pointer group-hover:scale-110"
                title="คลิกเพื่อดูรูปขยายใหญ่"
                aria-label="ดูภาพขนาดใหญ่"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
