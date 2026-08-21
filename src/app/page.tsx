import { ObfuscatorPanel } from '@/components/ObfuscatorPanel';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="relative">
        <BackgroundEffects />
        
        <Hero />
        
        <Features />
        
        <div className="section-container relative z-10">
          <ObfuscatorPanel />
        </div>
        
        <Footer />
      </main>
    </div>
  );
}