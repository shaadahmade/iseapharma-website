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
}

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter }: AccordionItemProps) => {
  const title = item.title || item.name;
  const image = item.imageUrl || item.image;

  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out shrink-0 bg-slate-100
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error'; }}
      />
      {/* Dark overlay for better text readability */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-700 z-10 ${isActive ? 'bg-opacity-20' : 'bg-opacity-50'}`}></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap z-20
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0' 
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {title}
      </span>
    </div>
  );
};


// --- Main App Component ---
export function LandingAccordionItem({ items }: { items: Item[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white font-sans overflow-hidden h-screen w-screen snap-start flex items-center">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tighter">
              Advanced Solutions for <span className="text-emerald-600">Oral Health</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
              Explore our range of clinical-grade products trusted by surgeons and dental professionals across the country.
            </p>
            <div className="mt-8">
              <a
                href="#products"
                className="inline-block bg-slate-900 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105"
              >
                View Full Catalog
              </a>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div 
              className="flex flex-row items-center justify-start gap-4 overflow-x-auto p-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
              <div className="flex flex-row gap-4 no-scrollbar">
                {items.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isActive={index === activeIndex}
                    onMouseEnter={() => handleItemHover(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
