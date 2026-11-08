import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { RsvpFormSection } from './components/RsvpFormSection';
import { ScheduleSection } from './components/ScheduleSection';
import { VenueSection } from './components/VenueSection';
import { BlessingWallSection } from './components/BlessingWallSection';
import { CharityFavorsSection } from './components/CharityFavorsSection';
import { FooterSection } from './components/FooterSection';
import { AdminModal } from './components/AdminModal';
import { ImageModal } from './components/ImageModal';
import { MusicPlayerToggle } from './components/MusicPlayerToggle';
import { RsvpSubmission } from './types/wedding';
import { getStoredRsvps } from './utils/storage';

export default function App() {
  const [rsvps, setRsvps] = useState<RsvpSubmission[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    // Load initial stored RSVPs & blessings
    setRsvps(getStoredRsvps());
  }, []);

  const handleNewRsvp = (newRsvp: RsvpSubmission) => {
    setRsvps(prev => [newRsvp, ...prev]);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FBF9] text-[#113A35] flex flex-col font-['Kanit'] selection:bg-[#14B8A6] selection:text-white">
      {/* Top Header Navigation */}
      <HeaderNav
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollTo={handleScrollTo}
      />

      <main className="flex-1">
        {/* 1. Hero & Wedding Card Showcase with Real-time Countdown */}
        <HeroSection
          onScrollToRsvp={() => handleScrollTo('rsvp-form')}
          onOpenImageModal={(img) => setModalImage(img)}
        />

        {/* 2. RSVP Registration Form (Google Form Integrated + Local Persistence) */}
        <RsvpFormSection
          onRsvpSuccess={handleNewRsvp}
          onScrollToBlessings={() => handleScrollTo('blessings')}
        />

        {/* 3. Schedule & Ceremony Timeline */}
        <ScheduleSection />

        {/* 4. Venue & Directions (Krua Kin Lom Chom Ang, Lopburi) */}
        <VenueSection />

        {/* 5. Digital Guestbook & Wishes Wall */}
        <BlessingWallSection
          blessings={rsvps}
          onNewBlessing={handleNewRsvp}
        />

        {/* 6. Wedding Favors & Charity (ของชำร่วย) */}
        <CharityFavorsSection
          onOpenImageModal={(img) => setModalImage(img)}
        />
      </main>

      {/* Footer */}
      <FooterSection
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* Floating Gentle Acoustic Music Toggle */}
      <MusicPlayerToggle />

      {/* Fullscreen Card Inspection Modal */}
      <ImageModal
        imgSrc={modalImage}
        onClose={() => setModalImage(null)}
      />

      {/* Couple / Organizer Admin Dashboard */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        rsvps={rsvps}
      />
    </div>
  );
}
