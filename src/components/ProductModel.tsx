import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

function MedicalMolecule({ index, velocity }: { index: number, velocity: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const randomFactor = useMemo(() => Math.random(), []);
  const initialPos = useMemo(() => ({
    x: (Math.random() - 0.5) * 0.5,
    y: (Math.random() - 0.5) * 1.5,
    z: (Math.random() - 0.5) * 0.5
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Complex swirling motion
    const speed = 0.5 + randomFactor * 1.5;
    const swirlRadius = 0.15 + randomFactor * 0.15;
    
    // React to scroll velocity - creates a "slosh" or "rush" effect
    const scrollEffect = velocity.current * 3;
    
    meshRef.current.position.x = initialPos.x + Math.sin(time * speed + index) * swirlRadius;
    meshRef.current.position.y += Math.sin(time * speed) * 0.001 + (scrollEffect * 0.05);
    meshRef.current.position.z = initialPos.z + Math.cos(time * speed + index) * swirlRadius;
    
    // Wrap around bottom/top
    if (meshRef.current.position.y > 0.8) meshRef.current.position.y = -0.8;
    if (meshRef.current.position.y < -0.8) meshRef.current.position.y = 0.8;
    
    // Spinning cross
    meshRef.current.rotation.x = time * speed + (scrollEffect * 2);
    meshRef.current.rotation.z = time * speed * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      {/* Plus / Cross shape representing medicine/clinical */}
      <boxGeometry args={[0.015, 0.05, 0.015]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} transparent opacity={0.3} />
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.015, 0.05, 0.015]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} transparent opacity={0.3} />
      </mesh>
    </mesh>
  );
}

export function DentalProductModel({ scrollY, onClick }: { scrollY: any, onClick?: () => void }) {
  const meshRef = useRef<THREE.Group>(null);
  const labelGroupRef = useRef<THREE.Group>(null);
  const labelMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const liquidMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [hovered, setHovered] = useState(false);

  // Procedural Label Texture with Wave Graphic and Integrated Branding
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    // Using a wider canvas to match the cylinder's circumference aspect ratio
    canvas.width = 2048;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Background - slightly translucent to show liquid depth
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Wave Graphic
    ctx.beginPath();
    ctx.moveTo(0, 350);
    for (let x = 0; x <= canvas.width; x++) {
      const y = 350 + Math.sin(x * 0.01) * 30 + Math.sin(x * 0.02) * 15;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    
    // Gradient for wave - Darker and punchier
    const gradient = ctx.createLinearGradient(0, 300, 0, 500);
    gradient.addColorStop(0, '#0ea5e9'); // bright blue
    gradient.addColorStop(0.5, '#0284c7'); // medium blue
    gradient.addColorStop(1, '#1e3a8a'); // dark navy
    ctx.fillStyle = gradient;
    ctx.fill();

    // Integrated Branding Text (To make it "sticky" to the cylinder)
    // The cylinder circumference is ~4.8x the height.
    // 2048/512 is 4x. So we scale the context vertically to combat horizontal stretch.
    ctx.save();
    const centerX = canvas.width * 0.5; // Perfectly centered to face camera
    ctx.translate(centerX, 0);
    ctx.scale(0.8, 1.2); // Squeeze horizontally, stretch vertically to fix "squashed" look
    
    // ISA Logo & Text
    ctx.fillStyle = '#115e59';
    ctx.fillRect(-120, 80, 40, 40);
    ctx.font = 'bold 30px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('ISA', -70, 110);

    // Main Branding: PerioGum
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 120px Inter, sans-serif'; // Bigger font
    ctx.textAlign = 'center';
    ctx.fillText('PerioGum', 0, 220);

    // Subtitle
    ctx.fillStyle = '#334155';
    ctx.font = '36px Inter, sans-serif';
    ctx.fillText('Chlorhexidine Mouth Wash I.P.', 0, 280);

    // Details - centered under subtitle
    ctx.fillStyle = '#64748b';
    ctx.font = '28px Inter, sans-serif';
    ctx.fillText('150 ml', 0, 340);

    // Alcohol Free
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 36px Inter, sans-serif';
    ctx.fillText('ALCOHOL FREE', 0, 420);
    
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.anisotropy = 16; // Keep text crisp at angles
    return texture;
  }, []);

  // Re-calibrated points to ensure liquid stays STRICTLY inside the bottle shell
  const bottlePoints = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector2(0, -0.9));
    pts.push(new THREE.Vector2(0.48, -0.9)); 
    pts.push(new THREE.Vector2(0.55, -0.75)); 
    pts.push(new THREE.Vector2(0.52, -0.55));
    pts.push(new THREE.Vector2(0.48, -0.4)); 
    pts.push(new THREE.Vector2(0.48, 0.25));  
    pts.push(new THREE.Vector2(0.52, 0.4));  
    pts.push(new THREE.Vector2(0.55, 0.55)); 
    pts.push(new THREE.Vector2(0.42, 0.75)); 
    pts.push(new THREE.Vector2(0.35, 0.85)); 
    pts.push(new THREE.Vector2(0.35, 0.95)); 
    return pts;
  }, []);

  const liquidPoints = useMemo(() => {
    const pts = [];
    // Carefully nested inside bottle shell with 0.05 margin to prevent clipping
    pts.push(new THREE.Vector2(0, -0.85));
    pts.push(new THREE.Vector2(0.42, -0.85));
    pts.push(new THREE.Vector2(0.49, -0.72));
    pts.push(new THREE.Vector2(0.46, -0.55));
    pts.push(new THREE.Vector2(0.42, -0.4));
    pts.push(new THREE.Vector2(0.42, 0.25));
    pts.push(new THREE.Vector2(0.46, 0.4));
    pts.push(new THREE.Vector2(0.49, 0.55));
    pts.push(new THREE.Vector2(0.35, 0.72)); 
    pts.push(new THREE.Vector2(0.25, 0.88)); 
    pts.push(new THREE.Vector2(0, 0.88));    
    return pts;
  }, []);

  const liquidGroupRef = useRef<THREE.Group>(null);
  const prevScroll = useRef(0);
  const velocity = useRef(0);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  useFrame((state) => {
    if (!meshRef.current) return;
    const scroll = scrollY.get();
    const time = state.clock.elapsedTime;
    
    // Calculate scroll velocity
    velocity.current = THREE.MathUtils.lerp(velocity.current, (scroll - prevScroll.current) * 15, 0.1);
    prevScroll.current = scroll;

    // START FROM LABEL: Ensure rotation starts at 0 (label side)
    meshRef.current.position.y = Math.sin(time) * 0.04;
    
    // Responsive Shift: Center on mobile, Shift right on desktop
    const targetX = isMobile ? 0 : 1.2;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    
    // ENTRANCE ANIMATION: Smooth pop-in and spin
    const spawnDuration = 1.5;
    const spawnScale = THREE.MathUtils.smoothstep(time, 0, spawnDuration);
    
    // Subtle Pulse
    const pulse = Math.sin(time * 1.5) * 0.01;
    // REDUCED SCALE: 0.95 base for a smaller, more elegant profile on desktop, 0.8 on mobile
    const baseScaleValue = isMobile ? 0.8 : 0.95;
    const scrollScale = baseScaleValue + scroll * 0.15;
    const baseScale = scrollScale * spawnScale;
    meshRef.current.scale.set(baseScale + pulse, baseScale + pulse, baseScale + pulse);

    // Update rotation - Start exactly at front side with label facing camera
    meshRef.current.rotation.y = (scroll * Math.PI * 4) + Math.sin(time * 0.5) * 0.1 + Math.PI;

    // Realistic Liquid Sloshing - Reacts to Scroll Velocity
    if (liquidGroupRef.current) {
        // Liquid tilts based on scroll movement speed
        const tiltIntensity = velocity.current * 0.15;
        liquidGroupRef.current.rotation.z = THREE.MathUtils.lerp(liquidGroupRef.current.rotation.z, Math.sin(time * 0.5) * -0.02 + tiltIntensity, 0.1);
        liquidGroupRef.current.rotation.x = THREE.MathUtils.lerp(liquidGroupRef.current.rotation.x, Math.cos(time * 0.8) * 0.015, 0.1);
        
        // Liquid "compresses" slightly during fast movement
        const compression = 1 - Math.abs(velocity.current) * 0.02;
        liquidGroupRef.current.scale.y = THREE.MathUtils.lerp(liquidGroupRef.current.scale.y, compression, 0.1);
    }


    if (liquidMatRef.current) {
      // Very subtle internal shimmer/glow pulsing to keep color rich
      const glowPulse = 0.15 + Math.sin(time * 0.8) * 0.05;
      liquidMatRef.current.emissiveIntensity = glowPulse;
    }

    // Dynamic Label Animation - Perfectly stuck
    if (labelGroupRef.current) {
      labelGroupRef.current.position.y = -0.15; // Shifted further down
      labelGroupRef.current.scale.set(1, 1, 1);
    }

    if (labelMatRef.current) {
      // Intensify color by increasing emissive intensity or color on hover
      const targetEmissiveIntensity = hovered ? 0.3 : 0;
      labelMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        labelMatRef.current.emissiveIntensity, 
        targetEmissiveIntensity, 
        0.1
      );
      labelMatRef.current.emissive = new THREE.Color(hovered ? '#e0f2fe' : '#000000');
    }

    // Label texture sheen flow REMOVED: Texture must remain static for "sticky" branding
    // labelTexture.offset.x = time * 0.03; 

    // Cursor feedback
    state.gl.domElement.style.cursor = hovered ? 'pointer' : 'auto';
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.2}>
        
        {/* Transparent Bottle Shell */}
        <mesh position={[0, -0.2, 0]} renderOrder={3} onClick={onClick}>
          <latheGeometry args={[bottlePoints, 64]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transparent 
            opacity={0.1}
            transmission={0.9}
            thickness={0.1}
            roughness={0.02}
            metalness={0.05}
            clearcoat={1}
            ior={1.45}
            depthWrite={true}
          />
        </mesh>

        {/* Vibrant Blue Liquid - Volumetric and Protected */}
        <group ref={liquidGroupRef} position={[0, -0.2, 0]} renderOrder={1} onClick={onClick}>
          <mesh>
            <latheGeometry args={[liquidPoints, 64]} />
            <meshPhysicalMaterial 
              ref={liquidMatRef}
              color="#ffffff" 
              transmission={0.95} 
              ior={1.33} 
              thickness={2.5} 
              roughness={0} 
              metalness={0}
              attenuationColor="#0284c7" 
              attenuationDistance={0.4} 
              clearcoat={0.1} 
              clearcoatRoughness={0}
              specularIntensity={1}
              transparent
              opacity={1}
              depthWrite={true}
              side={THREE.DoubleSide} 
            />
          </mesh>

          {/* Dynamic Medical-Grade molecules that swirl with scroll */}
          <group>
            {[...Array(15)].map((_, i) => (
              <MedicalMolecule key={i} index={i} velocity={velocity} />
            ))}
          </group>
        </group>

        {/* Improved Squat Matte White Measuring Cap */}
        <mesh position={[0, 1.15, 0]} onClick={onClick}>
          <cylinderGeometry args={[0.32, 0.45, 0.55, 32]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.4} metalness={0.05} />
        </mesh>

        {/* Label (Wrapped Plane or Cylinder Segment) */}
        <group 
          ref={labelGroupRef} 
          position={[0, -0.15, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
          renderOrder={2}
        >
          <mesh rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.495, 0.495, 0.6, 64]} />
            <meshStandardMaterial 
              ref={labelMatRef}
              map={labelTexture} 
              roughness={0.6} 
              emissiveIntensity={0}
              transparent
              polygonOffset
              polygonOffsetFactor={-10} // Stronger offset to prevent flickering
            />
          </mesh>
        </group>

      </Float>
    </group>
  );
}
