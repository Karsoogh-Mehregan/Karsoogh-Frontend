import { XOCanvas } from '@/components/XOCanvas';

export function Home() {
  return (
    <div
      className="container mx-auto px-4 flex flex-col items-center justify-start pt-28 md:pt-36 pb-20 min-h-screen text-center relative text-primary-columbia overflow-hidden"
      dir="rtl"
      lang="fa"
    >
      <XOCanvas />
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold tracking-widest animate-glow select-none drop-shadow-lg">
          Karsoogh
        </h1>
      </div>
    </div>
  );
}
