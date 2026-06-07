import {
  AboutSection,
  FAQSection,
  // GallerySection,
  HeroSection,
  TeamSection,
  TimelineSection,
} from '@/components/landing';

export function Home() {
  return (
    <main className="lab-container relative pt-32 md:pt-40">
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <FAQSection />
      {/* <GallerySection /> */}
      <TeamSection />
    </main>
  );
}
