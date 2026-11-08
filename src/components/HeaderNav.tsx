import React, { useState } from 'react';
import { Settings, Menu, X } from 'lucide-react';

interface HeaderNavProps {
  onOpenAdmin: () => void;
  onScrollTo: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onOpenAdmin, onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onScrollTo(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4FBF9]/95 backdrop-blur-md border-b border-[#E8F4F2] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="whitespace-nowrap shrink-0 text-decoration-none"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight text-[#113A35] font-['Kanit']">
            อรุโณทัย & เอกวาล
          </span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#20635B]">
          <button
            onClick={() => handleNavClick('invitation-card')}
            className="hover:text-[#113A35] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            บัตรเชิญ
          </button>
          <button
            onClick={() => handleNavClick('schedule')}
            className="hover:text-[#113A35] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            กำหนดการ
          </button>
          <button
            onClick={() => handleNavClick('venue')}
            className="hover:text-[#113A35] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            สถานที่จัดงาน
          </button>
          <button
            onClick={() => handleNavClick('blessings')}
            className="hover:text-[#113A35] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            สมุดอวยพร
          </button>
          <button
            onClick={() => handleNavClick('favors')}
            className="hover:text-[#113A35] transition-colors whitespace-nowrap shrink-0 cursor-pointer font-semibold text-[#113A35]"
          >
            ของชำร่วย
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            title="สำหรับคู่บ่าวสาว (ระบบจัดการแขก)"
            className="p-2 text-[#20635B] hover:text-[#113A35] hover:bg-[#E8F4F2] rounded-lg transition-colors cursor-pointer"
            aria-label="การจัดการสำหรับบ่าวสาว"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleNavClick('rsvp-form')}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#20635B] hover:bg-[#113A35] rounded-xl shadow-xs hover:shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            ลงทะเบียน RSVP
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#113A35] hover:bg-[#E8F4F2] rounded-lg cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8F4F2] bg-white px-4 py-3 space-y-2 shadow-lg">
          <button
            onClick={() => handleNavClick('invitation-card')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-[#113A35] hover:bg-[#F4FBF9] rounded-lg"
          >
            💌 บัตรเชิญมงคลสมรส
          </button>
          <button
            onClick={() => handleNavClick('schedule')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-[#113A35] hover:bg-[#F4FBF9] rounded-lg"
          >
            ⏱️ กำหนดการพิธีการ
          </button>
          <button
            onClick={() => handleNavClick('venue')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-[#113A35] hover:bg-[#F4FBF9] rounded-lg"
          >
            📍 สถานที่ ครัวกินลมชมอ่าง ลพบุรี
          </button>
          <button
            onClick={() => handleNavClick('blessings')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-[#113A35] hover:bg-[#F4FBF9] rounded-lg"
          >
            ✍️ สมุดอวยพรดิจิทัล
          </button>
          <button
            onClick={() => handleNavClick('favors')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-[#113A35] hover:bg-[#F4FBF9] rounded-lg font-semibold"
          >
            🎁 ของชำร่วย (ร่วมบริจาค)
          </button>
        </div>
      )}
    </header>
  );
};
