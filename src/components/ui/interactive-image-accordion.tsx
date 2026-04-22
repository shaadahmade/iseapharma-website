import React, { useState } from 'react';

// --- Data for the image accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'Periogum Plus',
    imageUrl: '/images/periogum-plus.png',
  },
  {
    id: 2,
    title: 'Periogum Mouthwash',
    imageUrl: '/images/periogum-mouthwash.jpg',
  },
  {
    id: 3,
    title: 'LignoWin Gel',
    imageUrl: '/images/lignowin-gel.png',
  },
  {
    id: 4,
    title: 'Orogum Gum Paint',
    imageUrl: '/images/orogum-gum-paint.png',
  },
  {
    id: 5,
    title: 'IesaGuard Gloves',
    imageUrl: '/images/iesa-guard-gloves.jpg',
  },
  {
    id: 6,
    title: 'MorePep SP Tablets',
    imageUrl: '/images/morepep-sp-tablets.jpeg',
  },
  {
    id: 7,
    title: 'ProTiesa Powder',
    imageUrl: '/images/protiesa-protein-powder.png',
  },
  {
    id: 8,
    title: 'Orogum T',
    imageUrl: '/images/orogum-t.jpg',
  },
];

interface AccordionItemProps {
  item: {
    id: number;
    title: string;
    imageUrl: string;
  };
  isActive: boolean;
  onMouseEnter: () => void;
}

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error'; }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0' // Active state: horizontal, bottom-center
              // Inactive state: vertical, positioned at the bottom, for all screen sizes
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};


// --- Main App Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

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
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4 scrollbar-hide">
              {accordionItems.map((item, index) => (
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
      </section>
    </div>
  );
}
