export function generateGoogleCalendarUrl(): string {
  const title = encodeURIComponent('งานมงคลสมรส อรุโณทัย & เอกวาล');
  const details = encodeURIComponent(
    'ขอเรียนเชิญร่วมงานมงคลสมรส อรุโณทัย & เอกวาล\nสถานที่: ครัวกินลมชมอ่าง จังหวัดลพบุรี\nแผนที่: https://maps.app.goo.gl/rEfKcCJrXwyaQBTX7'
  );
  const location = encodeURIComponent('ครัวกินลมชมอ่าง จังหวัดลพบุรี');
  // Date: 16 Feb 2027, 18:00 - 22:00 ICT (UTC+7) -> 11:00 UTC - 15:00 UTC
  // 20270216T110000Z/20270216T150000Z
  const dates = '20270216T110000Z/20270216T150000Z';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(): void {
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Arunothai and Ekkawan//Wedding Invitation//TH',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'SUMMARY:งานมงคลสมรส อรุโณทัย & เอกวาล',
    'DESCRIPTION:ขอเรียนเชิญร่วมงานมงคลสมรส อรุโณทัย & เอกวาล ณ ครัวกินลมชมอ่าง จังหวัดลพบุรี',
    'LOCATION:ครัวกินลมชมอ่าง จังหวัดลพบุรี',
    'DTSTART:20270216T110000Z',
    'DTEND:20270216T150000Z',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'wedding-arunothai-ekkawan.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
