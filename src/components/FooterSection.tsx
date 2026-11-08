import React from 'react';
import { Settings } from 'lucide-react';

interface FooterSectionProps {
  onOpenAdmin: () => void;
  onScrollTo: (id: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenAdmin, onScrollTo }) => {
  return (
    <footer className="bg-[#113A35] text-white py-12 px-4 sm:px-6 border-t border-emerald-900/60">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center">
          <span className="text-xl sm:text-2xl font-normal font-['Charm'] tracking-wide">
            อรุโณทัย & เอกวาล
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#E8F4F2]/80 max-w-md mx-auto leading-relaxed">
          ขอบพระคุณแขกผู้มีเกียรติทุกท่านอย่างยิ่งที่มาร่วมเป็นสักขีพยานและแบ่งปันความสุขในวันสำคัญของเรา
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#E8F4F2]">
          <span>วันอังคารที่ 16 กุมภาพันธ์ 2570</span>
          <span aria-hidden="true">·</span>
          <span>เวลา 18:00 น. เป็นต้นไป</span>
          <span aria-hidden="true">·</span>
          <a
            href="https://maps.app.goo.gl/rEfKcCJrXwyaQBTX7"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 underline"
          >
            ครัวกินลมชมอ่าง จ.ลพบุรี
          </a>
        </div>

        <div className="pt-6 border-t border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8F4F2]/60">
          <p className="font-medium text-amber-200/90 tracking-wider">#RaekAndNamTheNeverEndingLoveStory</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onScrollTo('invitation-card')}
              className="hover:text-white transition cursor-pointer"
            >
              กลับขึ้นด้านบน
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-300 transition flex items-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>ระบบสำหรับบ่าวสาว</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
