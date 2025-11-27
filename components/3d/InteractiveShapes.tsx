import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Html, Stars, Sparkles, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SectionType } from '../../types';

interface ShapeProps {
  position: [number, number, number];
  color: string;
  section: SectionType;
  label: string;
  onClick: (section: SectionType) => void;
  activeSection: SectionType | null;
  geometryType: 'box' | 'icosahedron' | 'octahedron' | 'torusKnot' | 'sphere';
  delay?: number;
}

const FloatingShape: React.FC<ShapeProps> = ({ 
  position, 
  color, 
  section, 
  label, 
  onClick, 
  activeSection, 
  geometryType,
  delay = 0 
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  
  // Animate the mesh
  useFrame((state) => {
    if (meshRef.current) {
      // Complex rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 + delay;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 + delay;
      
      // Hover scale effect
      const targetScale = hovered ? 1.2 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  // Render specific geometries based on type
  const Geometry = () => {
    switch (geometryType) {
      case 'icosahedron': return <icosahedronGeometry args={[1.2, 0]} />;
      case 'octahedron': return <octahedronGeometry args={[1.2, 0]} />;
      case 'torusKnot': return <torusKnotGeometry args={[0.7, 0.25, 128, 32]} />;
      case 'sphere': return <sphereGeometry args={[1, 64, 64]} />;
      default: return <boxGeometry args={[1.5, 1.5, 1.5]} />;
    }
  }

  const isDimmed = activeSection !== 'home' && activeSection !== section;

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onClick={(e) => { e.stopPropagation(); onClick(section); }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
        >
          <Geometry />
          {/* Enhanced Material for Glass/Liquid Metal effect */}
          <MeshDistortMaterial
            color={color}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.2}
            distort={hovered ? 0.6 : 0.3}
            speed={3}
          />
        </mesh>
        
        {/* Label floating above */}
        <Html position={[0, 1.8, 0]} center pointerEvents="none" style={{ opacity: isDimmed ? 0 : 1, transition: 'opacity 0.5s' }}>
          <div className={`
            px-4 py-2 rounded-lg backdrop-blur-md border border-white/10
            ${hovered ? 'bg-white/10 text-white border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-black/30 text-slate-300'}
            transition-all duration-300 whitespace-nowrap text-sm font-bold tracking-widest uppercase
          `}>
            {label}
          </div>
        </Html>
      </group>
    </Float>
  );
};

export const SceneContent: React.FC<{ onSectionChange: (s: SectionType) => void; activeSection: SectionType }> = ({ onSectionChange, activeSection }) => {
  return (
    <>
      <Environment preset="city" />
      
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="white" />
      
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={80} scale={12} size={3} speed={0.4} opacity={0.6} color="#ffffff" />
      
      {/* Ground shadows for depth */}
      <ContactShadows 
        position={[0, -4, 0]} 
        opacity={0.5} 
        scale={20} 
        blur={2} 
        far={4.5} 
        color="#000000"
      />

      {/* Center Group */}
      <group position={[0, -0.5, 0]}>
        {/* Experience - Left (Crystal) */}
        <FloatingShape
          position={[-3.5, 0, 0]}
          color="#3b82f6" // Blue
          section="experience"
          label="Experience"
          activeSection={activeSection}
          onClick={onSectionChange}
          geometryType="icosahedron"
          delay={0}
        />

        {/* Projects - Right (Complex Tech) */}
        <FloatingShape
          position={[3.5, 0, 0]}
          color="#a855f7" // Purple
          section="projects"
          label="Projects"
          activeSection={activeSection}
          onClick={onSectionChange}
          geometryType="torusKnot"
          delay={2}
        />

        {/* Skills - Top Center (Sharp) */}
        <FloatingShape
          position={[0, 2.5, -1]}
          color="#14b8a6" // Teal
          section="skills"
          label="Skills"
          activeSection={activeSection}
          onClick={onSectionChange}
          geometryType="octahedron"
          delay={4}
        />
        
        {/* Contact - Bottom Center (Global) */}
        <FloatingShape
          position={[0, -2.5, 1]}
          color="#f43f5e" // Rose
          section="contact"
          label="Contact"
          activeSection={activeSection}
          onClick={onSectionChange}
          geometryType="sphere"
          delay={1}
        />
      </group>
    </>
  );
};