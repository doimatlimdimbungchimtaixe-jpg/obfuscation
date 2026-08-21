'use client';

import { useEffect, useRef, useState } from 'react';

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const colCount = Math.floor(canvas.width / 20);
      setColumns(Array.from({ length: colCount }, () => Math.random() * -canvas.height));
    };

    resize();
    window.addEventListener('resize', resize);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    
    let animationId: number;
    const positions = [...columns];

    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px 'JetBrains Mono'`;
      ctx.textBaseline = 'top';
      
      positions.forEach((y, i) => {
        const x = i * 20;
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        const gradient = ctx.createLinearGradient(0, y, 0, y + fontSize);
        gradient.addColorStop(0, 'rgba(0, 255, 136, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 255, 136, 0.6)');
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0.3)');
        
        ctx.fillStyle = gradient;
        ctx.fillText(char, x, y);
        
        positions[i] = y > canvas.height + fontSize ? Math.random() * -100 : y + fontSize * 1.5;
      });
      
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [columns]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let t = 0;

    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 60;
      const offset = (t * 30) % gridSize;
      
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.03)';
      ctx.lineWidth = 1;
      
      for (let x = -offset; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = -offset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      const centerX = canvas.width / 2 + Math.sin(t * 0.0005) * 100;
      const centerY = canvas.height / 2 + Math.cos(t * 0.0003) * 100;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 400);
      gradient.addColorStop(0, 'rgba(0, 255, 136, 0.05)');
      gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.03)');
      gradient.addColorStop(1, 'rgba(10, 10, 15, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      t += 16;
      setTime(t);
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}

export function FloatingOrbs() {
  const orbs = [
    { x: 10, y: 10, size: 300, color: 'rgba(0, 255, 136, 0.08)', speed: 0.0001, offsetX: 0, offsetY: 0 },
    { x: 90, y: 20, size: 250, color: 'rgba(138, 43, 226, 0.06)', speed: 0.00015, offsetX: 1000, offsetY: 2000 },
    { x: 50, y: 80, size: 200, color: 'rgba(255, 0, 110, 0.05)', speed: 0.00008, offsetX: 3000, offsetY: 1000 },
    { x: 80, y: 70, size: 180, color: 'rgba(0, 200, 255, 0.04)', speed: 0.00012, offsetX: 500, offsetY: 4000 },
  ];

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[150px] transition-all duration-[10000ms]"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: orb.color,
            transform: 'translate(-50%, -50%)',
            animation: `float ${20 + i * 5}s ease-in-out infinite`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          25% { transform: translate(-50%, -50%) scale(1.1) rotate(90deg); }
          50% { transform: translate(-50%, -50%) scale(0.9) rotate(180deg); }
          75% { transform: translate(-50%, -50%) scale(1.05) rotate(270deg); }
        }
      `}</style>
    </div>
  );
}

export function ScanLine() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none scan-line" aria-hidden="true" />
  );
}

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <FloatingOrbs />
      <GridBackground />
      <MatrixBackground />
      <ScanLine />
    </div>
  );
}