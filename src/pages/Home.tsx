import Navbar from '@/components/Navbar';
import { XOCanvas } from '@/components/XOCanvas';
import {
  AboutSection,
  ChallengeSection,
  FAQSection,
  // GallerySection,
  HeroSection,
  TeamSection,
  TimelineSection,
} from '@/components/landing';

export function Home() {
  return (
    <div className="lab-shell" dir="rtl" lang="fa">
      <Navbar />
      <XOCanvas />

      <main className="lab-container relative pt-32 md:pt-40">
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <FAQSection />
        {/* <GallerySection /> */}
        <TeamSection />
        <ChallengeSection />
      </main>
    </div>
  );
}
