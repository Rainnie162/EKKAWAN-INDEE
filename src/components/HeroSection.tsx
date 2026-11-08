import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Maximize2, Upload, Sparkles, ChevronRight } from 'lucide-react';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface HeroSectionProps {
  onScrollToRsvp: () => void;
  onOpenImageModal: (imgSrc: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToRsvp, onOpenImageModal }) => {
  // Available photo gallery presets
  const cardImages = [
    {
      id: 'invitation-card',
      label: 'การ์ดเชิญ',
      src: '/assets/aistudio/wedding-card_1dfd0674.png',
      desc: 'บัตรเชิญงานมงคลสมรส อรุโณทัย & เอกวาล'
    },
    {
      id: 'venue-scenery',
      label: 'บรรยากาศริมอ่าง',
      src: '/assets/aistudio/844826883_1097902356494371_1490697518862713933_n_dd2b54d0.jpg',
      desc: 'ครัวกินลมชมอ่าง ลพบุรี'
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  });

  useEffect(() => {
    // Wedding Date: February 16, 2027 at 18:00:00 ICT (Thailand GMT+7)
    const weddingTime = new Date('2027-02-16T18:00:00+07:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = weddingTime - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentDisplayImage = customImage || cardImages[activeImageIndex].src;

  return (
    <section id="invitation-card" className="pt-8 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#113A35] font-['Charm'] leading-tight mb-3">
            อรุโณทัย & เอกวาล
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#20635B] font-light max-w-3xl mx-auto sm:whitespace-nowrap">
            มีความยินดีขอเรียนเชิญท่านเพื่อเป็นเกียรติและร่วมแสดงความยินดีในงานมงคลสมรสของเรา
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs sm:text-sm text-[#113A35]/80 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#20635B]" />
              วันอังคารที่ 16 กุมภาพันธ์ 2570
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#20635B]" />
              เวลา 18:00 น. เป็นต้นไป
            </span>
            <span aria-hidden="true">·</span>
            <a
              href="https://maps.app.goo.gl/rEfKcCJrXwyaQBTX7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0D9488] hover:text-[#113A35] hover:underline"
            >
              <MapPin className="w-4 h-4 text-[#0D9488]" />
              ครัวกินลมชมอ่าง จ.ลพบุรี
            </a>
          </div>
        </div>

        {/* Wedding Card Interactive Card Frame */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E8F4F2] mb-8 transition-all">
          {/* Card Image Display Area with Hover Overlay */}
          <div className="relative bg-[#E8F4F2]/50 p-4 sm:p-6 flex flex-col items-center">
            {/* Image Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white/80 backdrop-blur-xs rounded-xl border border-[#E8F4F2] mb-4 shadow-xs">
              {cardImages.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setCustomImage(null);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    !customImage && activeImageIndex === idx
                      ? 'bg-[#20635B] text-white shadow-xs'
                      : 'text-[#20635B] hover:bg-[#E8F4F2]'
                  }`}
                >
                  {img.label}
                </button>
              ))}
              {customImage && (
                <span className="px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-lg">
                  รูปที่คุณเลือก
                </span>
              )}
            </div>

            {/* Main Interactive Card Frame */}
            <div
              className="relative group w-full max-w-xl rounded-2xl overflow-hidden shadow-lg bg-white border border-[#E8F4F2] cursor-pointer"
              onClick={() => onOpenImageModal(currentDisplayImage)}
              title="คลิกเพื่อดูภาพขยายเต็มจอ"
            >
              <img
                src={currentDisplayImage}
                alt="การ์ดแต่งงาน อรุโณทัย ไยกะมุด & เอกวาล อินทร์ดี"
                className="w-full h-auto object-contain max-h-[580px] mx-auto transition-transform duration-500 group-hover:scale-101"
                referrerPolicy="no-referrer"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-[#113A35]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <span className="text-white text-xs sm:text-sm font-medium bg-[#113A35]/85 px-4 py-2 rounded-xl backdrop-blur-xs flex items-center gap-2 shadow-md">
                  <Maximize2 className="w-4 h-4 text-amber-300" />
                  คลิกเพื่อดูการ์ดแบบขยายเต็มจอ
                </span>
              </div>
            </div>

            {/* File Upload Trigger */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleCustomFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-[#20635B] hover:text-[#113A35] font-medium flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-[#E8F4F2] transition cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                คลิกเพื่อเปลี่ยนรูปการ์ดจากเครื่องของคุณ
              </button>
              {customImage && (
                <button
                  type="button"
                  onClick={() => setCustomImage(null)}
                  className="text-xs text-rose-600 hover:text-rose-800 font-medium py-1 px-2 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                >
                  คืนค่ารูปเริ่มต้น
                </button>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              *(หากต้องการใช้ไฟล์การ์ดของคุณเอง สามารถกดเปลี่ยนรูปได้ทันที)*
            </p>
          </div>

          {/* Countdown Timer Strip */}
          <div className="bg-[#20635B] text-white py-6 px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <p className="text-xs sm:text-sm tracking-widest uppercase text-[#E8F4F2] font-semibold">
                นับถอยหลังสู่วันมงคลสมรส
              </p>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>

            {timeLeft.isCompleted ? (
              <div className="py-2 text-xl font-bold text-amber-200">
                🎉 วันนี้คือวันมงคลสมรสของเรา ยินดีต้อนรับแขกผู้มีเกียรติทุกท่านครับ/ค่ะ 🎉
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm mx-auto text-center">
                <div className="bg-[#113A35] rounded-2xl p-2.5 sm:p-3 shadow-inner border border-emerald-900/40">
                  <span className="text-2xl sm:text-3xl font-bold block tabular-nums text-white">
                    {timeLeft.days}
                  </span>
                  <span className="text-[11px] text-[#E8F4F2] font-light">วัน</span>
                </div>
                <div className="bg-[#113A35] rounded-2xl p-2.5 sm:p-3 shadow-inner border border-emerald-900/40">
                  <span className="text-2xl sm:text-3xl font-bold block tabular-nums text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-[#E8F4F2] font-light">ชั่วโมง</span>
                </div>
                <div className="bg-[#113A35] rounded-2xl p-2.5 sm:p-3 shadow-inner border border-emerald-900/40">
                  <span className="text-2xl sm:text-3xl font-bold block tabular-nums text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-[#E8F4F2] font-light">นาที</span>
                </div>
                <div className="bg-[#113A35] rounded-2xl p-2.5 sm:p-3 shadow-inner border border-emerald-900/40">
                  <span className="text-2xl sm:text-3xl font-bold block tabular-nums text-amber-300">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-[#E8F4F2] font-light">วินาที</span>
                </div>
              </div>
            )}

            {/* Quick Actions Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onScrollToRsvp}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#113A35] font-semibold text-sm rounded-xl shadow-md transition-transform hover:scale-102 flex items-center gap-2 cursor-pointer"
              >
                <span>ตอบรับเข้าร่วมงาน (RSVP)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                  className="px-4 py-2.5 bg-[#113A35] hover:bg-[#0c2925] text-white text-xs sm:text-sm font-medium rounded-xl border border-emerald-800/60 transition flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>บันทึกลงปฏิทิน</span>
                </button>

                {calendarMenuOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 p-2 z-20 text-left">
                    <a
                      href={generateGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 text-xs font-medium hover:bg-[#F4FBF9] text-[#113A35] rounded-lg transition"
                      onClick={() => setCalendarMenuOpen(false)}
                    >
                      🗓️ เพิ่มใน Google Calendar
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        downloadIcsFile();
                        setCalendarMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-xs font-medium hover:bg-[#F4FBF9] text-[#113A35] rounded-lg transition cursor-pointer"
                    >
                      🍎 บันทึกไฟล์ Apple / iCal (.ics)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
