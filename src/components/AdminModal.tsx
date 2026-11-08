import React, { useState } from 'react';
import { X, Download, Users, CheckCircle2, Heart, Search, Filter, Settings, Save, AlertCircle } from 'lucide-react';
import { RsvpSubmission, GoogleFormConfig } from '../types/wedding';
import { getStoredFormConfig, saveFormConfig, exportRsvpsToCsv } from '../utils/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  rsvps: RsvpSubmission[];
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, rsvps }) => {
  const [activeTab, setActiveTab] = useState<'guests' | 'settings'>('guests');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSide, setFilterSide] = useState<'all' | 'แขกเจ้าบ่าว' | 'แขกเจ้าสาว' | 'เพื่อนร่วมงาน / คนรู้จัก'>('all');
  
  // Settings Form state
  const [formConfig, setFormConfig] = useState<GoogleFormConfig>(getStoredFormConfig());
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  if (!isOpen) return null;

  // Compute statistics
  const totalSubmissions = rsvps.length;
  const attendingList = rsvps.filter(r => r.status === 'มาร่วมงาน');
  const declinedList = rsvps.filter(r => r.status === 'ไม่สามารถมาร่วมงานได้');
  
  // Parse total guest headcount
  const totalHeadcount = attendingList.reduce((acc, curr) => {
    const num = parseInt(curr.guests.replace(/\D/g, ''), 10) || 1;
    return acc + num;
  }, 0);

  const groomHeadcount = attendingList
    .filter(r => r.side === 'แขกเจ้าบ่าว')
    .reduce((acc, curr) => acc + (parseInt(curr.guests.replace(/\D/g, ''), 10) || 1), 0);

  const brideHeadcount = attendingList
    .filter(r => r.side === 'แขกเจ้าสาว')
    .reduce((acc, curr) => acc + (parseInt(curr.guests.replace(/\D/g, ''), 10) || 1), 0);

  const colleagueHeadcount = attendingList
    .filter(r => r.side === 'เพื่อนร่วมงาน / คนรู้จัก')
    .reduce((acc, curr) => acc + (parseInt(curr.guests.replace(/\D/g, ''), 10) || 1), 0);

  // Filtered rows
  const filteredList = rsvps.filter(item => {
    const matchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.phone.includes(searchQuery);
    const matchSide = filterSide === 'all' || item.side === filterSide;
    return matchQuery && matchSide;
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveFormConfig(formConfig);
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-[#E8F4F2] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in">
        {/* Modal Header */}
        <div className="bg-[#113A35] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-bold text-base sm:text-lg font-['Kanit']">
                ระบบจัดการรายชื่อแขก & สถิติ (อรุโณทัย & เอกวาล)
              </h3>
              <p className="text-xs text-[#E8F4F2]">
                Organizer & Couple Dashboard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-gray-200 px-6 pt-3 bg-gray-50 gap-4 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('guests')}
            className={`pb-2.5 transition border-b-2 cursor-pointer ${
              activeTab === 'guests'
                ? 'border-[#20635B] text-[#20635B] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            รายชื่อผู้ลงทะเบียน ({totalSubmissions})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-2.5 transition border-b-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#20635B] text-[#20635B] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            ตั้งค่า Google Form Integration
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'guests' ? (
            <>
              {/* Stat Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#F4FBF9] p-3.5 rounded-2xl border border-[#E8F4F2]">
                  <p className="text-xs text-gray-500 font-medium">ยอดตอบรับทั้งหมด</p>
                  <p className="text-2xl font-bold text-[#113A35] font-mono mt-1 tabular-nums">
                    {totalSubmissions} <span className="text-xs font-normal text-gray-500">ท่าน</span>
                  </p>
                </div>
                <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-100">
                  <p className="text-xs text-emerald-700 font-medium">ยืนยันมาร่วมงาน</p>
                  <p className="text-2xl font-bold text-emerald-800 font-mono mt-1 tabular-nums">
                    {totalHeadcount} <span className="text-xs font-normal text-emerald-700">ที่นั่ง</span>
                  </p>
                </div>
                <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-100">
                  <p className="text-xs text-blue-700 font-medium">ฝั่งเจ้าบ่าว (เอกวาล)</p>
                  <p className="text-2xl font-bold text-blue-900 font-mono mt-1 tabular-nums">
                    {groomHeadcount} <span className="text-xs font-normal text-blue-700">ที่นั่ง</span>
                  </p>
                </div>
                <div className="bg-pink-50 p-3.5 rounded-2xl border border-pink-100">
                  <p className="text-xs text-pink-700 font-medium">ฝั่งเจ้าสาว (อรุโณทัย)</p>
                  <p className="text-2xl font-bold text-pink-900 font-mono mt-1 tabular-nums">
                    {brideHeadcount} <span className="text-xs font-normal text-pink-700">ที่นั่ง</span>
                  </p>
                </div>
              </div>

              {/* Action bar: Search + Filter + Export */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ค้นหาชื่อ หรือเบอร์โทร..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#14B8A6]"
                    />
                  </div>
                  <select
                    value={filterSide}
                    onChange={(e) => setFilterSide(e.target.value as any)}
                    className="px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#14B8A6] cursor-pointer"
                  >
                    <option value="all">ทุกฝั่งแขก</option>
                    <option value="แขกเจ้าบ่าว">แขกเจ้าบ่าว</option>
                    <option value="แขกเจ้าสาว">แขกเจ้าสาว</option>
                    <option value="เพื่อนร่วมงาน / คนรู้จัก">เพื่อนร่วมงาน / คนรู้จัก</option>
                  </select>
                </div>

                <button
                  onClick={() => exportRsvpsToCsv(rsvps)}
                  className="w-full sm:w-auto px-4 py-2 bg-[#20635B] hover:bg-[#113A35] text-white text-xs font-medium rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ส่งออกไฟล์ Excel / CSV (ภาษาไทย)</span>
                </button>
              </div>

              {/* Guests Table */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto max-h-80">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4FBF9] text-[#113A35] font-semibold sticky top-0 border-b border-[#E8F4F2]">
                      <tr>
                        <th className="p-3">ลำดับ</th>
                        <th className="p-3">ชื่อ - นามสกุล</th>
                        <th className="p-3">เบอร์โทรศัพท์</th>
                        <th className="p-3">ฝั่งแขก</th>
                        <th className="p-3">สถานะ</th>
                        <th className="p-3">จำนวน</th>
                        <th className="p-3">อาหาร</th>
                        <th className="p-3">คำอวยพร</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredList.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-6 text-center text-gray-400">
                            ไม่พบรายชื่อที่ตรงกับเงื่อนไข
                          </td>
                        </tr>
                      ) : (
                        filteredList.map((item, idx) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition">
                            <td className="p-3 font-mono text-gray-400">{idx + 1}</td>
                            <td className="p-3 font-medium text-[#113A35] whitespace-nowrap">{item.name}</td>
                            <td className="p-3 text-gray-600 font-mono whitespace-nowrap">{item.phone}</td>
                            <td className="p-3 text-gray-600 whitespace-nowrap">{item.side}</td>
                            <td className="p-3 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded-full font-medium text-[10px] ${
                                  item.status === 'มาร่วมงาน'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-center">{item.status === 'ไม่สามารถมาร่วมงานได้' ? '-' : item.guests}</td>
                            <td className="p-3 text-gray-500 whitespace-nowrap">{item.dietary || 'อาหารทั่วไป'}</td>
                            <td className="p-3 text-gray-600 max-w-xs truncate" title={item.message}>
                              {item.message || '-'}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* Settings Tab */
            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl mx-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">คำแนะนำการเชื่อมต่อ Google Forms:</p>
                  <p>
                    ท่านสามารถสร้าง Google Form และนำ URL ลงท้ายด้วย <code className="bg-blue-100 px-1 py-0.5 rounded">/formResponse</code>{' '}
                    พร้อมทั้ง Entry ID ของแต่ละคำถามมาใส่ในช่องด้านล่างนี้ เพื่อให้ข้อมูลทุกคำตอบส่งตรงเข้าสู่ Google Sheets ของบ่าวสาวได้ทันที
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Google Form Action URL (formResponse URL)
                </label>
                <input
                  type="url"
                  value={formConfig.actionUrl}
                  onChange={(e) => setFormConfig({ ...formConfig, actionUrl: e.target.value })}
                  placeholder="https://docs.google.com/forms/d/e/.../formResponse"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#20635B] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    ชื่อ-นามสกุล Entry ID
                  </label>
                  <input
                    type="text"
                    value={formConfig.entries.name}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        entries: { ...formConfig.entries, name: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    เบอร์โทรศัพท์ Entry ID
                  </label>
                  <input
                    type="text"
                    value={formConfig.entries.phone}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        entries: { ...formConfig.entries, phone: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    ฝั่งแขก Entry ID
                  </label>
                  <input
                    type="text"
                    value={formConfig.entries.side}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        entries: { ...formConfig.entries, side: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    สถานะการมา Entry ID
                  </label>
                  <input
                    type="text"
                    value={formConfig.entries.status}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        entries: { ...formConfig.entries, status: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    จำนวนผู้ร่วมงาน Entry ID
                  </label>
                  <input
                    type="text"
                    value={formConfig.entries.guests}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        entries: { ...formConfig.entries, guests: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    คำอวยพร Entry ID
                  </label>
                  <input
                    type="text"
                    value={formConfig.entries.message}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        entries: { ...formConfig.entries, message: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              {savedSettingsNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>บันทึกการตั้งค่า Google Form สำเร็จเรียบร้อยแล้ว!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#20635B] hover:bg-[#113A35] text-white font-medium text-xs sm:text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>บันทึกการตั้งค่าฟอร์ม</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
