import { ObfuscatorPanel } from '@/components/ObfuscatorPanel';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackgroundEffects } from '@/components/BackgroundEffects';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 pb-12">
        <BackgroundEffects />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ObfuscatorPanel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}