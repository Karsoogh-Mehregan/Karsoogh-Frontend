import { useEffect, useRef } from 'react';

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
  alpha: number;
  update: (canvasWidth: number, canvasHeight: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const COLORS = ['#39D3FF', '#F9B44A', '#6EE7B7', '#FF5D7D'];

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
  alpha: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.char = Math.random() > 0.5 ? 'X' : 'O';
    this.size = Math.random() * 26 + 14;
    this.speedX = Math.random() * 0.34 - 0.17;
    this.speedY = Math.random() * 0.34 - 0.17;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 0.012;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.34 + 0.16;
  }

  update(width: number, height: number) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;

    if (this.x > width + 50) this.x = -50;
    if (this.x < -50) this.x = width + 50;
    if (this.y > height + 50) this.y = -50;
    if (this.y < -50) this.y = height + 50;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    ctx.globalAlpha = this.alpha;
    ctx.font = `800 ${this.size}px Vazirmatn, sans-serif`;
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(this.char, 0, 0);
    ctx.restore();
  }
}

export function XOCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getCanvasBounds = () => ({
      width: window.innerWidth,
      height: Math.ceil(window.visualViewport?.height || window.innerHeight),
    });

    const setCanvasSize = () => {
      const { width, height } = getCanvasBounds();
      const ratio = 1;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      sizeRef.current = { width, height };
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const particles: Particle[] = [];

    const init = () => {
      const { width, height } = getCanvasBounds();
      particles.length = 0;
      const densityLimit = width < 768 ? 42 : 78;
      const density = Math.min(densityLimit, Math.floor((width * height) / 52000));
      for (let i = 0; i < density; i++) {
        particles.push(new XOParticle(width, height));
      }
    };

    const resizeParticles = (newWidth: number, newHeight: number) => {
      const oldWidth = sizeRef.current.width || newWidth;
      const oldHeight = sizeRef.current.height || newHeight;

      // Scale particle coordinates to keep their relative spatial distribution
      particles.forEach((p) => {
        p.x = p.x * (newWidth / oldWidth);
        p.y = p.y * (newHeight / oldHeight);
      });

      // Dynamically adjust particle count to match screen density
      const densityLimit = newWidth < 768 ? 42 : 78;
      const targetDensity = Math.min(densityLimit, Math.floor((newWidth * newHeight) / 52000));

      if (particles.length < targetDensity) {
        const diff = targetDensity - particles.length;
        for (let i = 0; i < diff; i++) {
          particles.push(new XOParticle(newWidth, newHeight));
        }
      } else if (particles.length > targetDensity) {
        particles.length = targetDensity;
      }
    };

    const drawConnections = () => {
      if (sizeRef.current.width < 768) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 118) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 118) * 0.11;
            ctx.strokeStyle = particles[i].char === particles[j].char ? '#39D3FF' : '#F9B44A';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const animate = () => {
      const { width, height } = sizeRef.current;

      ctx.clearRect(0, 0, width, height);
      drawConnections();
      particles.forEach((p) => {
        if (!reducedMotion) {
          p.update(width, height);
        }
        p.draw(ctx);
      });

      if (!reducedMotion && !document.hidden) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };

    const handleResize = () => {
      const { width, height } = getCanvasBounds();
      // Only resize if the dimensions have actually changed
      if (width === sizeRef.current.width && height === sizeRef.current.height) {
        return;
      }

      resizeParticles(width, height);
      setCanvasSize();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        return;
      }

      if (!reducedMotion && !rafRef.current) {
        animate();
      }
    };

    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    setCanvasSize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none opacity-55"
    />
  );
}
