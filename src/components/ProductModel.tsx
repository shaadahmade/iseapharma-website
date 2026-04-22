import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';



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
    // Tighter margin (0.02) to simulate thin plastic walls
    pts.push(new THREE.Vector2(0, -0.88));
    pts.push(new THREE.Vector2(0.46, -0.88));
    pts.push(new THREE.Vector2(0.53, -0.75));
    pts.push(new THREE.Vector2(0.50, -0.55));
    pts.push(new THREE.Vector2(0.46, -0.4));
    pts.push(new THREE.Vector2(0.46, 0.25));
    pts.push(new THREE.Vector2(0.50, 0.4));
    pts.push(new THREE.Vector2(0.53, 0.55));
    pts.push(new THREE.Vector2(0.40, 0.75)); 
    pts.push(new THREE.Vector2(0.33, 0.85)); 
    pts.push(new THREE.Vector2(0, 0.85));    
    return pts;
  }, []);

  const liquidGroupRef = useRef<THREE.Group>(null);
  const prevScroll = useRef(0);
  const velocity = useRef(0);
  const mouseVelocity = useRef(new THREE.Vector2(0, 0));
  const prevMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));
  const slosh = useRef({ x: 0, z: 0 });
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  // Global mouse tracking since the canvas might be behind other layers
  useMemo(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 to 1 range (R3F style)
      currentMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      currentMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const scroll = scrollY.get();
    const time = state.clock.elapsedTime;
    const mouse = currentMouse.current;

    // Calculate mouse velocity for interactive sloshing (Reduced sensitivity for less 'jiggle')
    mouseVelocity.current.set(
      THREE.MathUtils.lerp(mouseVelocity.current.x, (mouse.x - prevMouse.current.x) * 6, 0.05),
      THREE.MathUtils.lerp(mouseVelocity.current.y, (mouse.y - prevMouse.current.y) * 6, 0.05)
    );
    prevMouse.current.copy(mouse);

    // Calculate scroll velocity
    velocity.current = THREE.MathUtils.lerp(velocity.current, (scroll - prevScroll.current) * 10, 0.1);
    prevScroll.current = scroll;

    // Inertial Slosh Spring System (More damping for stability)
    const targetSloshX = velocity.current * 0.1 + mouseVelocity.current.y * 0.05;
    const targetSloshZ = mouseVelocity.current.x * 0.1;

    slosh.current.x = THREE.MathUtils.lerp(slosh.current.x, targetSloshX, 0.05);
    slosh.current.z = THREE.MathUtils.lerp(slosh.current.z, targetSloshZ, 0.05);

    // Subtle swaying animation
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.04;

    // Responsive Shift
    const targetX = isMobile ? 0 : 1.2;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);

    // Entrance Animation
    const spawnDuration = 1.5;
    const spawnScale = THREE.MathUtils.smoothstep(time, 0, spawnDuration);

    const baseScaleValue = isMobile ? 0.8 : 0.95;
    const scrollScale = baseScaleValue + scroll * 0.15;
    const baseScale = scrollScale * spawnScale;
    meshRef.current.scale.set(baseScale, baseScale, baseScale);

    // Parallax Rotation
    meshRef.current.rotation.y = (scroll * Math.PI * 4) + Math.PI;
    
    // Interactive Tilt: Slight tilt of the bottle itself toward mouse (Smoother)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.05, 0.05);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -mouse.x * 0.05, 0.05);

    // REALISTIC LIQUID PHYSICS
    if (liquidGroupRef.current) {
      // Liquid sloshes in the opposite direction of movement (Inertia) - Smoother lerp
      liquidGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        liquidGroupRef.current.rotation.z, 
        Math.sin(time * 0.5) * -0.01 + slosh.current.z, 
        0.08
      );
      liquidGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        liquidGroupRef.current.rotation.x, 
        Math.cos(time * 0.5) * 0.01 + slosh.current.x, 
        0.08
      );

      // Volume preservation/Compression: Liquid "bulges" slightly when shaken
      const movementIntensity = Math.abs(velocity.current) + mouseVelocity.current.length();
      const compression = 1 - movementIntensity * 0.01;
      liquidGroupRef.current.scale.y = THREE.MathUtils.lerp(liquidGroupRef.current.scale.y, compression, 0.1);
      
      // Dynamic Distortion: Liquid becomes more "turbulent" (Lowered max distortion)
      if (liquidMatRef.current) {
        const targetDistort = 0.04 + movementIntensity * 0.05;
        (liquidMatRef.current as any).distort = THREE.MathUtils.lerp((liquidMatRef.current as any).distort, targetDistort, 0.05);
        (liquidMatRef.current as any).speed = 1.5 + movementIntensity * 1.5;
      }
    }

    if (liquidMatRef.current) {
      const glowPulse = 0.15 + Math.sin(time * 0.8) * 0.05;
      liquidMatRef.current.emissiveIntensity = glowPulse;
    }

    // Dynamic Label Animation - Perfectly stuck
    if (labelGroupRef.current) {
      labelGroupRef.current.position.y = -0.15; // Shifted further down
      labelGroupRef.current.scale.set(1, 1, 1);
    }

    if (labelMatRef.current) {
      // Keep label material clean and professional (no neon hover glows)
      labelMatRef.current.emissiveIntensity = 0;
    }
  });

  return (
    <group ref={meshRef}>

        {/* Transparent Bottle Shell (Thin Plastic) */}
        <mesh position={[0, -0.2, 0]} renderOrder={3} onClick={onClick}>
          <latheGeometry args={[bottlePoints, 64]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.1}
            clearcoat={1}
            depthWrite={false}
          />
        </mesh>

        {/* Vibrant Blue Liquid - Volumetric and Animated */}
        <group ref={liquidGroupRef} position={[0, -0.2, 0]} renderOrder={1} onClick={onClick}>
          <mesh>
            <latheGeometry args={[liquidPoints, 64]} />
            <MeshDistortMaterial
              ref={liquidMatRef as any}
              color="#0284c7"
              emissive="#0369a1"
              emissiveIntensity={0.2}
              roughness={0.1}
              metalness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.1}
              transparent={true}
              opacity={0.85}
              depthWrite={false}
              side={THREE.DoubleSide}
              distort={0.04}
              speed={3}
            />
          </mesh>
        </group>

        {/* Improved Squat Matte White Measuring Cap - Moved down to connect to neck */}
        <mesh position={[0, 1.0, 0]} onClick={onClick}>
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

    </group>
  );
}
