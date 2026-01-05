import { useEffect, useRef } from 'react';

// --- 1. MOVED OUTSIDE: Interface, Constants, and Class ---

interface Particle {
  x: number;
  y: number;
  char: 'X' | 'O';
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  update: (canvasWidth: number, canvasHeight: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

// Move colors outside so the class can access it
const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

// Move the Class definition strictly OUTSIDE the component function
class XOParticle implements Particle {
  x: number;
  y: number;
  char: 'X' | 'O';
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.char = Math.random() > 0.5 ? 'X' : 'O';
    this.size = Math.random() * 20 + 10;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 0.05;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  update(width: number, height: number) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;

    // Wrap-around Logic
    if (this.x > width + 50) this.x = -50;
    if (this.x < -50) this.x = width + 50;
    if (this.y > height + 50) this.y = -50;
    if (this.y < -50) this.y = height + 50;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    ctx.font = `bold ${this.size}px sans-serif`;
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(this.char, 0, 0);
    ctx.restore();
  }
}

// --- 2. The Component Function ---

export function XOCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Environment check
    if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const particles: Particle[] = [];

    const init = () => {
      particles.length = 0;
      // Use the Class defined outside
      const density = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < density; i++) {
        particles.push(new XOParticle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
      setCanvasSize();
      init();
    });

    setCanvasSize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-40"
    />
  );
}
