import Navbar from '@/components/Navbar';
import { XOCanvas } from '@/components/XOCanvas';

export function Home() {
  return (
    <div
      className="container mx-auto px-4 flex flex-col items-center justify-start pt-28 md:pt-36 pb-20 min-h-screen text-center relative text-primary-columbia overflow-hidden"
      dir="rtl"
      lang="fa"
    >
      <Navbar />
      <XOCanvas />
    </div>
  );
}
