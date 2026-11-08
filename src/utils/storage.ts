import { RsvpSubmission, GoogleFormConfig } from '../types/wedding';

const STORAGE_KEY_RSVP = 'wedding_rsvps_arunothai_ekkawan';
const STORAGE_KEY_FORM_CONFIG = 'wedding_form_config_arunothai_ekkawan';

export const DEFAULT_FORM_CONFIG: GoogleFormConfig = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeYourFormID/formResponse',
  entries: {
    name: 'entry.111111111',
    phone: 'entry.222222222',
    side: 'entry.333333333',
    status: 'entry.444444444',
    guests: 'entry.555555555',
    message: 'entry.666666666'
  }
};

const INITIAL_BLESSINGS: RsvpSubmission[] = [];

export function getStoredRsvps(): RsvpSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RSVP);
    if (!raw) {
      return [];
    }
    const parsed: RsvpSubmission[] = JSON.parse(raw);
    const cleaned = parsed.filter(item => !item.id.startsWith('b-'));
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY_RSVP, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch {
    return [];
  }
}

export function saveRsvp(newEntry: Omit<RsvpSubmission, 'id' | 'createdAt'>): RsvpSubmission {
  const current = getStoredRsvps();
  const entry: RsvpSubmission = {
    ...newEntry,
    id: 'rsvp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString()
  };
  const updated = [entry, ...current];
  try {
    localStorage.setItem(STORAGE_KEY_RSVP, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
  return entry;
}

export function getStoredFormConfig(): GoogleFormConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FORM_CONFIG);
    if (!raw) return DEFAULT_FORM_CONFIG;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_FORM_CONFIG;
  }
}

export function saveFormConfig(config: GoogleFormConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_FORM_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save form config', e);
  }
}

export function exportRsvpsToCsv(submissions: RsvpSubmission[]): void {
  const headers = ['ลำดับ', 'ชื่อ-นามสกุล', 'เบอร์โทร', 'ฝั่งแขก', 'สถานะการมาร่วมงาน', 'จำนวนผู้ร่วมงาน', 'ข้อจำกัดอาหาร', 'คำอวยพร', 'วันที่ลงทะเบียน'];
  const rows = submissions.map((item, index) => [
    index + 1,
    `"${item.name.replace(/"/g, '""')}"`,
    `"${item.phone.replace(/"/g, '""')}"`,
    `"${item.side}"`,
    `"${item.status}"`,
    `"${item.status === 'ไม่สามารถมาร่วมงานได้' ? '0' : item.guests}"`,
    `"${(item.dietary || 'อาหารทั่วไป').replace(/"/g, '""')}"`,
    `"${(item.message || '-').replace(/"/g, '""')}"`,
    `"${new Date(item.createdAt).toLocaleString('th-TH')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  
  // Prepend UTF-8 BOM so Excel on Windows/Mac properly reads Thai text
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `wedding-rsvp-arunothai-ekkawan-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const STORAGE_KEY_CHARITY_VOTES = 'wedding_charity_votes_arunothai_ekkawan';

export interface HospitalOption {
  id: string;
  name: string;
  location: string;
  description: string;
  orderNum: number;
}

export const HOSPITALS: HospitalOption[] = [
  {
    id: 'banmi',
    name: 'โรงพยาบาลบ้านหมี่',
    location: 'จังหวัดลพบุรี',
    description: 'เพื่อจัดซื้ออุปกรณ์ทางการแพทย์และช่วยเหลือผู้ป่วยยากไร้ในพื้นที่ชุมชน จ.ลพบุรี',
    orderNum: 1
  },
  {
    id: 'cancer',
    name: 'โรงพยาบาลมะเร็งลพบุรี',
    location: 'จังหวัดลพบุรี',
    description: 'สนับสนุนการรักษาและจัดซื้อครุภัณฑ์ทางการแพทย์สำหรับผู้ป่วยโรคมะเร็ง',
    orderNum: 2
  },
  {
    id: 'vajira',
    name: 'โรงพยาบาลวชิรพยาบาล',
    location: 'กรุงเทพมหานคร',
    description: 'สมทบทุนจัดหาอุปกรณ์ทางการแพทย์และสงเคราะห์ผู้ป่วยยากไร้ คณะแพทยศาสตร์วชิรพยาบาล',
    orderNum: 3
  }
];

export function getStoredCharityVotes(): { id: string; name: string; hospitalId: string; hospitalName: string; createdAt: string }[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CHARITY_VOTES);
    if (!raw) {
      // Baseline initial seeds from couple & family
      const initialSeeds = [
        { id: 'v-1', name: 'เอกวาล (เอก)', hospitalId: 'banmi', hospitalName: 'โรงพยาบาลบ้านหมี่ จังหวัดลพบุรี', createdAt: '2026-11-01T10:00:00.000Z' },
        { id: 'v-2', name: 'อรุโณทัย (น้ำ)', hospitalId: 'cancer', hospitalName: 'โรงพยาบาลมะเร็งลพบุรี', createdAt: '2026-11-01T10:05:00.000Z' },
        { id: 'v-3', name: 'คุณพ่อ & คุณแม่', hospitalId: 'vajira', hospitalName: 'โรงพยาบาลวชิรพยาบาล กรุงเทพมหานคร', createdAt: '2026-11-01T11:00:00.000Z' },
        { id: 'v-4', name: 'ครอบครัวอินดี', hospitalId: 'banmi', hospitalName: 'โรงพยาบาลบ้านหมี่ จังหวัดลพบุรี', createdAt: '2026-11-02T09:30:00.000Z' },
        { id: 'v-5', name: 'เพื่อนๆ มทส.', hospitalId: 'cancer', hospitalName: 'โรงพยาบาลมะเร็งลพบุรี', createdAt: '2026-11-02T14:15:00.000Z' },
        { id: 'v-6', name: 'กลุ่มเพื่อนสนิท', hospitalId: 'vajira', hospitalName: 'โรงพยาบาลวชิรพยาบาล กรุงเทพมหานคร', createdAt: '2026-11-03T18:00:00.000Z' }
      ];
      localStorage.setItem(STORAGE_KEY_CHARITY_VOTES, JSON.stringify(initialSeeds));
      return initialSeeds;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCharityVote(name: string, hospitalId: string, hospitalName: string): { id: string; name: string; hospitalId: string; hospitalName: string; createdAt: string } {
  const current = getStoredCharityVotes();
  const newVote = {
    id: 'vote-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    name: name.trim() || 'ผู้มีเกียรติร่วมส่งต่อความรัก',
    hospitalId,
    hospitalName,
    createdAt: new Date().toISOString()
  };
  const updated = [newVote, ...current];
  try {
    localStorage.setItem(STORAGE_KEY_CHARITY_VOTES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save charity vote', e);
  }
  return newVote;
}
