import React, { useState, useRef } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LENS_SIZE = 160;   // px diameter of the circular lens
const ZOOM = 2.8;        // magnification factor

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className = "" }) => {
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLens({ x, y });
  };

  const handleMouseLeave = () => setLens(null);

  // Touch support
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setLens({ x, y });
  };

  const handleTouchEnd = () => setLens(null);

  // Calculate background-position so the zoomed region is centered in the lens
  let bgX = 0;
  let bgY = 0;
  let bgW = 0;
  let bgH = 0;

  if (lens && containerRef.current) {
    const { width, height } = containerRef.current.getBoundingClientRect();
    bgW = width * ZOOM;
    bgH = height * ZOOM;
    bgX = -(lens.x * ZOOM - LENS_SIZE / 2);
    bgY = -(lens.y * ZOOM - LENS_SIZE / 2);
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: lens ? 'none' : 'crosshair' }}
    >
      {/* Base image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain p-4 pointer-events-none"
        draggable={false}
      />

      {/* Circular Magnifier Lens */}
      {lens && (
        <div
          style={{
            position: 'absolute',
            left: lens.x - LENS_SIZE / 2,
            top: lens.y - LENS_SIZE / 2,
            width: LENS_SIZE,
            height: LENS_SIZE,
            borderRadius: '50%',
            overflow: 'hidden',
            pointerEvents: 'none',
            border: '3px solid rgba(255,255,255,0.9)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)',
            background: `url(${src}) no-repeat`,
            backgroundSize: `${bgW}px ${bgH}px`,
            backgroundPosition: `${bgX}px ${bgY}px`,
            zIndex: 30,
          }}
        />
      )}

      {/* Hint when not hovering */}
      {!lens && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-100 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Magnify</span>
        </div>
      )}
    </div>
  );
};
