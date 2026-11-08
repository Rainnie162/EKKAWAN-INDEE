import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Car, ExternalLink, Compass } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const mapsUrl = 'https://maps.app.goo.gl/rEfKcCJrXwyaQBTX7';
  const addressText = 'ครัวกินลมชมอ่าง ตำบลโคกตูม อำเภอเมืองลพบุรี จังหวัดลพบุรี 15210';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="venue" className="py-14 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#20635B] mb-1">
            Wedding Location
          </p>
          <h2 className="text-3xl font-bold text-[#113A35] font-['Kanit']">
            สถานที่จัดงาน & การเดินทาง
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            บรรยากาศริมอ่างเก็บน้ำ วิวพระอาทิตย์ตกดินอันแสนอบอุ่นและโรแมนติก
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8F4F2] shadow-xl overflow-hidden">
          {/* Venue Atmosphere Photo */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#113A35]">
            <img
              src="/assets/aistudio/844826883_1097902356494371_1490697518862713933_n_dd2b54d0.jpg"
              alt="ครัวกินลมชมอ่าง จังหวัดลพบุรี บรรยากาศจริง"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs font-medium text-amber-300 tracking-wider uppercase block mb-1">
                  VENUE & RECEPTION
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-['Kanit']">
                  ครัวกินลมชมอ่าง จังหวัดลพบุรี
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>อำเภอเมืองลพบุรี จังหวัดลพบุรี</span>
                </p>
              </div>
            </div>
          </div>

          {/* Details & Actions Grid */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Location summary */}
              <div className="bg-[#F4FBF9] p-5 rounded-2xl border border-[#E8F4F2] space-y-3">
                <h4 className="text-base font-bold text-[#113A35] flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#20635B]" />
                  <span>ข้อมูลที่ตั้งและการเดินทาง</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  ร้านตั้งอยู่ริมอ่างเก็บน้ำ บรรยากาศโปร่งสบาย เดินทางสะดวกจากตัวเมืองลพบุรีเพียง 15-20 นาที
                </p>
                <div className="pt-2 text-xs text-gray-500 font-mono">
                  {addressText}
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 text-xs text-[#20635B] hover:text-[#113A35] font-semibold transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">คัดลอกที่อยู่แล้ว!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>คัดลอกที่อยู่เพื่อนำทาง</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right: Parking & Amenities */}
              <div className="bg-[#F4FBF9] p-5 rounded-2xl border border-[#E8F4F2] space-y-3">
                <h4 className="text-base font-bold text-[#113A35] flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#20635B]" />
                  <span>ที่จอดรถ & สิ่งอำนวยความสะดวก</span>
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#20635B] font-bold">✓</span>
                    <span>ลานจอดรถส่วนตัวกว้างขวาง รองรับรถยนต์ได้มากกว่า 150 คัน</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#20635B] font-bold">✓</span>
                    <span>พื้นที่จัดเลี้ยงริมน้ำ อากาศถ่ายเทสะดวก พร้อมจุดถ่ายภาพสวยงาม</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct Navigation Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#20635B] hover:bg-[#113A35] text-white font-medium text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>เปิดแผนที่ Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href="https://maps.apple.com/?q=ครัวกินลมชมอ่าง+ลพบุรี"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white hover:bg-gray-50 text-[#113A35] font-medium text-xs sm:text-sm rounded-xl border border-gray-200 shadow-xs transition flex items-center gap-2"
              >
                <span>เปิดใน Apple Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
