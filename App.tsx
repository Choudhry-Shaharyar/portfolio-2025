import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import * as THREE from 'three';
import { SceneContent } from './components/3d/InteractiveShapes';
import { Overlay } from './components/Overlay';
import { Hero } from './components/Hero';
import { SectionType } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('home');

  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section);
  };

  const handleClose = () => {
    setActiveSection('home');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          shadows
          dpr={[1, 2]} // Optimize for high DPI screens
          gl={{ 
            antialias: true, 
            toneMapping: THREE.ACESFilmicToneMapping, 
            toneMappingExposure: 1.2 
          }}
          camera={{ position: [0, 0, 8.5], fov: 45 }}
        >
          <Suspense fallback={null}>
            <SceneContent 
              onSectionChange={handleSectionChange} 
              activeSection={activeSection} 
            />
            {/* 
               Restrict orbit controls so user doesn't get lost. 
               Disable zoom to keep composition tight.
               Enable autoRotate when in home state for dynamic feel.
            */}
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.5}
              autoRotate={activeSection === 'home'}
              autoRotateSpeed={0.8}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Loading Indicator for 3D Models */}
      <Loader 
        containerStyles={{ background: '#020617' }}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`} 
      />

      {/* 2D UI Layers */}
      <Hero isVisible={activeSection === 'home'} />
      
      <Overlay 
        section={activeSection} 
        onClose={handleClose} 
      />
      
      {/* Quick Nav for Mobile / Accessibility */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-4 md:hidden">
        {['experience', 'projects', 'skills', 'contact'].map((sec) => (
           <button
             key={sec}
             onClick={() => handleSectionChange(sec as SectionType)}
             className={`p-2 rounded-full border ${activeSection === sec ? 'bg-blue-500 border-blue-400 text-white' : 'bg-slate-800/80 border-slate-700 text-slate-400'}`}
             aria-label={sec}
           >
             <div className="w-4 h-4 rounded-full bg-current" />
           </button>
        ))}
      </nav>

      <div className="fixed bottom-4 right-4 z-10 text-slate-500 text-xs hidden md:block opacity-50">
        Built with React & Three.js
      </div>
    </div>
  );
}

export default App;