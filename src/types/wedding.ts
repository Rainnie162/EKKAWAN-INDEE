export interface RsvpSubmission {
  id: string;
  name: string;
  phone: string;
  side: 'แขกเจ้าบ่าว' | 'แขกเจ้าสาว' | 'เพื่อนร่วมงาน / คนรู้จัก';
  status: 'มาร่วมงาน' | 'ไม่สามารถมาร่วมงานได้';
  guests: string;
  dietary?: string;
  message: string;
  createdAt: string;
}

export interface GoogleFormConfig {
  actionUrl: string;
  entries: {
    name: string;
    phone: string;
    side: string;
    status: string;
    guests: string;
    message: string;
  };
}

export interface ScheduleEvent {
  time: string;
  title: string;
  titleEn: string;
  description: string;
  iconName: 'user-check' | 'sparkles' | 'heart' | 'utensils' | 'camera';
}

export interface ColorThemeSwatch {
  nameTh: string;
  nameEn: string;
  hex: string;
  textColor: string;
  border?: boolean;
}

export interface CharityVote {
  id: string;
  name: string;
  hospitalId: string;
  hospitalName: string;
  createdAt: string;
}
