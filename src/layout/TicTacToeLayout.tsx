import React, { useMemo } from "react";

// --- Helper for Text-based SVG Symbols ---
const TextSvg = ({ text, className, dy = "0.35em" }: { text: string; className?: string; dy?: string }) => (
  <svg
    viewBox="0 0 40 40" 
    fill="currentColor"
    className={className}
    style={{ overflow: 'visible' }}
  >
    <text
      x="50%"
      y="50%"
      dy={dy}
      textAnchor="middle"
      dominantBaseline="middle"
      className="font-serif font-bold italic"
      style={{ fontSize: '24px' }}
    >
      {text}
    </text>
  </svg>
);

// --- Symbol Components ---
// 1. Basic Symbols
const XSymbol = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const OSymbol = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle></svg>
);
const PlusSymbol = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
);
const MinusSymbol = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /></svg>
);

// 2. Math Operators & Constants
const PiSymbol = ({ className }: { className?: string }) => <TextSvg text="π" className={className} />;
const SqrtSymbol = ({ className }: { className?: string }) => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12h4l3 9 4-17h7" /></svg>
);
const IntegralSymbol = ({ className }: { className?: string }) => <TextSvg text="∫" className={className} />;
const SumSymbol = ({ className }: { className?: string }) => <TextSvg text="∑" className={className} />;
const InfinitySymbol = ({ className }: { className?: string }) => <TextSvg text="∞" className={className} />;

// 3. Numbers & Variables
const ZeroSymbol = ({ className }: { className?: string }) => <TextSvg text="0" className={className} />;
const OneSymbol = ({ className }: { className?: string }) => <TextSvg text="1" className={className} />;
const ESymbol = ({ className }: { className?: string }) => <TextSvg text="e" className={className} />;
const ISymbol = ({ className }: { className?: string }) => <TextSvg text="i" className={className} />;
const XVarSymbol = ({ className }: { className?: string }) => <TextSvg text="x" className={className} />;
const YVarSymbol = ({ className }: { className?: string }) => <TextSvg text="y" className={className} />;

// 4. Formulas
const Emc2Symbol = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 40" fill="currentColor" className={className} style={{ overflow: 'visible' }}>
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="font-serif italic font-bold" style={{ fontSize: '20px' }}>
      E=mc²
    </text>
  </svg>
);

// Map keys to components
const SYMBOL_COMPONENTS = {
  x: XSymbol,
  o: OSymbol,
  plus: PlusSymbol,
  minus: MinusSymbol,
  sqrt: SqrtSymbol,
  integral: IntegralSymbol,
  sum: SumSymbol,
  infinity: InfinitySymbol,
  pi: PiSymbol,
  zero: ZeroSymbol,
  one: OneSymbol,
  e: ESymbol,
  i: ISymbol,
  x_var: XVarSymbol,
  y_var: YVarSymbol,
  emc2: Emc2Symbol,
};

type SymbolType = keyof typeof SYMBOL_COMPONENTS;

interface TicTacToeLayoutProps {
  children: React.ReactNode;
}

interface BackgroundElement {
  id: number;
  type: SymbolType;
  left: string;
  animationClass: string;
  delay: string;
  sizeClass: string;
  colorClass: string;
  opacityClass: string;
}

const TicTacToeLayout = ({ children }: TicTacToeLayoutProps) => {
  const floatingElements: BackgroundElement[] = useMemo(() => {
    const elements: BackgroundElement[] = [];
    const count = 120; 

    const animationClasses = [
      "animate-float-slow",
      "animate-float-medium",
      "animate-float-fast",
    ];

    const sizeClasses = ["w-5 h-5", "w-8 h-8", "w-12 h-12", "w-16 h-16"];

    // لیست کامل رنگ‌های رندوم (Red, Orange, Yellow, Green, Blue, Purple, Pink)
    const vibrantColors = [
      "text-red-400", "text-red-500",
      "text-orange-400", "text-amber-300",
      "text-yellow-300", "text-lime-400",
      "text-green-400", "text-emerald-400",
      "text-teal-300", "text-cyan-400",
      "text-sky-400", "text-blue-400",
      "text-indigo-400", "text-violet-400",
      "text-purple-400", "text-fuchsia-400",
      "text-pink-400", "text-rose-400"
    ];

    const opacityClasses = [
        "opacity-[0.3]",  
        "opacity-[0.35]", 
        "opacity-[0.4]",  
        "opacity-[0.45]"  
    ];

    const symbolTypes = Object.keys(SYMBOL_COMPONENTS) as SymbolType[];

    for (let i = 0; i < count; i++) {
      const type = symbolTypes[Math.floor(Math.random() * symbolTypes.length)];
      
      const color = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];

      elements.push({
        id: i,
        type: type,
        left: `${Math.floor(Math.random() * 96) + 2}%`,
        animationClass: animationClasses[Math.floor(Math.random() * animationClasses.length)],
        delay: `-${Math.floor(Math.random() * 40)}s`,
        sizeClass: sizeClasses[Math.floor(Math.random() * sizeClasses.length)],
        colorClass: color,
        opacityClass: opacityClasses[Math.floor(Math.random() * opacityClasses.length)],
      });
    }

    return elements;
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-900 text-white">
      {/* --- Animated Background Layer --- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingElements.map((el) => {
          const SymbolComponent = SYMBOL_COMPONENTS[el.type];
          return (
            <div
              key={el.id}
              className={`absolute bottom-0 ${el.animationClass} ${el.sizeClass}`}
              style={{
                left: el.left,
                animationDelay: el.delay,
                opacity: 0, 
              }}
            >
              <div className={`${el.colorClass} ${el.opacityClass} w-full h-full flex items-center justify-center`}>
                 <SymbolComponent className="w-full h-full" />
              </div>
            </div>
          );
        })}

        {/* Readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30" />
      </div>

      {/* --- Main Content Layer --- */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        {children}
      </main>
    </div>
  );
};

export default TicTacToeLayout; 