import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Shield, Clock, Award, Star, MapPin, Phone, Mail, ChevronRight, X, Info, Beaker, CheckCircle2, ChevronDown, ShoppingCart, Percent, Menu } from 'lucide-react';
import { LandingAccordionItem } from './components/ui/interactive-image-accordion';
import { Scene } from './components/Scene';
import { ProductImage } from './components/ui/product-image';


export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // Close mobile menu on category change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeCategory]);

  const products = [
    // --- MOUTHWASH ---
    {
      id: "periogum-plus",
      name: "Periogum Plus",
      category: "Mouthwash",
      subtitle: "Chlorhexidine Gluconate Solution I.P. 0.2% w/v",
      desc: "Prevents the formation of dental plaques.",
      image: "images/periogum-plus.png",
      primaryUse: "Effective against gingivitis, plaque formation, and maintenance of oral hygiene.",
      size: "150 ml",
      benefits: ["Kills 99.9% of oral bacteria", "Reduces gum inflammation", "Prevents bleeding symptoms", "Long-lasting fresh breath"],
      composition: "Chlorhexidine 0.2%, Sodium Fluoride 0.05%, Zinc Chloride 0.09%",
      buyLink: "https://www.1mg.com/otc/periogum-plus-mouthwash-100ml-each-otc894806"
    },
    {
      id: "periogum-mw",
      name: "Periogum Mouthwash",
      category: "Mouthwash",
      subtitle: "Daily Oral Rinse for Gum Care",
      desc: "For gingivitis and maintenance of oral hygiene.",
      image: "images/periogum-mouthwash.jpg",
      primaryUse: "Broad spectrum anti-microbial protection for clinical dental health.",
      size: "100 ml",
      benefits: ["Prevents gum recession", "Gentle on sensitive tissues", "Alcohol-free formula", "Clinically proven efficacy"],
      composition: "Chlorhexidine gluconate 0.2%",
      buyLink: "https://www.1mg.com/otc/periogum-plus-mouthwash-100ml-each-otc894806"
    },
    {
      id: "periogum-kf",
      name: "PerioGum KF",
      category: "Mouthwash",
      subtitle: "Potassium Nitrate 3% w/v & Sodium Fluoride 0.2% w/v Oral Rinse",
      desc: "Sugar-free, alcohol-free mouthwash specially formulated for sensitive teeth and gum care.",
      image: "images/periogum-kf.jpg",
      primaryUse: "Reduces tooth sensitivity caused by hot, cold, sweet or sour stimuli. Strengthens enamel and prevents cavities.",
      size: "100 ml",
      benefits: ["Relieves tooth sensitivity", "Strengthens tooth enamel", "Prevents cavities & dental caries", "Alcohol-free & sugar-free"],
      composition: "Potassium Nitrate 3% w/v & Sodium Fluoride 0.2% w/v",
      buyLink: "https://www.iesapharma.com/search/all?name=PerioGum-KF"
    },
    {
      id: "periogum-bz",
      name: "Periogum BZ",
      category: "Mouthwash",
      subtitle: "Benzydamine HCl 0.15% w/v Mouth Wash",
      desc: "Anti-inflammatory mouthwash that soothes pain and inflammation in the oral cavity and throat.",
      image: "images/periogum-bz-promo.png",
      primaryUse: "Relief from oral pain and inflammation, post-dental surgery, oral mucositis, and sore throat.",
      size: "150 ml",
      benefits: ["Local analgesic & anesthetic effect", "Reduces post-surgery swelling", "Relief from oral mucositis", "Soothes sore throat & pharyngitis"],
      composition: "Benzydamine HCl 0.15% w/v",
      buyLink: "https://www.iesapharma.com/search/all?name=Periogum-BZ"
    },
    {
      id: "esadine",
      name: "Esadine Mouth Gargle",
      category: "Mouthwash",
      subtitle: "Povidone Iodine 2% w/v Mouth Gargle",
      desc: "Powerful antiseptic gargle that rinses away oral infections to maintain hygiene.",
      image: "images/esadine-promo.png",
      primaryUse: "Treatment of acute mucosal infections of mouth and pharynx, oral hygiene during and after dental surgery, gingivitis, and mouth ulcers.",
      size: "100 ml",
      benefits: ["High bactericidal rate", "Reduces MRSA & S. aureus infections", "More effective than chlorhexidine gluconate", "Prevents wound infection"],
      composition: "Povidone Iodine 2% w/v",
      buyLink: "https://www.iesapharma.com/search/all?name=Esadine"
    },
    // --- GUM PAINT ---
    {
      id: "orogum-gp",
      name: "Orogum Gum Paint",
      category: "Gum Paint",
      subtitle: "Advanced Relief for Bleeding Gums",
      desc: "A touch of relief for bleeding gums.",
      image: "images/orogum-gum-paint.png",
      primaryUse: "Direct application for swollen, spongy, and receding gums.",
      size: "15 ml",
      benefits: ["Stops gum bleeding instantly", "Tightens loose gums", "Antiseptic action", "Localized clinical treatment"],
      composition: "Iodine, Potassium Iodide, Tannic Acid & Glycerin",
      buyLink: "https://www.iesapharma.com/search/all?name=Orogum"
    },
    {
      id: "orogum-t",
      name: "Orogum T",
      category: "Gum Paint",
      subtitle: "Therapeutic Solution for Receding Gums",
      desc: "For bleeding, swollen, spongy, and receding/loose gums.",
      image: "images/orogum-t.jpg",
      primaryUse: "Targeted therapy for chronic gum issues and tissue maintenance.",
      size: "15 ml",
      benefits: ["Closes interdental gaps", "Strengthens periodontal bond", "Reduces tooth mobility", "Clinical precision formula"],
      composition: "Tannic Acid, Zinc Chloride & Cetrimide",
      buyLink: "https://www.iesapharma.com/search/all?name=Orogum-T"
    },
    // --- ORAL GEL ---
    {
      id: "lignowin",
      name: "LignoWin Mouth Ulcer Gel",
      category: "Oral Gel",
      subtitle: "Fast-acting Pain Relief Gel",
      desc: "Fast relief from pain due to mouth ulcers.",
      image: "images/lignowin-gel.png",
      primaryUse: "Soothing relief for mouth ulcers and oral lesions.",
      size: "10g Tube",
      benefits: ["Instant numbing effect", "Promotes faster healing", "Forms protective layer", "Sugar-free gel base"],
      composition: "Lignocaine HCl 2.0% w/v + Choline Salicylate 8.7% w/v + Benzalkonium Chloride 0.01% w/v",
      buyLink: "https://www.1mg.com/search/all?name=Lignowin"
    },
    {
      id: "lignowin-m",
      name: "Lignowin M Gel",
      category: "Oral Gel",
      subtitle: "Triple Action – Antiseptic, Antibacterial, Anaesthetic",
      desc: "A combination of Chlorhexidine Gluconate, Metronidazole & Lidocaine for complete oral protection.",
      image: "images/lignowin-m-gel.png",
      primaryUse: "Treatment of gingivitis, periodontitis, aphthous ulcers, oral mucositis, and denture irritation.",
      size: "10g Tube",
      benefits: ["Triple-action antiseptic formula", "Targets anaerobic bacteria", "Instant pain numbing", "Promotes gum tissue healing"],
      composition: "Lignocaine 1% + Chlorhexidine Gluconate 1% + Metronidazole 1%",
      buyLink: "https://www.iesapharma.com/search/all?name=Lignowin-M"
    },
    {
      id: "chlorhex-ornidazole",
      name: "Clornida Gel",
      category: "Oral Gel",
      subtitle: "Chlorhexidine Gluconate 0.25% + Ornidazole 1% Gel",
      desc: "Dual-action antiseptic and antibacterial gel for trusted care in confident healing.",
      image: "images/clornida-gel-promo.png",
      primaryUse: "Treatment of gingivitis, periodontitis, oral ulcers, infections, and pre/post dental procedures.",
      size: "10g Tube",
      benefits: ["Dual antiseptic & antibacterial action", "Reduces dry socket post-extraction", "Heals mouth ulcers", "Fights bacterial & protozoal infections"],
      composition: "Chlorhexidine Gluconate 0.25% + Ornidazole 1%",
      buyLink: "https://www.iesapharma.com/search/all?name=Chlorhex-O"
    },
    // --- TABLETS ---
    {
      id: "morepep-sp",
      name: "Morpep-SP Tablets",
      category: "Tablets",
      subtitle: "Aceclofenac, Paracetamol & Serratiopeptidase Tablets",
      desc: "Triple-action anti-inflammatory, analgesic, and enzyme combination for post-dental surgical pain and swelling.",
      image: "images/morepep-sp-tablets.jpeg",
      primaryUse: "Relief from pain, inflammation and oedema associated with dental procedures and oral surgeries.",
      size: "10x10 Tablets",
      benefits: ["Fast-acting anti-inflammatory", "Reduces post-surgical swelling", "Enzyme (Serratiopeptidase) for faster recovery", "Professional dental strength"],
      composition: "Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg",
      buyLink: "https://www.iesapharma.com/search/all?name=Morepep-SP"
    },
    {
      id: "morpep-p",
      name: "Morpep-P Tablets",
      category: "Tablets",
      subtitle: "Aceclofenac & Paracetamol Tablets I.P.",
      desc: "Dual-action pain and fever relief combining Aceclofenac and Paracetamol for dental pain management.",
      image: "images/morpep-p-tablets.jpg",
      primaryUse: "Relief from dental pain, tooth extraction pain, and post-operative pain and fever.",
      size: "10x10 Tablets",
      benefits: ["Rapid pain relief", "Reduces fever", "Anti-inflammatory action", "Well tolerated formula"],
      composition: "Aceclofenac 100mg + Paracetamol 325mg",
      buyLink: "https://www.iesapharma.com/search/all?name=Morpep-P"
    },
    // --- OTHER ---
    {
      id: "orobloc-2ad",
      name: "Orobloc 2% AD",
      category: "Other",
      subtitle: "Lignocaine Hydrochloride & Adrenaline Injection IP",
      desc: "Local anaesthetic injection with adrenaline for dental procedures. Schedule H prescription drug.",
      image: "images/orobloc-2ad-promo.jpg",
      primaryUse: "Local anaesthesia for dental procedures including tooth extraction, oral surgeries, and invasive dental treatments.",
      size: "30 ml Multidose Vial",
      benefits: ["Fast-acting local anaesthesia", "Adrenaline 1:80000 for vasoconstriction", "Up to 10 withdrawals per vial", "Clinically proven for dental use"],
      composition: "Lignocaine Hydrochloride IP 24.64mg + Adrenaline Bitartrate IP 0.0125mg + Methyl paraben IP 1.0mg",
      buyLink: "https://www.iesapharma.com/search/all?name=Orobloc"
    },
    {
      id: "osf-band",
      name: "OSF Band Softgel Capsules",
      category: "Other",
      subtitle: "Lycopene, Betacarotene, Selenium, Zinc & Antioxidants",
      desc: "A complete antioxidant combination that works at the cellular level to reduce oxidative stress and boost oral healing.",
      image: "images/osf-band-promo.png",
      primaryUse: "Adjunctive therapy for periodontal inflammation, post-operative healing, oral lichen planus, and leukoplakia.",
      size: "10x10 Softgel Capsules",
      benefits: ["Reduces gingival inflammation", "Accelerates wound healing post-surgery", "Antioxidant protection for gum tissue", "Supports immune defense"],
      composition: "Lycopene (5mg) + Beta Carotene (10mg) + Selenium (75mcg) + Zinc (27.5mg) + Copper (1mg) + Alpha Lipoic Acid (50mg) + Vitamin E (10IU)",
      buyLink: "https://www.iesapharma.com/search/all?name=OSF-Band"
    },
    {
      id: "iesa-guard",
      name: "IesaGuard Gloves",
      category: "Other",
      subtitle: "Premium Latex Examination Gloves",
      desc: "Latex medical examination gloves.",
      image: "images/iesa-guard-gloves.jpg",
      primaryUse: "Maximum protection and grip for clinical procedures.",
      size: "Box of 100",
      benefits: ["Excellent tactile sensitivity", "Micro-roughened surface", "Powder-free option", "High tear resistance"],
      buyLink: "https://www.iesapharma.com/search/all?name=IesaGuard"
    },
    {
      id: "protiesa",
      name: "Protiesa Protein Powder",
      category: "Other",
      subtitle: "High-Quality Nutritional Supplement",
      desc: "Proven antioxidant, quenches free radicals.",
      image: "images/protiesa-protein-powder.png",
      primaryUse: "Nutritional support for post-dental surgery recovery.",
      size: "200g Tin",
      benefits: ["Rich in essential amino acids", "Antioxidant protection", "Supports immune system", "Easy to digest"],
      buyLink: "https://www.iesapharma.com/search/all?name=Protiesa"
    },
  ];

  const testimonials = [
    {
      name: "Dr. Shivangi",
      avatar: "/images/testimonial-shivangi.jpg",
      text: "Iesa Pharma has become my go-to supplier for high-quality dental essentials, and I trust their products for my practice."
    },
    {
      name: "Dr. Arvind Chaurasia",
      avatar: "/images/testimonial-arvind.jpg",
      text: "I've noticed a significant improvement in my gum health since using this product regularly. It's a definite winner."
    }
  ];

  const logoUrl = "/images/iesa-pharma-logo.jpg";

  const valueProps = [
    { num: "01", title: "Fully Licensed", text: "Bonded and insured for every clinical partnership across the country." },
    { num: "02", title: "Best Products", text: "Latest advancements in dental technology, rigorously validated by experts." },
    { num: "03", title: "Quality Assurance", text: "Highest standards applied from raw materials to final packaging." },
    { num: "04", title: "Quickest Response", text: "Dedicated support that prioritizes your satisfaction at every step." },
  ];

  return (
    <div className="relative min-h-screen selection:bg-sky-200 overflow-x-hidden">
      {/* Top Banner Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[60]"></div>

      <Scene onBottleClick={() => setSelectedProduct(products[0])} />

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12"
            onClick={() => setSelectedProduct(null)}
          >
            {/* Modal Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white shadow-2xl w-full max-w-5xl max-h-[95dvh] rounded-[2rem] overflow-hidden relative flex flex-col md:flex-row z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 backdrop-blur-md hover:bg-slate-200 border border-slate-200 rounded-full flex items-center justify-center transition-colors z-20 shadow-sm"
              >
                <X size={20} className="text-slate-600" />
              </button>

              {/* LEFT: Big Product Image with Magnifier */}
              <div className="w-full md:w-[55%] bg-gradient-to-br from-slate-50 to-slate-100 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 h-[35vh] md:min-h-[450px] shrink-0 overflow-hidden">
                <ProductImage
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />
              </div>

              {/* RIGHT: Product Details (Scrollable) */}
              <div className="w-full md:w-[45%] overflow-y-auto flex flex-col custom-scrollbar bg-white" style={{ maxHeight: '100%' }}>
                <div className="p-4 sm:p-10 flex-grow">
 
                   <h2 className="text-2xl sm:text-5xl font-bold text-slate-900 mb-1 sm:mb-4">{selectedProduct.name}</h2>
                   <p className="text-sm sm:text-xl text-slate-500 mb-4 sm:mb-8 leading-tight">{selectedProduct.subtitle}</p>
 
                   <div className="space-y-3 sm:space-y-6 mb-6 sm:mb-10">
                     <div className="flex gap-3 sm:gap-4 p-3 sm:p-5 bg-sky-50 rounded-xl sm:rounded-2xl border border-sky-100">
                       <Info className="text-sky-600 shrink-0" size={20} />
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs sm:text-base">Primary Use</h4>
                        <p className="text-slate-600 text-[11px] sm:text-sm line-clamp-2">{selectedProduct.primaryUse}</p>
                      </div>
                    </div>

                    {selectedProduct.composition && (
                      <div className="flex gap-3 sm:gap-4 p-3 sm:p-5 bg-emerald-50 rounded-xl sm:rounded-2xl border border-emerald-100">
                        <Beaker className="text-emerald-600 shrink-0" size={20} />
                        <div>
                          <h4 className="font-bold text-slate-800 text-xs sm:text-base">Composition</h4>
                          <p className="text-emerald-700 text-[11px] sm:text-sm font-medium line-clamp-1 italic">{selectedProduct.composition}</p>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="p-3 sm:p-5 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                        <Droplet className="text-sky-500 mb-2 sm:mb-3" size={20} />
                        <h4 className="font-bold text-slate-800 text-xs sm:text-base line-clamp-1">{selectedProduct.size}</h4>
                        <p className="text-slate-500 text-[10px] sm:text-xs">Packaging</p>
                      </div>
                      <div className="p-3 sm:p-5 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                        <Shield className="text-sky-500 mb-2 sm:mb-3" size={20} />
                        <h4 className="font-bold text-slate-800 text-xs sm:text-base">Quality</h4>
                        <p className="text-slate-500 text-[10px] sm:text-xs">Verified</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg">
                      Key Benefits
                    </h3>
                    <ul className="space-y-4 mb-10">
                      {selectedProduct.benefits.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-slate-600">
                          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {selectedProduct.id === 'periogum-plus' && (
                      <>
                        <button
                          onClick={() => window.open(selectedProduct.buyLink, '_blank')}
                          className="w-full py-3 sm:py-4 bg-white border-2 border-red-100 text-slate-800 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:shadow-xl hover:border-red-200 transition-all active:scale-95 flex items-center justify-center gap-2 sm:gap-3 group"
                        >
                          Buy on
                          <img src="/images/tata-1mg-logo.png" alt="Tata 1mg" className="h-5 sm:h-6 object-contain group-hover:scale-105 transition-transform" />
                        </button>

                        <button
                          onClick={() => window.open('https://www.meesho.com/IESAPHARMACEUTICALS?ms=2', '_blank')}
                          className="w-full py-3 sm:py-4 bg-white border-2 border-pink-100 text-slate-800 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:shadow-xl hover:border-pink-200 transition-all active:scale-95 flex items-center justify-center gap-2 sm:gap-3 group"
                        >
                          Buy on
                          <img src="/images/meesho-logo.png" alt="Meesho" className="h-6 sm:h-7 rounded-md object-contain group-hover:scale-105 transition-transform" />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => window.open('https://wa.me/918299378737', '_blank')}
                      className="w-full py-3 sm:py-4 bg-[#25D366] text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:shadow-xl hover:bg-[#1ebd5a] transition-all active:scale-95 flex items-center justify-center gap-2 sm:gap-3 group"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                      Order on WhatsApp
                    </button>
 
                    {selectedProduct.id === 'periogum-plus' && (
                      <button className="w-full py-3 sm:py-4 border-2 border-slate-100 text-slate-600 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                        Request Sample
                      </button>
                    )}
                  </div>
                </div>

                {/* Footer of Modal */}
                <div className="mt-auto p-5 sm:p-8 bg-slate-50 border-t border-slate-100 italic text-slate-400 text-sm shrink-0">
                  Manufactured by Iesa Pharma Dental Products. For dental professional use only.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setActiveCategory(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src={logoUrl} alt="Iesa Pharma Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveCategory(null)}
              className={`hover:text-emerald-500 transition-colors ${!activeCategory ? 'text-emerald-600 font-bold' : ''}`}
            >
              Home
            </button>
            <a href="#about" className="hover:text-emerald-500 transition-colors">About</a>

            <div
              className="relative group"
              onMouseEnter={() => setShowProductDropdown(true)}
              onMouseLeave={() => setShowProductDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 hover:text-emerald-500 transition-colors py-2 ${activeCategory ? 'text-emerald-600 border-b-2 border-emerald-500 font-bold' : ''}`}
              >
                Products <ChevronDown size={14} />
              </button>

              <AnimatePresence>
                {showProductDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-48 bg-white shadow-xl border border-slate-100 py-4 mt-0 overflow-hidden rounded-b-lg border-t-2 border-t-emerald-500"
                  >
                    {["Mouthwash", "Gum Paint", "Oral Gel", "Tablets", "Other"].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setActiveCategory(item);
                          setShowProductDropdown(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`block w-full text-left px-6 py-2 hover:bg-slate-50 hover:text-emerald-500 transition-colors ${activeCategory === item ? 'text-emerald-600 bg-emerald-50/50 font-bold' : ''}`}
                      >
                        {item}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


            <a href="#contact" className="hover:text-emerald-500 transition-colors">Contact</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-6 py-8 space-y-6 flex flex-col">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`text-lg font-bold text-left ${!activeCategory ? 'text-emerald-600' : 'text-slate-600'}`}
                >
                  Home
                </button>
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Products</p>
                  <div className="grid grid-cols-2 gap-4">
                    {["Mouthwash", "Gum Paint", "Oral Gel", "Tablets", "Other"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setActiveCategory(item)}
                        className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${activeCategory === item ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-600'}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-lg font-bold text-slate-600">
                  <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="py-2">About</a>

                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2">Contact</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Areas */}
      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <section className="relative min-h-[90vh] lg:min-h-screen w-full pb-32 pt-32 lg:py-0 flex flex-col lg:flex-row items-end lg:items-center overflow-hidden">

              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-end lg:items-center relative z-10 py-8 pb-12 lg:py-0">
                {/* On mobile: glass card wraps the text so it's readable over the 3D scene */}
                <div className="lg:contents">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center bg-white/70 backdrop-blur-md lg:backdrop-blur-none rounded-3xl lg:rounded-none p-6 sm:p-8 lg:p-0 shadow-xl shadow-slate-200/40 lg:shadow-none border border-white/60 lg:border-none"
                  >

                    <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-slate-900 leading-[0.95] mb-5 sm:mb-8 tracking-tighter">
                      <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Dental Care</motion.span> <br />
                      <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-emerald-600">Reimagined.</motion.span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-slate-500 mb-8 sm:mb-12 max-w-lg mx-auto leading-relaxed">
                      Clinical-grade oral health solutions trusted by thousands of professionals.
                    </p>

                    <div className="inline-flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
                      <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-3 sm:gap-4 md:gap-6">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.open('https://www.1mg.com/marketer/iesa-pharmaceutical-pvt-ltd-88356', '_blank')}
                          className="w-full xs:w-auto px-5 sm:px-8 py-3 sm:py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold text-sm sm:text-lg hover:border-slate-300 transition-all flex items-center justify-center gap-2 sm:gap-3 group whitespace-nowrap"
                        >
                          See us on <img src="/images/tata-1mg-logo.png" alt="Tata 1mg" className="h-6 sm:h-7 object-contain" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.open('https://www.meesho.com/IESAPHARMACEUTICALS?ms=2', '_blank')}
                          className="w-full xs:w-auto px-5 sm:px-8 py-3 sm:py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold text-sm sm:text-lg hover:border-slate-300 transition-all flex items-center justify-center gap-2 sm:gap-3 group whitespace-nowrap"
                        >
                          See us on <img src="/images/meesho-logo.png" alt="Meesho" className="h-7 sm:h-8 rounded-md object-contain" />
                        </motion.button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.open('https://wa.me/918299378737', '_blank')}
                        className="w-full px-5 sm:px-8 py-3 sm:py-4 bg-[#25D366] text-white rounded-xl font-bold text-sm sm:text-lg hover:bg-[#1ebd5a] transition-all flex items-center justify-center gap-2 sm:gap-3 group whitespace-nowrap shadow-lg shadow-green-500/20"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                        WhatsApp Us
                      </motion.button>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 group cursor-pointer">
                      <div className="flex -space-x-3">
                        {testimonials.map((t, i) => (
                          <motion.div
                            key={i}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                          >
                            <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="flex justify-center sm:justify-start gap-0.5 text-amber-400">
                          {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <p className="text-sm font-bold text-slate-700">500+ Verified Surgeons</p>
                      </div>
                    </div>
                  </motion.div>
                </div>


                {/* Desktop: empty column — the fixed 3D scene fills this visually */}
                <div className="relative h-[400px] lg:h-[600px] items-center justify-center pointer-events-none hidden lg:flex">
                </div>
              </div>
              {/* Bottom fade so model doesn't bleed into next section on mobile */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent lg:hidden pointer-events-none" />
            </section>

            {/* Vision Section */}
            <section id="about" className="min-h-[60vh] lg:min-h-screen w-full py-16 flex items-center justify-center px-4 sm:px-6 bg-white/40 backdrop-blur-2xl relative z-10 border-y border-white/20">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="text-4xl sm:text-6xl font-bold mb-8 sm:mb-12">Our Vision</h2>
                  <p className="text-xl sm:text-4xl text-slate-600 leading-relaxed italic font-medium px-4">
                    "At Iesa Pharma Dental Products, our vision is to revolutionize oral healthcare by providing innovative, high-quality dental products that empower individuals to achieve and maintain optimal oral health."
                  </p>
                  <div className="w-20 h-1 bg-sky-500 mx-auto mt-6 sm:mt-8 rounded-full"></div>

                  {/* Founder Profile */}
                  <div className="mt-16 sm:mt-24 flex flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative group"
                    >
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-full border-4 border-white overflow-hidden shadow-2xl">
                        <img src="/images/founder.jpg" alt="Founder of Iesa Pharma" className="w-full h-full object-cover" />
                      </div>
                    </motion.div>
                    <div className="mt-6 sm:mt-8 text-center">
                      <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Our Founder</h4>
                      <p className="text-sm sm:text-lg text-emerald-600 font-bold uppercase tracking-[0.2em] mt-2">Iesa Pharma Visionary</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <LandingAccordionItem items={products} />

            {/* Promotional Banner */}
            <section className="min-h-[60vh] lg:min-h-screen w-full py-16 flex items-center justify-center relative z-10 bg-white">
              <div className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden bg-slate-950 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-y border-white/5"
                >
                  {/* Background Polish */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/30" />

                  <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 items-center">
                    {/* Left Content */}
                    <div className="p-8 sm:p-12 md:p-16 lg:p-20 space-y-6 sm:space-y-8 relative z-10">


                      <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.85] uppercase tracking-tighter">
                        SAY GOODBYE <br />
                        TO <br />
                        <span className="text-emerald-500 text-6xl sm:text-8xl md:text-9xl block mt-2">BAD BREATH</span>
                      </h2>

                      <p className="text-slate-400 text-lg sm:text-xl max-w-md leading-relaxed">
                        Experience clinical-grade freshness with Periogum Plus. The #1 recommendation by top Indian dentists.
                      </p>
                    </div>

                    {/* Right Content / Visuals */}
                    <div className="relative h-full min-h-[300px] lg:min-h-[400px] flex items-center justify-center p-8 lg:p-20 overflow-hidden">
                      {/* Background Bottle Graphic */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                        <img src="/images/periogum-plus.png" className="h-[120%] w-auto object-contain rotate-12 scale-110" alt="" />
                      </div>

                      <div className="relative z-10 flex flex-col items-center gap-8">
                        {/* Floating Discount Circle */}
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex flex-col items-center justify-center text-white shadow-2xl"
                        >
                          <span className="text-4xl sm:text-5xl font-black">50%</span>
                          <span className="text-xs font-black uppercase tracking-widest opacity-60">OFF</span>
                        </motion.div>

                        {/* Buy Button */}
                        <div className="flex flex-col gap-3 w-full sm:w-auto">
                          <button
                            onClick={() => window.open('https://www.1mg.com/otc/periogum-plus-mouthwash-100ml-each-otc894806', '_blank')}
                            className="group bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-lg sm:text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-2xl hover:shadow-emerald-500/20"
                          >
                            <span className="text-slate-500 text-base font-bold">BUY ON</span>
                            <img src="/images/tata-1mg-logo.png" alt="Tata 1mg" className="h-6 object-contain ml-1 group-hover:scale-105 transition-transform" />
                          </button>

                          <button
                            onClick={() => window.open('https://www.meesho.com/IESAPHARMACEUTICALS?ms=2', '_blank')}
                            className="group bg-white px-8 py-4 rounded-2xl font-black text-lg sm:text-xl text-slate-950 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-2xl hover:shadow-pink-500/20 w-full"
                          >
                            <span className="text-slate-500 text-base font-bold">BUY ON</span>
                            <img src="/images/meesho-logo.png" alt="Meesho" className="h-8 rounded-md object-contain ml-1 group-hover:scale-105 transition-transform" />
                          </button>


                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Light Leak */}
                  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
                </motion.div>
              </div>
              {/* Scroll Indicator */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20 group">
                <div className="w-10 h-1.5 bg-slate-400 rounded-full" />
              </div>
            </section>

            {/* Catalog - Product Grid */}
            <section id="products" className="min-h-[60vh] lg:min-h-screen w-full py-12 lg:py-24 flex items-center px-4 sm:px-6 bg-white relative z-10 overflow-hidden">
              <div className="max-w-7xl mx-auto relative">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="flex items-end justify-between mb-10 sm:mb-16"
                >
                  <div>
                    <h2 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4">Product Catalog</h2>
                    <p className="text-slate-500 max-w-md text-sm sm:text-base">Precision formulated solutions for every dental requirement.</p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10">
                  {products.map((product, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.1,
                        type: "spring",
                        damping: 20
                      }}
                      whileHover={{ y: -10 }}
                      onClick={() => setSelectedProduct(product)}
                      className="group bg-white border border-slate-200 rounded-2xl sm:rounded-[2rem] hover:border-emerald-200 transition-all hover:shadow-xl overflow-hidden flex flex-col h-full cursor-pointer"
                    >
                      <div className="aspect-square w-full overflow-hidden bg-slate-50 relative">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-2 sm:p-4"
                          whileHover={{ scale: 1.15, y: -12 }}
                          whileTap={{ scale: 1.25, rotate: 2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />

                      </div>
                      <div className="p-4 sm:p-8 flex flex-col flex-grow">
                        <h3 className="text-sm sm:text-xl font-bold mb-1 sm:mb-2 text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{product.name}</h3>

                        {product.composition && (
                          <p className="text-[10px] sm:text-xs font-bold text-emerald-600 mb-3 line-clamp-2 italic">
                            {product.composition}
                          </p>
                        )}

                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 flex-grow">{product.desc}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Medical Grade</span>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="text-slate-400 group-hover:text-emerald-500 transition-colors cursor-pointer"
                          >
                            <ChevronRight size={20} />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Choose Us - Minimal Layout */}
            <section id="why-us" className="min-h-[60vh] lg:min-h-screen w-full py-16 sm:py-24 bg-slate-950 text-white relative z-10 flex flex-col justify-center">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
              <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-10">

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="mb-20 sm:mb-32 max-w-3xl"
                >
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">Our Strengths</p>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-10 text-white">
                    Clinical precision, made accessible without compromise.
                  </h2>
                  <div className="h-px w-24 bg-white/20"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-24 sm:mb-32">
                  {valueProps.map((prop, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.8 }}
                      className="flex flex-col"
                    >
                      <h3 className="text-xl font-medium mb-4 text-white">{prop.title}</h3>
                      <p className="text-slate-400 text-base leading-relaxed">{prop.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Metrics & Trust row - super minimal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="flex flex-col md:flex-row md:items-end justify-between gap-12 pt-16 border-t border-white/10"
                >
                  <div className="flex gap-12 sm:gap-20">
                    <div>
                      <div className="text-4xl font-medium text-white mb-2">500+</div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Surgeons</div>
                    </div>
                    <div>
                      <div className="text-4xl font-medium text-white mb-2">100%</div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">GMP Certified</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 sm:gap-6 text-sm font-medium text-slate-500">
                    <span>Licensed & Bonded</span>
                    <span className="hidden sm:inline text-slate-700">&middot;</span>
                    <span>ISO Certified</span>
                    <span className="hidden sm:inline text-slate-700">&middot;</span>
                    <span>Pan-India Delivery</span>
                  </div>
                </motion.div>

              </div>
            </section>

            {/* Testimonials */}
            <section className="min-h-[60vh] lg:min-h-screen w-full py-16 flex items-center justify-center px-4 sm:px-6 bg-white relative z-10">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16">Trusted Testimonials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
                    {testimonials.map((t, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="p-6 sm:p-10 bg-slate-50 rounded-2xl sm:rounded-3xl relative"
                      >
                        <Star className="text-yellow-400 fill-current mb-6" size={24} />
                        <p className="text-base sm:text-xl text-slate-700 italic mb-6 sm:mb-8">
                          "{t.text}"
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200">
                            <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="font-bold text-slate-900">{t.name}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 min-h-screen bg-white relative z-10"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-16">
                <button
                  onClick={() => setActiveCategory(null)}
                  className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-6 font-medium group"
                >
                  <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Home
                </button>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div>
                    <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">{activeCategory}</h2>
                    <p className="text-base sm:text-xl text-slate-500 max-w-2xl leading-relaxed">
                      Explore our premium range of {activeCategory.toLowerCase()} solutions, clinically formulated for professional dental care.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100">
                    <CheckCircle2 size={16} /> Pharmaceutical Grade
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
                {products
                  .filter(p => p.category === activeCategory)
                  .map((product, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-slate-50 rounded-2xl sm:rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col h-full"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-white">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                        />

                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-sm sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
                          {product.name}
                        </h3>

                        {product.composition && (
                          <p className="text-xs font-bold text-emerald-600 mb-4 italic">
                            {product.composition}
                          </p>
                        )}

                        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                          {product.desc}
                        </p>
                        <div className="pt-6 border-t border-slate-200/60 flex items-center justify-between">
                          <span className="text-[10px] font-black tracking-widest text-emerald-600 uppercase">Medical Grade</span>
                          <button
                            className="flex items-center gap-2 text-slate-900 font-bold text-sm tracking-tight group/btn"
                            onClick={() => setSelectedProduct(product)}
                          >
                            Explore Details <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>

              {products.filter(p => p.category === activeCategory).length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-slate-400 text-lg">No products found in this category.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map and Contact Form Section */}
      <section id="contact" className="min-h-[60vh] lg:min-h-screen w-full py-12 lg:py-24 flex items-center px-4 sm:px-6 bg-slate-950 relative z-10 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tighter text-white">
              Get in <span className="text-emerald-500">Touch</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto">
              Have questions about our clinical formulations? Our professional team is here to assist you with any inquiries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

            {/* Contact Details Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="p-7 sm:p-10 bg-slate-900/50 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 h-full shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-10 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                  Contact Info
                </h3>

                <div className="space-y-10">
                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 shadow-sm border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-500 group-hover:scale-110">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-emerald-500 mb-1">Email Us</p>
                      <a href="mailto:info@www.iesapharma.com" className="text-lg font-bold text-white hover:text-emerald-400 transition-colors">info@www.iesapharma.com</a>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 shadow-sm border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-500 group-hover:scale-110">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-emerald-500 mb-1">Visit Office</p>
                      <p className="text-lg font-bold text-white leading-tight">
                        Shop no 4, Mariyam Plaza, <br />Indiranagar, Lucknow
                      </p>
                      <p className="text-slate-400 text-sm mt-1 font-medium">Uttar Pradesh 226016</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 shadow-sm border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-500 group-hover:scale-110">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-emerald-500 mb-1">Call Anywhere</p>
                      <p className="text-lg font-bold text-white">082993 78737</p>
                      <p className="text-slate-400 text-sm mt-1 font-medium">Mon - Sat, 9am - 6pm</p>
                    </div>
                  </div>

                  <div
                    className="flex gap-6 group cursor-pointer"
                    onClick={() => window.open('https://wa.me/918299378737', '_blank')}
                  >
                    <div className="w-14 h-14 bg-[#25D366]/10 rounded-2xl flex items-center justify-center text-[#25D366] shadow-sm border border-[#25D366]/20 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366] transition-all duration-500 group-hover:scale-110">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-[#25D366] mb-1">WhatsApp Us</p>
                      <p className="text-lg font-bold text-white">082993 78737</p>
                      <p className="text-slate-400 text-sm mt-1 font-medium">Instant Response</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Message Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="p-6 sm:p-10 bg-slate-900/50 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-10 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-8 bg-sky-500 rounded-full" />
                  Message Us
                </h3>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                      <input type="text" placeholder="John" className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-white placeholder-slate-600" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Name</label>
                      <input type="text" placeholder="Doe" className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-white placeholder-slate-600" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-white placeholder-slate-600" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Message</label>
                    <textarea rows={4} placeholder="How can we help you?" className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-white placeholder-slate-600 resize-none"></textarea>
                  </div>

                  <button className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-emerald-500 active:scale-[0.98] transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 group">
                    Send Message
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 h-full"
            >
              <div className="p-4 bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl h-full flex flex-col">
                <div className="relative rounded-[2rem] overflow-hidden flex-grow aspect-[3/4] lg:aspect-auto">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.121654165!2d80.9859!3d26.8859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUzJzA5LjIiTiA4MMKwNTknMDkuMiJF!5e0!3m2!1sen!2sin!4v1690789000000!5m2!1sen!2sin"
                    className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-700"
                    allowFullScreen
                    loading="lazy"
                    title="Office Map"
                  ></iframe>

                  <div className="absolute bottom-6 left-6 right-6">
                    <a
                      href="https://maps.google.com/?q=Mariyam+Plaza+Lucknow"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white font-black rounded-2xl text-sm shadow-2xl hover:bg-emerald-500 transition-all group"
                    >
                      <MapPin size={18} /> Open in Maps
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-white mb-2">Iesa Pharma HQ</h4>
                  <p className="text-slate-400 text-sm font-medium">Located in the heart of Lucknow's medical district.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-14 sm:py-20 px-4 sm:px-6 bg-slate-900 border-t border-white/5 relative z-10 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-12 text-center md:text-left">
            <div className="max-w-sm">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
                <img src={logoUrl} alt="Iesa Pharma Logo" className="h-10 w-auto invert grayscale contrast-200 mix-blend-screen" />
              </div>
              <p className="text-slate-400 mb-8">
                Aspiring to become a leading global platform, facilitating easy access to a comprehensive range of dental solutions.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                {['Twitter', 'LinkedIn', 'Facebook'].map(social => (
                  <div key={social} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-400 transition-all cursor-pointer">
                    <Shield size={18} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Experience</p>
              <p className="text-4xl font-black text-white">10+ Years</p>
              <p className="text-slate-400">Of Professional Service</p>
            </div>

          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <p>© {new Date().getFullYear()} Iesa Pharma Dental Products. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918299378737"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100] w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(37,211,102,0.8)] hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
      </a>
    </div>
  );
}
