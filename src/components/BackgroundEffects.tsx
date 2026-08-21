'use client';

import { useEffect, useRef, useState } from 'react';

export function MatrixRain() {
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
      const colCount = Math.floor(canvas.width / 18);
      setColumns(Array.from({ length: colCount }, () => Math.random() * -canvas.height * 2));
    };

    resize();
    window.addEventListener('resize', resize);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?λ∑∏∫∂∇∆';
    const fontSize = 13;
    
    let animationId: number;
    const positions = [...columns];
    const speeds = columns.map(() => 0.8 + Math.random() * 1.2);
    const opacities = columns.map(() => 0.3 + Math.random() * 0.5);

    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(6, 6, 12, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px 'JetBrains Mono'`;
      ctx.textBaseline = 'top';
      
      positions.forEach((y, i) => {
        const x = i * 18;
        const speed = speeds[i];
        const opacity = opacities[i];
        
        if (Math.random() < 0.02) {
          opacities[i] = 0.3 + Math.random() * 0.5;
        }
        
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        const gradient = ctx.createLinearGradient(0, y - fontSize * 10, 0, y + fontSize);
        gradient.addColorStop(0, `rgba(0, 255, 136, 0)`);
        gradient.addColorStop(0.3, `rgba(0, 255, 136, ${opacity * 0.3})`);
        gradient.addColorStop(0.6, `rgba(0, 255, 136, ${opacity * 0.7})`);
        gradient.addColorStop(0.8, `rgba(138, 43, 226, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 0, 110, ${opacity * 0.3})`);
        
        ctx.fillStyle = gradient;
        ctx.fillText(char, x, y);
        
        positions[i] = y > canvas.height + fontSize * 20 ? Math.random() * -canvas.height * 2 : y + fontSize * speed;
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

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;
      drift: number;
    }> = [];

    const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.5 + Math.random() * 2,
        speed: 0.1 + Math.random() * 0.3,
        opacity: 0.05 + Math.random() * 0.15,
        color: ['rgba(0, 255, 136,', 'rgba(138, 43, 226,', 'rgba(0, 220, 255,'][Math.floor(Math.random() * 3)],
        drift: -0.3 + Math.random() * 0.6,
      });
    }

    let animationId: number;

    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.fill();
        
        p.y -= p.speed;
        p.x += p.drift;
        
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
      
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
      
      const gridSize = 80;
      const offsetX = (t * 0.5) % gridSize;
      const offsetY = (t * 0.3) % gridSize;
      
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.015)';
      ctx.lineWidth = 1;
      
      for (let x = -offsetX; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = -offsetY; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      const centerX = canvas.width / 2 + Math.sin(t * 0.0003) * 150;
      const centerY = canvas.height / 2 + Math.cos(t * 0.0002) * 100;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(canvas.width, canvas.height) * 0.7);
      gradient.addColorStop(0, 'rgba(0, 255, 136, 0.03)');
      gradient.addColorStop(0.3, 'rgba(138, 43, 226, 0.015)');
      gradient.addColorStop(0.6, 'rgba(255, 0, 110, 0.01)');
      gradient.addColorStop(1, 'rgba(6, 6, 12, 0)');
      
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
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px] bg-gradient-to-br from-[rgb(var(--accent-primary))/10] via-transparent to-[rgb(var(--accent-secondary))/5] animate-float-slow" />
      <div className="absolute top-1/3 right-1/5 w-[400px] h-[400px] rounded-full blur-[200px] bg-gradient-to-bl from-[rgb(var(--accent-tertiary))/8] via-transparent to-[rgb(var(--accent-cyan))/5] animate-float animate-float-slow" style={{ animationDelay: '-2s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full blur-[200px] bg-gradient-to-tr from-[rgb(var(--accent-secondary))/8] via-transparent to-[rgb(var(--accent-primary))/5] animate-float animate-float-fast" style={{ animationDelay: '-4s' }} />
      <div className="absolute bottom-1/5 right-1/4 w-[300px] h-[300px] rounded-full blur-[200px] bg-gradient-to-tl from-[rgb(var(--accent-cyan))/6] via-transparent to-transparent animate-float animate-float-slow" style={{ animationDelay: '-6s' }} />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-[300px] bg-gradient-to-r from-[rgb(var(--accent-primary))/3] via-transparent to-[rgb(var(--accent-secondary))/3] animate-pulse-glow" />
    </div>
  );
}

export function ScanLine() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 animate-scan" style={{ 
        background: 'linear-gradient(180deg, transparent 0%, rgba(0, 255, 136, 0.02) 50%, transparent 100%)',
        backgroundSize: '100% 200%'
      }} />
    </div>
  );
}

export function GeometricShapes() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute top-20 left-10 w-24 h-24 border border-[rgb(var(--accent-primary))/10] rounded-lg rotate-12 animate-float-slow animate-rotate-slow opacity-50" />
      <div className="absolute top-40 right-20 w-16 h-16 border border-[rgb(var(--accent-secondary))/10] rounded-full animate-float animate-rotate-slow" style={{ animationDuration: '20s', animationDelay: '-5s' }} />
      <div className="absolute bottom-30 left-20 w-32 h-32 border border-[rgb(var(--accent-tertiary))/10] rotate-45 animate-float-slow animate-rotate-slow" style={{ animationDuration: '25s', animationDelay: '-10s' }} />
      <div className="absolute bottom-20 right-30 w-20 h-20 border border-[rgb(var(--accent-cyan))/10] rounded-md animate-float animate-rotate-slow" style={{ animationDuration: '18s', animationDelay: '-3s' }} />
      <div className="absolute top-1/2 left-5 w-12 h-12 border border-[rgb(var(--accent-primary))/10] rounded-full animate-orbit opacity-30" />
      <div className="absolute top-1/3 right-5 w-8 h-8 border border-[rgb(var(--accent-secondary))/10] rounded-full animate-orbit opacity-30" style={{ animationDuration: '30s', animationDelay: '-15s' }} />
    </div>
  );
}

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-grid-pattern animate-grid opacity-50" />
      <div className="absolute inset-0 bg-radial-glow" />
      <GeometricShapes />
      <FloatingOrbs />
      <GridBackground />
      <MatrixRain />
      <ParticleField />
      <ScanLine />
    </div>
  );
}