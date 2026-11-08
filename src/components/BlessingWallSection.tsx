import React, { useState } from 'react';
import { Heart, MessageSquare, Send, Sparkles, Filter } from 'lucide-react';
import { RsvpSubmission } from '../types/wedding';
import { saveRsvp } from '../utils/storage';

interface BlessingWallSectionProps {
  blessings: RsvpSubmission[];
  onNewBlessing: (entry: RsvpSubmission) => void;
}

export const BlessingWallSection: React.FC<BlessingWallSectionProps> = ({ blessings, onNewBlessing }) => {
  const [filter, setFilter] = useState<'all' | 'แขกเจ้าบ่าว' | 'แขกเจ้าสาว' | 'เพื่อนร่วมงาน / คนรู้จัก'>('all');
  const [likes, setLikes] = useState<Record<string, number>>({});
  
  // Quick wish modal / accordion
  const [quickName, setQuickName] = useState('');
  const [quickSide, setQuickSide] = useState<'แขกเจ้าบ่าว' | 'แขกเจ้าสาว' | 'เพื่อนร่วมงาน / คนรู้จัก'>('เพื่อนร่วมงาน / คนรู้จัก');
  const [quickMessage, setQuickMessage] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleLike = (id: string) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handlePostQuickWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickMessage.trim()) return;

    setIsPosting(true);
    const entry = saveRsvp({
      name: quickName.trim(),
      phone: '-',
      side: quickSide,
      status: 'มาร่วมงาน',
      guests: '1 ท่าน',
      dietary: 'อาหารทั่วไป',
      message: quickMessage.trim()
    });

    onNewBlessing(entry);
    setQuickName('');
    setQuickMessage('');
    setIsPosting(false);
  };

  const filteredBlessings = blessings.filter(b => {
    if (!b.message || b.message.trim() === '') return false;
    if (filter === 'all') return true;
    return b.side === filter;
  });

  return (
    <section id="blessings" className="py-14 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#20635B] mb-1">
            Guestbook & Wishes
          </p>
          <h2 className="text-3xl font-bold text-[#113A35] font-['Kanit']">
            สมุดอวยพรดิจิทัล
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            ร่วมส่งต่อความรักและคำอวยพรอันอบอุ่นแด่คู่บ่าวสาว อรุโณทัย & เอกวาล
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-md mx-auto mb-8 shadow-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer whitespace-nowrap shrink-0 ${
              filter === 'all' ? 'bg-white text-[#113A35] shadow-xs' : 'text-gray-600 hover:text-[#113A35]'
            }`}
          >
            ทั้งหมด ({blessings.filter(b => b.message).length})
          </button>
          <button
            onClick={() => setFilter('แขกเจ้าบ่าว')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer whitespace-nowrap shrink-0 ${
              filter === 'แขกเจ้าบ่าว' ? 'bg-white text-[#113A35] shadow-xs' : 'text-gray-600 hover:text-[#113A35]'
            }`}
          >
            ฝั่งเจ้าบ่าว (เอกวาล)
          </button>
          <button
            onClick={() => setFilter('แขกเจ้าสาว')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer whitespace-nowrap shrink-0 ${
              filter === 'แขกเจ้าสาว' ? 'bg-white text-[#113A35] shadow-xs' : 'text-gray-600 hover:text-[#113A35]'
            }`}
          >
            ฝั่งเจ้าสาว (อรุโณทัย)
          </button>
        </div>

        {/* Blessings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {filteredBlessings.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-400 text-sm">
              ยังไม่มีคำอวยพร ร่วมเป็นคนแรกที่ส่งคำอวยพรแด่คุณอรุโณทัย & คุณเอกวาล กันเลย!
            </div>
          ) : (
            filteredBlessings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-5 border border-[#E8F4F2] shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#113A35]">
                        {b.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span>{b.side}</span>
                        <span aria-hidden="true">·</span>
                        <span>{new Date(b.createdAt).toLocaleDateString('th-TH')}</span>
                      </div>
                    </div>
                    <span className="text-amber-400">
                      <Sparkles className="w-4 h-4" />
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light mt-2 italic bg-[#F4FBF9]/60 p-3 rounded-xl border border-[#E8F4F2]">
                    "{b.message}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#E8F4F2] text-xs">
                  <span className="text-gray-400">
                    {b.status === 'มาร่วมงาน' ? '🎉 ยืนยันมาร่วมงาน' : '💌 ส่งกำลังใจมาแทน'}
                  </span>
                  <button
                    onClick={() => handleLike(b.id)}
                    className="flex items-center gap-1.5 text-rose-500 hover:text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full font-medium transition cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    <span>{(likes[b.id] || 0) + 1}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Wish Box */}
        <div className="bg-[#20635B] text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="max-w-xl mx-auto">
            <h3 className="text-xl font-bold font-['Kanit'] text-center mb-1">
              ร่วมส่งคำอวยพรแด่คู่บ่าวสาว
            </h3>
            <p className="text-xs sm:text-sm text-[#E8F4F2] text-center mb-5 font-light">
              เขียนข้อความแสดงความยินดีเพื่อบันทึกไว้ในสมุดอวยพรแห่งความทรงจำ
            </p>

            <form onSubmit={handlePostQuickWish} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  placeholder="ชื่อของคุณ"
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-slate-800 placeholder-gray-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-300"
                />
                <select
                  value={quickSide}
                  onChange={(e) => setQuickSide(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-slate-800 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-300 cursor-pointer"
                >
                  <option value="แขกเจ้าบ่าว">แขกเจ้าบ่าว (คุณเอกวาล)</option>
                  <option value="แขกเจ้าสาว">แขกเจ้าสาว (คุณอรุโณทัย)</option>
                  <option value="เพื่อนร่วมงาน / คนรู้จัก">เพื่อนร่วมงาน / คนรู้จัก</option>
                </select>
              </div>

              <textarea
                required
                rows={2}
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                placeholder="เขียนคำอวยพรของคุณ..."
                className="w-full px-4 py-2.5 rounded-xl bg-white text-slate-800 placeholder-gray-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-300"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPosting}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#113A35] font-semibold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isPosting ? 'กำลังส่ง...' : 'ส่งคำอวยพร'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
