import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Shield, Clock, Award, Star, MapPin, Phone, Mail, ChevronRight, X, Info, Beaker, CheckCircle2, ChevronDown, ShoppingCart, Percent, Menu } from 'lucide-react';
import { Scene } from './components/Scene';

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
    { 
      id: "periogum-plus",
      name: "Periogum Plus", 
      category: "Mouthwash",
      subtitle: "Chlorhexidine Gluconate Solution I.P. 0.2% w/v",
      desc: "Prevents the formation of dental plaques.",
      image: "/images/periogum-plus.png",
      primaryUse: "Effective against gingivitis, plaque formation, and maintenance of oral hygiene.",
      size: "150 ml",
      benefits: ["Kills 99.9% of oral bacteria", "Reduces gum inflammation", "Prevents bleeding symptoms", "Long-lasting fresh breath"],
      buyLink: "https://www.1mg.com/otc/periogum-plus-mouthwash-100ml-each-otc894806"
    },
    { 
      id: "periogum-mw",
      name: "Periogum Mouthwash", 
      category: "Mouthwash",
      subtitle: "Daily Oral Rinse for Gum Care",
      desc: "For gingivitis and maintenance of oral hygiene.",
      image: "/images/periogum-mouthwash.jpg",
      primaryUse: "Broad spectrum anti-microbial protection for clinical dental health.",
      size: "100 ml",
      benefits: ["Prevents gum recession", "Gentle on sensitive tissues", "Alcohol-free formula", "Clinically proven efficacy"],
      buyLink: "https://www.1mg.com/otc/periogum-plus-mouthwash-100ml-each-otc894806"
    },
    { 
      id: "morepep-sp",
      name: "Morepep-SP Tablets", 
      category: "Other",
      subtitle: "Anti-inflammatory & Analgesic Relief",
      desc: "Listed under general products",
      image: "/images/morepep-sp-tablets.jpeg",
      primaryUse: "Relief from inflammation and pain associated with dental procedures.",
      size: "10 Tablets",
      benefits: ["Fast-acting formula", "Reduces swelling", "Post-surgical recovery support", "Professional strength"],
      buyLink: "https://www.iesapharma.com/search/all?name=Morepep-SP"
    },
    { 
      id: "lignowin",
      name: "LignoWin Mouth Ulcer Gel", 
      category: "Oral Gel",
      subtitle: "Fast-acting Pain Relief Gel",
      desc: "Fast relief from pain due to mouth ulcers.",
      image: "/images/lignowin-gel.png",
      primaryUse: "Soothing relief for mouth ulcers and oral lesions.",
      size: "10g Tube",
      benefits: ["Instant numbing effect", "Promotes faster healing", "Forms protective layer", "Sugar-free gel base"],
      buyLink: "https://www.1mg.com/search/all?name=Lignowin"
    },
    { 
      id: "orogum-gp",
      name: "Orogum Gum Paint", 
      category: "Gum Paint",
      subtitle: "Advanced Relief for Bleeding Gums",
      desc: "A touch of relief for bleeding gums.",
      image: "/images/orogum-gum-paint.png",
      primaryUse: "Direct application for swollen, spongy, and receding gums.",
      size: "15 ml",
      benefits: ["Stops gum bleeding instantly", "Tightens loose gums", "Antiseptic action", "Localized clinical treatment"],
      buyLink: "https://www.iesapharma.com/search/all?name=Orogum"
    },
    { 
      id: "iesa-guard",
      name: "IesaGuard Gloves", 
      category: "Other",
      subtitle: "Premium Latex Examination Gloves",
      desc: "Latex medical examination gloves.",
      image: "/images/iesa-guard-gloves.jpg",
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
      image: "/images/protiesa-protein-powder.png",
      primaryUse: "Nutritional support for post-dental surgery recovery.",
      size: "200g Tin",
      benefits: ["Rich in essential amino acids", "Antioxidant protection", "Supports immune system", "Easy to digest"],
      buyLink: "https://www.iesapharma.com/search/all?name=Protiesa"
    },
    { 
      id: "orogum-t",
      name: "Orogum T", 
      category: "Gum Paint",
      subtitle: "Therapeutic Solution for Receding Gums",
      desc: "For bleeding, swollen, spongy, and receding/loose gums.",
      image: "/images/orogum-t.jpg",
      primaryUse: "Targeted therapy for chronic gum issues and tissue maintenance.",
      size: "15 ml",
      benefits: ["Closes interdental gaps", "Strengthens periodontal bond", "Reduces tooth mobility", "Clinical precision formula"],
      buyLink: "https://www.iesapharma.com/search/all?name=Orogum-T"
    }
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
    { icon: <Shield size={24} />, title: "Fully Licensed", text: "Bonded, And Insured" },
    { icon: <Award size={24} />, title: "Best Products", text: "Latest advancements in dental technology." },
    { icon: <Star size={24} />, title: "Quality Assurance", text: "Highest standards from raw materials." },
    { icon: <Clock size={24} />, title: "Quickest Response", text: "Prioritizing customer satisfaction." },
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
            className="fixed inset-0 z-[100] flex items-end sm:items-center sm:justify-end sm:p-6 md:p-12"
            onClick={() => setSelectedProduct(null)}
          >
            {/* Modal Backdrop */}
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
            
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white shadow-2xl w-full h-[92dvh] sm:h-full sm:max-w-lg lg:max-w-xl sm:rounded-t-none rounded-t-[2rem] sm:rounded-l-[2.5rem] overflow-y-auto relative border-t sm:border-t-0 sm:border-l border-slate-100 flex flex-col z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle for mobile */}
              <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 bg-slate-200 rounded-full" />
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X size={20} className="text-slate-600" />
              </button>

              <div className="p-5 sm:p-10 pt-12 sm:pt-20">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  <Beaker size={14} /> Clinical Formulation
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">{selectedProduct.name}</h2>
                <p className="text-base sm:text-xl text-slate-500 mb-6 sm:mb-8">{selectedProduct.subtitle}</p>

                <div className="space-y-6 mb-10">
                  <div className="flex gap-4 p-5 bg-sky-50 rounded-2xl border border-sky-100">
                    <Info className="text-sky-600 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-slate-800">Primary Use</h4>
                      <p className="text-slate-600 text-sm">{selectedProduct.primaryUse}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <Droplet className="text-sky-500 mb-3" size={24} />
                      <h4 className="font-bold text-slate-800">{selectedProduct.size}</h4>
                      <p className="text-slate-500 text-xs text-nowrap">Standard Packaging</p>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <Shield className="text-sky-500 mb-3" size={24} />
                      <h4 className="font-bold text-slate-800">Quality Verified</h4>
                      <p className="text-slate-500 text-xs text-nowrap">Patient Friendly</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg">
                  Key Benefits
                </h3>
                <ul className="space-y-4 mb-10">
                  {selectedProduct.benefits.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => window.open(selectedProduct.buyLink, '_blank')}
                  className="w-full py-5 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-3 group mb-4"
                >
                  <ShoppingCart size={22} className="group-hover:animate-bounce" />
                  Buy on Tata 1mg
                </button>
                
                <button className="w-full py-4 border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  Request Sample
                </button>
              </div>

              {/* Backdrop Blur effect for footer of the modal */}
              <div className="mt-auto p-5 sm:p-10 bg-slate-50 border-t border-slate-100 italic text-slate-400 text-sm">
                Manufactured by Iesa Pharma Dental Products. For dental professional use only.
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
                    {["Mouthwash", "Gum Paint", "Oral Gel", "Other"].map((item) => (
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

            <a href="#gallery" className="hover:text-emerald-500 transition-colors">Gallery</a>
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
                    {["Mouthwash", "Gum Paint", "Oral Gel", "Other"].map((item) => (
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
                  <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="py-2">Gallery</a>
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
            <section className="relative min-h-[100svh] flex flex-col lg:flex-row items-end lg:items-center pt-20 overflow-hidden">
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-end lg:items-center relative z-10 py-8 pb-12 lg:py-0">
          {/* On mobile: glass card wraps the text so it's readable over the 3D scene */}
          <div className="lg:contents">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left lg:bg-transparent bg-white/70 backdrop-blur-md lg:backdrop-blur-none rounded-3xl lg:rounded-none p-6 sm:p-8 lg:p-0 shadow-xl shadow-slate-200/40 lg:shadow-none border border-white/60 lg:border-none"
          >
            
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-slate-900 leading-[0.95] mb-5 sm:mb-8 tracking-tighter">
              Dental Care <br/>
              <span className="text-emerald-600">Reimagined.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-500 mb-8 sm:mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Clinical-grade oral health solutions trusted by thousands of professionals.
            </p>
            
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full xs:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-slate-900 text-white rounded-xl font-bold text-base sm:text-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group whitespace-nowrap"
              >
                View Catalog <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://www.1mg.com/marketer/iesa-pharmaceutical-pvt-ltd-88356', '_blank')}
                className="w-full xs:w-auto px-5 sm:px-8 py-4 sm:py-5 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold text-sm sm:text-lg hover:border-slate-300 transition-all flex items-center justify-center gap-2 sm:gap-3 group whitespace-nowrap"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                  <ShoppingCart size={14} />
                </div>
                See us on <span className="text-red-600 font-black tracking-tight">TATA 1mg</span>
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
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
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
      <section id="about" className="py-14 sm:py-24 px-4 sm:px-6 bg-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-8">Our Vision</h2>
            <p className="text-lg sm:text-2xl text-slate-600 leading-relaxed italic">
              "At Iesa Pharma Dental Products, our vision is to revolutionize oral healthcare by providing innovative, high-quality dental products that empower individuals to achieve and maintain optimal oral health."
            </p>
            <div className="w-20 h-1 bg-sky-500 mx-auto mt-6 sm:mt-8 rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="px-3 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-slate-900 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 opacity-90" />
            <div className="relative px-6 py-10 sm:px-8 sm:py-14 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="space-y-4 sm:space-y-6 max-w-2xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-500 text-white rounded-full text-sm font-bold">
                  <Percent size={14} /> Flash Sale: 50% OFF
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-tight uppercase tracking-tighter">
                  Say Goodbye to <br/><span className="text-emerald-400">Bad Breath</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-lg">Experience clinical-grade freshness with Periogum Plus. The #1 recommendation by top Indian dentists.</p>
              </div>

              <div className="flex flex-row md:flex-col items-center gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center p-2 shrink-0">
                  <div className="w-full h-full bg-emerald-50 rounded-full flex flex-col items-center justify-center text-emerald-600 leading-none">
                    <span className="text-xl sm:text-3xl font-black">50%</span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase">OFF</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => window.open('https://www.1mg.com/otc/periogum-plus-mouthwash-100ml-each-otc894806', '_blank')}
                  className="px-5 sm:px-10 py-3 sm:py-5 bg-white text-slate-900 rounded-2xl font-black text-sm sm:text-xl hover:bg-emerald-400 transition-all shadow-xl shadow-white/10 flex items-center gap-2 sm:gap-4 group"
                >
                  <span className="text-red-600 font-black">BUY ON</span>
                  <span className="tracking-widest">TATA 1MG</span>
                  <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
              
              {/* Decorative Floating Bottle Background */}
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none hidden lg:block overflow-hidden">
                 <img src="/images/periogum-plus.png" className="h-full w-auto object-cover scale-150 rotate-12 mt-20" alt="" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catalog - Product Grid */}
      <section id="products" className="py-14 sm:py-24 px-4 sm:px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-end justify-between mb-10 sm:mb-16">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4">Product Catalog</h2>
              <p className="text-slate-500 max-w-md text-sm sm:text-base">Precision formulated solutions for every dental requirement.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
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
                className="group bg-white border border-slate-200 rounded-[1.5rem] sm:rounded-[2rem] hover:border-emerald-200 transition-all hover:shadow-xl overflow-hidden flex flex-col h-full cursor-pointer"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-slate-50 relative">
                  <motion.img 
                    src={product.image} 
                    alt={product.name} 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-5 left-5 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-white/50 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Droplet size={24} />
                  </div>
                  
                  <div className="absolute bottom-5 left-5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-tighter text-slate-900 shadow-sm border border-white/20">
                    {product.category}
                  </div>
                  
                </div>
                <div className="p-4 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-3 text-slate-900 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3 flex-grow">{product.desc}</p>
                  
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

      {/* Why Choose Us */}
      <section id="why-us" className="py-16 sm:py-32 px-4 sm:px-6 bg-slate-950 text-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tighter"
            >
              Why Choose <span className="text-emerald-400">Iesa Pharma</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto"
            >
              Building the future of oral healthcare through innovation, precision, and unwavering quality standards.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {valueProps.map((prop, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-6 sm:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-emerald-500/10">
                  {prop.icon}
                </div>
                <h4 className="text-2xl font-bold mb-3 tracking-tight">{prop.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{prop.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 sm:mt-12 p-7 sm:p-12 bg-gradient-to-br from-sky-600 via-sky-700 to-emerald-700 rounded-[2.5rem] sm:rounded-[3.5rem] relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-4xl font-black mb-4 sm:mb-6 tracking-tight uppercase leading-tight">Competitive Pricing <br/>Without Compromise</h3>
                <p className="text-sky-50 text-base sm:text-xl leading-relaxed mb-6 sm:mb-8 font-medium">
                  We leverage advanced manufacturing processes to optimize costs, ensuring that professional-grade dental care remains accessible nationwide.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Licensed & Bonded', 'ISO Certified', 'GMP Standard'].map((tag, idx) => (
                    <div key={idx} className="px-5 py-2 bg-white/15 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black tracking-widest uppercase">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto">
                {[
                  { title: "Pure Materials", desc: "Sourced globally for extreme clinical purity." },
                  { title: "Fast Logistics", desc: "Reliable distribution network across India." }
                ].map((item, idx) => (
                  <div key={idx} className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] min-w-[240px]">
                    <div className="text-emerald-300 font-black mb-4 uppercase tracking-widest text-[10px]">Standard 0{idx + 1}</div>
                    <h5 className="font-bold text-xl mb-2">{item.title}</h5>
                    <p className="text-sky-50 opacity-70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-24 px-4 sm:px-6 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16">Trusted Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 sm:p-10 bg-slate-50 rounded-2xl sm:rounded-3xl relative">
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
              </div>
            ))}
          </div>
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
            className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 min-h-screen bg-white relative z-10"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                {products
                  .filter(p => p.category === activeCategory)
                  .map((product, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col h-full"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-white">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute top-6 left-6 px-4 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-white/20">
                          {activeCategory}
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
                          {product.name}
                        </h3>
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
      <section id="contact" className="py-16 sm:py-32 px-4 sm:px-6 bg-white relative z-10 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tighter text-slate-900"
            >
              Get in <span className="text-emerald-600">Touch</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-base sm:text-xl max-w-2xl mx-auto"
            >
              Have questions about our clinical formulations? Our professional team is here to assist you with any inquiries.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Contact Details Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="p-7 sm:p-10 bg-slate-50 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 h-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-10 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                  Contact Info
                </h3>
                
                <div className="space-y-10">
                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-emerald-500/5">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-emerald-600 mb-1">Email Us</p>
                      <a href="mailto:info@www.iesapharma.com" className="text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors">info@www.iesapharma.com</a>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-emerald-500/5">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-emerald-600 mb-1">Visit Office</p>
                      <p className="text-lg font-bold text-slate-900 leading-tight">
                        Shop no 4, Mariyam Plaza, <br/>Indiranagar, Lucknow
                      </p>
                      <p className="text-slate-500 text-sm mt-1 font-medium">Uttar Pradesh 226016</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-emerald-500/5">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-emerald-600 mb-1">Call Anywhere</p>
                      <p className="text-lg font-bold text-slate-900">082993 78737</p>
                      <p className="text-slate-500 text-sm mt-1 font-medium">Mon - Sat, 9am - 6pm</p>
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
              <div className="p-6 sm:p-10 bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                <h3 className="text-2xl font-bold text-slate-900 mb-10 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-8 bg-sky-500 rounded-full" />
                  Message Us
                </h3>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                      <input type="text" placeholder="John" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Name</label>
                      <input type="text" placeholder="Doe" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-slate-900" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-slate-900" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Message</label>
                    <textarea rows={4} placeholder="How can we help you?" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-slate-900 resize-none"></textarea>
                  </div>

                  <button className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group">
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
              <div className="p-4 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl h-full flex flex-col">
                <div className="relative rounded-[2rem] overflow-hidden flex-grow aspect-[3/4] lg:aspect-auto">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.121654165!2d80.9859!3d26.8859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUzJzA5LjIiTiA4MMKwNTknMDkuMiJF!5e0!3m2!1sen!2sin!4v1690789000000!5m2!1sen!2sin" 
                    className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                    allowFullScreen
                    loading="lazy"
                    title="Office Map"
                  ></iframe>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <a 
                      href="https://maps.google.com/?q=Mariyam+Plaza+Lucknow" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white font-black rounded-2xl text-sm shadow-2xl hover:bg-emerald-700 transition-all group"
                    >
                      <MapPin size={18} /> Open in Maps
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-slate-900 mb-2">Iesa Pharma HQ</h4>
                  <p className="text-slate-500 text-sm font-medium">Located in the heart of Lucknow's medical district.</p>
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
                <img src={logoUrl} alt="Iesa Pharma Logo" className="h-10 w-auto invert brightness-0" />
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

    </div>
  );
}
