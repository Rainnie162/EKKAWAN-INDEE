import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Heart, Share2, Sparkles, User, Phone, Users, MessageSquare, UtensilsCrossed, Calendar, MapPin } from 'lucide-react';
import { RsvpSubmission } from '../types/wedding';
import { getStoredFormConfig, saveRsvp } from '../utils/storage';

interface RsvpFormSectionProps {
  onRsvpSuccess: (newRsvp: RsvpSubmission) => void;
  onScrollToBlessings: () => void;
}

export const RsvpFormSection: React.FC<RsvpFormSectionProps> = ({ onRsvpSuccess, onScrollToBlessings }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [side, setSide] = useState<'แขกเจ้าบ่าว' | 'แขกเจ้าสาว' | 'เพื่อนร่วมงาน / คนรู้จัก' | ''>('');
  const [status, setStatus] = useState<'มาร่วมงาน' | 'ไม่สามารถมาร่วมงานได้' | ''>('');
  const [guests, setGuests] = useState('1 ท่าน');
  const [dietary, setDietary] = useState('อาหารทั่วไป');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRsvp, setSubmittedRsvp] = useState<RsvpSubmission | null>(null);

  const quickWishes = [
    'ขอให้ทั้งสองครองรักกันตราบนานเท่านาน มีความสุขมากๆ ครับ 💕',
    'ยินดีด้วยกับคุณเอกและคุณอรุโณทัย เหมาะสมกันที่สุดเลย ✨',
    'ขอให้ครอบครัวอบอุ่นและมีแต่รอยยิ้มตลอดไปค่ะ 💐',
    'ยินดีด้วยมากๆ เพื่อน! ไว้เจอกันในงานเลี้ยงนะ 🥂'
  ];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#20635B', '#D4AF37', '#14B8A6', '#F3E5AB']
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !side || !status) {
      alert('กรุณากรอกข้อมูลที่จำเป็น (*) ให้ครบถ้วน');
      return;
    }

    setIsSubmitting(true);

    const formConfig = getStoredFormConfig();
    const finalGuests = status === 'ไม่สามารถมาร่วมงานได้' ? '0 ท่าน' : guests;

    // 1. Prepare Google Form submission payload (matching user's entry format)
    const formData = new FormData();
    formData.append(formConfig.entries.name, name.trim());
    formData.append(formConfig.entries.phone, phone.trim());
    formData.append(formConfig.entries.side, side);
    formData.append(formConfig.entries.status, status);
    formData.append(formConfig.entries.guests, finalGuests);
    formData.append(formConfig.entries.message, message.trim());

    // Send to Google Form endpoint with no-cors (swallows CORS errors gracefully)
    try {
      if (formConfig.actionUrl && formConfig.actionUrl.includes('http')) {
        await fetch(formConfig.actionUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        }).catch(() => {
          // In case URL is placeholder or network offline, ignore error
        });
      }
    } catch {
      // Ignore network errors
    }

    // 2. Persist locally to guaranteed storage
    const savedEntry = saveRsvp({
      name: name.trim(),
      phone: phone.trim(),
      side: side as 'แขกเจ้าบ่าว' | 'แขกเจ้าสาว' | 'เพื่อนร่วมงาน / คนรู้จัก',
      status: status as 'มาร่วมงาน' | 'ไม่สามารถมาร่วมงานได้',
      guests: finalGuests,
      dietary,
      message: message.trim()
    });

    setIsSubmitting(false);
    setSubmittedRsvp(savedEntry);
    onRsvpSuccess(savedEntry);
    triggerConfetti();
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setSide('');
    setStatus('');
    setGuests('1 ท่าน');
    setDietary('อาหารทั่วไป');
    setMessage('');
    setSubmittedRsvp(null);
  };

  return (
    <section id="rsvp-form" className="py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E8F4F2]">
          {/* Header banner */}
          <div className="bg-[#20635B] text-white p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-32 h-32 bg-[#14B8A6]/20 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl font-bold font-['Kanit'] tracking-tight">
              แบบตอบรับการเข้าร่วมงาน
            </h2>
            <p className="text-xs sm:text-sm text-[#E8F4F2] mt-2 font-light max-w-md mx-auto">
              เพื่อความสะดวกในการจัดเตรียมที่นั่งและอาหารต้อนรับ ขอความกรุณาตอบรับล่วงหน้า
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {!submittedRsvp ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Name */}
                <div>
                  <label className="block text-sm font-medium text-[#113A35] mb-1.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#20635B]" />
                    <span>ชื่อ - นามสกุล (ผู้เข้าร่วมงาน) <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-hidden transition bg-[#F4FBF9]/60 text-slate-800 placeholder-gray-400 text-sm"
                    placeholder="กรุณากรอกชื่อและนามสกุลของคุณ"
                  />
                </div>

                {/* 2. Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#113A35] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#20635B]" />
                    <span>เบอร์โทรศัพท์สำหรับติดต่อ <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-hidden transition bg-[#F4FBF9]/60 text-slate-800 placeholder-gray-400 text-sm"
                    placeholder="เช่น 081-234-5678"
                  />
                </div>

                {/* 3. Side */}
                <div>
                  <label className="block text-sm font-medium text-[#113A35] mb-1.5 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-[#20635B]" />
                    <span>ท่านเป็นแขกฝั่งใด <span className="text-rose-500">*</span></span>
                  </label>
                  <select
                    required
                    value={side}
                    onChange={(e) => setSide(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-hidden transition bg-[#F4FBF9]/60 text-slate-800 text-sm cursor-pointer"
                  >
                    <option value="">-- กรุณาเลือก --</option>
                    <option value="แขกเจ้าบ่าว">แขกเจ้าบ่าว (คุณเอกวาล)</option>
                    <option value="แขกเจ้าสาว">แขกเจ้าสาว (คุณอรุโณทัย)</option>
                    <option value="เพื่อนร่วมงาน / คนรู้จัก">เพื่อนร่วมงาน / คนรู้จักทั้งสองท่าน</option>
                  </select>
                </div>

                {/* 4. Status */}
                <div>
                  <label className="block text-sm font-medium text-[#113A35] mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#20635B]" />
                    <span>การเข้าร่วมงาน <span className="text-rose-500">*</span></span>
                  </label>
                  <select
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-hidden transition bg-[#F4FBF9]/60 text-slate-800 text-sm cursor-pointer"
                  >
                    <option value="">-- กรุณาเลือกสถานะ --</option>
                    <option value="มาร่วมงาน">ยินดีมาร่วมงานด้วยความยินดี</option>
                    <option value="ไม่สามารถมาร่วมงานได้">ไม่สามารถมาร่วมงานได้ (ส่งใจมาแทน)</option>
                  </select>
                </div>

                {/* 5. Guests (Conditional) */}
                {status !== 'ไม่สามารถมาร่วมงานได้' && (
                  <div className="p-4 bg-[#F4FBF9] rounded-2xl border border-[#E8F4F2] space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#113A35] mb-1.5 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#20635B]" />
                        <span>จำนวนผู้ร่วมงาน (รวมท่าน)</span>
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-hidden transition bg-white text-slate-800 text-sm cursor-pointer"
                      >
                        <option value="1 ท่าน">1 ท่าน</option>
                        <option value="2 ท่าน">2 ท่าน</option>
                        <option value="3 ท่าน">3 ท่าน</option>
                        <option value="4 ท่าน">4 ท่าน</option>
                        <option value="มากกว่า 4 ท่าน">มากกว่า 4 ท่าน (โปรดระบุในคำอวยพร)</option>
                      </select>
                    </div>

                    {/* Dietary Preference */}
                    <div>
                      <label className="block text-sm font-medium text-[#113A35] mb-1.5 flex items-center gap-1.5">
                        <UtensilsCrossed className="w-4 h-4 text-[#20635B]" />
                        <span>ประเภทอาหารที่สะดวกรับประทาน</span>
                      </label>
                      <select
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-hidden transition bg-white text-slate-800 text-sm cursor-pointer"
                      >
                        <option value="อาหารทั่วไป">อาหารทั่วไป (ไม่จำกัด)</option>
                        <option value="มังสวิรัติ">มังสวิรัติ (Vegetarian)</option>
                        <option value="ฮาลาล">ฮาลาล (Halal)</option>
                        <option value="อาหารเจ">อาหารเจ (Vegan)</option>
                        <option value="แพ้อาหารทะเล">มีข้อจำกัด/แพ้อาหารทะเล</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 6. Message */}
                <div>
                  <label className="block text-sm font-medium text-[#113A35] mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-[#20635B]" />
                    <span>คำอวยพรถึงคู่บ่าวสาว</span>
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-hidden transition bg-[#F4FBF9]/60 text-slate-800 placeholder-gray-400 text-sm"
                    placeholder="เขียนข้อความหรือคำอวยพรถึงคุณอรุโณทัย & คุณเอกวาล..."
                  />

                  {/* Quick wish pill chips */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {quickWishes.map((wish, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMessage(wish)}
                        className="text-[11px] text-[#20635B] bg-[#E8F4F2] hover:bg-[#d8ece9] px-2.5 py-1 rounded-lg transition text-left cursor-pointer"
                      >
                        + {wish}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#20635B] hover:bg-[#113A35] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'กำลังบันทึกข้อมูล...' : 'ยืนยันการลงทะเบียน'}</span>
                </button>
              </form>
            ) : (
              /* Success State Card */
              <div className="py-6 text-center space-y-5 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-[#20635B] rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
                  ✓
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#113A35] font-['Kanit']">
                    ลงทะเบียนสำเร็จเรียบร้อย!
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    ขอบพระคุณ <span className="font-semibold text-[#113A35]">{submittedRsvp.name}</span>{' '}
                    ที่ร่วมเป็นส่วนหนึ่งในวันสำคัญของเราครับ/ค่ะ
                  </p>
                </div>

                {/* Digital Ticket Pass Card */}
                <div className="bg-[#F4FBF9] border border-[#E8F4F2] rounded-2xl p-5 text-left max-w-md mx-auto shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#E8F4F2] pb-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        WEDDING RSVP PASS
                      </p>
                      <p className="text-base font-bold text-[#113A35]">
                        อรุโณทัย & เอกวาล
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-100 text-[#20635B]">
                      {submittedRsvp.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                    <p className="flex justify-between">
                      <span className="text-gray-500">ผู้ลงทะเบียน:</span>
                      <span className="font-medium text-[#113A35]">{submittedRsvp.name}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">เบอร์โทรศัพท์:</span>
                      <span className="font-medium">{submittedRsvp.phone}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">ฝั่งแขก:</span>
                      <span className="font-medium">{submittedRsvp.side}</span>
                    </p>
                    {submittedRsvp.status === 'มาร่วมงาน' && (
                      <>
                        <p className="flex justify-between">
                          <span className="text-gray-500">จำนวนที่นั่ง:</span>
                          <span className="font-semibold text-[#20635B]">{submittedRsvp.guests}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">รายการอาหาร:</span>
                          <span className="font-medium">{submittedRsvp.dietary || 'อาหารทั่วไป'}</span>
                        </p>
                      </>
                    )}
                    <div className="pt-2 border-t border-[#E8F4F2] text-xs text-gray-500 flex items-center justify-between">
                      <span>16 ก.พ. 2570 · 18:00 น.</span>
                      <span>ครัวกินลมชมอ่าง ลพบุรี</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={onScrollToBlessings}
                    className="px-5 py-2.5 bg-[#20635B] hover:bg-[#113A35] text-white rounded-xl text-xs sm:text-sm font-medium shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-amber-300" />
                    <span>ดูคำอวยพรของคุณบนสมุดอวยพร</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-200 transition cursor-pointer"
                  >
                    กรอกข้อมูลใหม่อีกครั้ง
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
