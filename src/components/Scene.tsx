import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import { DentalProductModel } from './ProductModel';
import { useScroll } from 'motion/react';

export function Scene({ onBottleClick }: { onBottleClick?: () => void }) {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          
          {/* Key Light */}
          <spotLight 
            position={[10, 15, 10]} 
            angle={0.2} 
            penumbra={1} 
            intensity={2} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />
          
          {/* Fill Light */}
          <pointLight position={[-10, 5, -2]} intensity={1} color="#d1fae5" />
          
          {/* Rim Light - Stronger emerald punch from behind */}
          <pointLight position={[5, 10, -8]} intensity={2} color="#10b981" />
          <pointLight position={[-5, -5, -8]} intensity={1} color="#0ea5e9" />
          
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <DentalProductModel scrollY={scrollYProgress} onClick={onBottleClick} />
          </PresentationControls>

          <ContactShadows 
            position={[0, -1.8, 0]} 
            opacity={0.3} 
            scale={12} 
            blur={2} 
            far={4} 
            color="#0ea5e9"
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
