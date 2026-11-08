import React from 'react';
import { Sparkles, Palette } from 'lucide-react';
import { ColorThemeSwatch } from '../types/wedding';

export const DressCodeSection: React.FC = () => {
  const swatches: ColorThemeSwatch[] = [
    {
      nameTh: 'เขียวเอเมอรัลด์เข้ม',
      nameEn: 'Deep Emerald',
      hex: '#113A35',
      textColor: '#FFFFFF'
    },
    {
      nameTh: 'เขียวฟอเรสต์',
      nameEn: 'Forest Green',
      hex: '#20635B',
      textColor: '#FFFFFF'
    },
    {
      nameTh: 'เขียวเสจ / มิ้นต์',
      nameEn: 'Sage & Mint',
      hex: '#88C2B6',
      textColor: '#113A35'
    },
    {
      nameTh: 'ทองแชมเปญ',
      nameEn: 'Champagne Gold',
      hex: '#E6C875',
      textColor: '#113A35'
    },
    {
      nameTh: 'ขาวงาช้าง / ครีม',
      nameEn: 'Ivory Cream',
      hex: '#FAF8F3',
      textColor: '#113A35',
      border: true
    }
  ];

  return (
    <section id="dress-code" className="py-14 px-4 sm:px-6 bg-[#F4FBF9]/60 border-t border-b border-[#E8F4F2]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#20635B] mb-1">
          Theme & Dress Code
        </p>
        <h2 className="text-3xl font-bold text-[#113A35] font-['Kanit']">
          ธีมและโทนสีเครื่องแต่งกาย
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-lg mx-auto">
          เพื่อความกลมกลืนและภาพถ่ายที่สวยงาม ขอเชิญร่วมแต่งกายด้วยชุดสุภาพในโทนสีดังต่อไปนี้
        </p>

        {/* Color Palette Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
          {swatches.map((color, idx) => (
            <div
              key={idx}
              className="bg-white p-3 rounded-2xl border border-[#E8F4F2] shadow-xs flex flex-col items-center hover:scale-102 transition duration-200"
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-inner mb-2.5 flex items-center justify-center"
                style={{
                  backgroundColor: color.hex,
                  border: color.border ? '1px solid #E2E8F0' : 'none'
                }}
              >
                <Sparkles className="w-4 h-4 opacity-70" style={{ color: color.textColor }} />
              </div>
              <p className="text-xs font-semibold text-[#113A35] text-center leading-tight">
                {color.nameTh}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{color.nameEn}</p>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{color.hex}</p>
            </div>
          ))}
        </div>

        {/* Friendly Suggestion Note */}
        <div className="mt-8 bg-white p-5 rounded-2xl border border-[#E8F4F2] shadow-xs max-w-xl mx-auto text-xs sm:text-sm text-gray-600 leading-relaxed">
          <p className="font-medium text-[#113A35] mb-1 flex items-center justify-center gap-1.5">
            <Palette className="w-4 h-4 text-[#20635B]" />
            <span>คำแนะนำการแต่งกาย</span>
          </p>
          <p>
            ชุดสุภาพสากล, ชุดเดรสโทนสีเขียว/ทอง/เอิร์ธโทน, หรือชุดไทยร่วมสมัยตามสะดวกของแขกผู้มีเกียรติทุกท่าน
            (ทั้งนี้ โทนสีเป็นเพียงแนวทาง ท่านสามารถสวมใส่ชุดที่สะดวกและมั่นใจได้ตามอัธยาศัยครับ/ค่ะ)
          </p>
        </div>
      </div>
    </section>
  );
};
