import React from 'react';
import { Clock, UserCheck, Sparkles, Heart, Utensils, Camera } from 'lucide-react';
import { ScheduleEvent } from '../types/wedding';

export const ScheduleSection: React.FC = () => {
  const events: ScheduleEvent[] = [
    {
      time: '17:00 น.',
      title: 'ลงทะเบียน & ถ่ายภาพที่ระลึก',
      titleEn: 'Registration & Welcome Drinks',
      description: 'ต้อนรับแขกผู้มีเกียรติทุกท่าน ลงทะเบียนรับสติกเกอร์ และถ่ายภาพร่วมกับบ่าวสาว ณ ซุ้มแกลเลอรีริมน้ำ',
      iconName: 'user-check'
    },
    {
      time: '18:00 น.',
      title: 'พิธีเปิด & บ่าวสาวเข้าสู่งาน',
      titleEn: 'Grand Entrance & Opening',
      description: 'เปิดตัวคู่บ่าวสาวขึ้นสู่เวทีท่ามกลางบรรยากาศพระอาทิตย์ตกดิน',
      iconName: 'sparkles'
    },
    {
      time: '19:00 น.',
      title: 'ร่วมรับประทานอาหาร & ดนตรีสด',
      titleEn: 'Banquet Dinner & Live Music',
      description: 'เชิญแขกผู้มีเกียรติร่วมรับประทานอาหารค่ำรสเลิศ พร้อมเพลิดเพลินกับเสียงดนตรีอะคูสติกสดริมอ่างเก็บน้ำ',
      iconName: 'utensils'
    }
  ];

  const renderIcon = (name: ScheduleEvent['iconName']) => {
    switch (name) {
      case 'user-check':
        return <UserCheck className="w-5 h-5 text-amber-300" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-amber-300" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-amber-300" />;
      case 'utensils':
        return <Utensils className="w-5 h-5 text-amber-300" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <section id="schedule" className="py-14 px-4 sm:px-6 bg-[#F4FBF9]/60 border-t border-b border-[#E8F4F2]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#20635B] mb-1">
            Wedding Itinerary
          </p>
          <h2 className="text-3xl font-bold text-[#113A35] font-['Kanit']">
            กำหนดการพิธีการ
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            วันอังคารที่ 16 กุมภาพันธ์ 2570 · ครัวกินลมชมอ่าง จังหวัดลพบุรี
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-[#20635B]/20 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
          {events.map((event, idx) => (
            <div key={idx} className="relative group">
              {/* Dot on line */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#20635B] flex items-center justify-center shadow-md border-2 border-white">
                {renderIcon(event.iconName)}
              </div>

              {/* Event Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8F4F2] shadow-xs hover:shadow-md transition duration-200">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                  <span className="text-sm sm:text-base font-bold text-[#20635B] font-mono tabular-nums">
                    {event.time}
                  </span>
                  <span className="text-xs text-gray-400 font-light hidden sm:inline">
                    {event.titleEn}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-[#113A35]">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
