import React, { useState } from 'react';

interface Item {
  id: number | string;
  name?: string;
  title?: string;
  image?: string;
  imageUrl?: string;
}

interface AccordionItemProps {
  item: Item;
  isActive: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}

// Normalise image path so both "images/foo.png" and "/images/foo.png" work.
function resolveImage(raw?: string): string {
  if (!raw) return '';
  if (raw.startsWith('http') || raw.startsWith('/')) return raw;
  return '/' + raw;
}

// --- Desktop Accordion Item ---
const AccordionItem = ({ item, isActive, onMouseEnter, onClick }: AccordionItemProps) => {
  const title = item.title || item.name;
  const image = resolveImage(item.imageUrl || item.image);

  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer shrink-0 snap-start
        transition-all duration-700 ease-in-out bg-white border border-slate-100
        h-[420px]
        ${isActive ? 'w-[300px] lg:w-[360px]' : 'w-[70px] lg:w-[80px]'}
      `}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className={`absolute inset-0 w-full h-full object-contain p-6 z-0 transition-all duration-700 ${isActive ? 'scale-105 opacity-100' : 'opacity-0 scale-95'}`}
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src =
            'https://placehold.co/400x420/f8fafc/94a3b8?text=No+Image';
        }}
      />

      {/* Caption */}
      <span
        className={`
          absolute font-semibold whitespace-nowrap z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-100
          transition-all duration-500 ease-in-out shadow-sm
          ${isActive
            ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0 text-slate-900 text-sm tracking-wide'
            : 'bottom-24 left-1/2 -translate-x-1/2 rotate-90 text-slate-500 text-xs tracking-widest opacity-80'}
        `}
      >
        {title}
      </span>

    </div>
  );
};

// --- Mobile Card (simple vertical card) ---
const MobileCard = ({ item, onClick }: { item: Item; onClick: () => void }) => {
  const title = item.title || item.name;
  const image = resolveImage(item.imageUrl || item.image);

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer shrink-0 w-[160px] h-[220px] snap-start bg-white border border-slate-100"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src =
            'https://placehold.co/160x220/f8fafc/94a3b8?text=No+Image';
        }}
      />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] text-center">
        <span className="inline-block bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-full border border-slate-100 text-[10px] font-bold z-20 leading-tight shadow-sm">
          {title}
        </span>
      </div>
    </div>
  );
};

// --- Main Exported Component ---
export function LandingAccordionItem({ items }: { items: Item[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white font-sans overflow-hidden min-h-screen w-screen snap-start flex items-center">
      <section className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">

          {/* ── Left: Text Content ── */}
          <div className="w-full md:w-[42%] text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tighter">
              Advanced Solutions for{' '}
              <span className="text-emerald-600">Oral Health</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-500 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Explore our range of clinical-grade products trusted by surgeons and
              dental professionals across the country.
            </p>
            <div className="mt-8 flex flex-col xs:flex-row items-center md:items-start justify-center md:justify-start gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                View Full Catalog
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 font-semibold px-7 py-4 rounded-xl hover:border-emerald-300 hover:text-emerald-600 transition-all duration-300 whitespace-nowrap"
              >
                Learn More
              </a>
            </div>

            {/* Mini stat row */}
            <div className="mt-10 flex items-center justify-center md:justify-start gap-8 text-center">
              {[
                { value: '8+', label: 'Products' },
                { value: '500+', label: 'Surgeons' },
                { value: '100%', label: 'Clinical Grade' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-black text-emerald-600">{s.value}</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Accordion ── */}
          <div className="w-full md:w-[58%]">

            {/* GALLERY LAYOUT (Handles unlimited products beautifully) */}
            <div className="flex flex-col gap-4 sm:gap-6">

              {/* Active / Featured Product Card */}
              <div className="relative w-full rounded-[2rem] overflow-hidden h-[260px] sm:h-[460px] bg-white border border-slate-100 flex items-center justify-center p-6 sm:p-12 shadow-sm transition-all duration-500">
                <img
                  src={resolveImage(items[activeIndex]?.imageUrl || items[activeIndex]?.image)}
                  alt={items[activeIndex]?.title || items[activeIndex]?.name}
                  className="w-full h-full object-contain transition-transform duration-700 scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/600x400/f8fafc/94a3b8?text=No+Image';
                  }}
                />


              </div>

              {/* Thumbnails Grid (Wraps automatically) */}
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-start">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`relative shrink-0 w-[60px] h-[60px] sm:w-[76px] sm:h-[76px] rounded-xl overflow-hidden border-2 transition-all duration-300 bg-white
                      ${index === activeIndex
                        ? 'border-emerald-500 scale-110 shadow-md z-10'
                        : 'border-slate-100 opacity-60 hover:opacity-100 hover:border-slate-300'}
                    `}
                  >
                    <img
                      src={resolveImage(item.imageUrl || item.image)}
                      alt={item.title || item.name}
                      className="w-full h-full object-contain p-1.5"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/80x80/e2e8f0/94a3b8?text=?';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
