import { useEffect, useRef } from "react"
import { useInView } from "motion/react"
import { motion } from "motion/react"
import { TextRotate, TextRotateRef } from "./components/ui/text-rotate"

const productItems = [
  { image: "/images/periogum-plus.png",            name: "Periogum Plus",        subtitle: "Antibacterial Mouthwash",        category: "Mouthwash" },
  { image: "/images/periogum-mouthwash.jpg",        name: "Periogum Mouthwash",   subtitle: "Daily Gum Care Rinse",           category: "Mouthwash" },
  { image: "/images/periogum-bz-pdf.jpeg",          name: "Periogum BZ",          subtitle: "Anti-inflammatory Mouth Wash",   category: "Mouthwash" },
  { image: "/images/periogum-kf-pdf.jpeg",          name: "PerioGum KF",          subtitle: "For Sensitive Teeth & Gum",      category: "Mouthwash" },
  { image: "/images/lignowin-gel.png",              name: "LignoWin Gel",         subtitle: "Fast-acting Ulcer Relief",       category: "Oral Gel"  },
  { image: "/images/lignowin-m-gel-pdf.jpeg",       name: "Lignowin M Gel",       subtitle: "Triple Action Antiseptic Gel",   category: "Oral Gel"  },
  { image: "/images/orogum-gum-paint.png",          name: "Orogum Gum Paint",     subtitle: "Bleeding Gum Relief",            category: "Gum Paint" },
  { image: "/images/orogum-t.jpg",                  name: "Orogum T",             subtitle: "Receding Gum Therapy",           category: "Gum Paint" },
  { image: "/images/esadine-pdf.jpeg",              name: "Esadine Gargle",       subtitle: "Povidone Iodine Antiseptic",     category: "Mouthwash" },
  { image: "/images/osf-band-pdf.jpeg",             name: "OSF Band",             subtitle: "Antioxidant Softgel Capsules",   category: "Nutritional" },
  { image: "/images/morepep-sp-tablets.jpeg",       name: "Morpep-SP Tablets",    subtitle: "Anti-inflammatory & Analgesic",  category: "Tablets"   },
  { image: "/images/morpep-sp-pdf.jpeg",            name: "Morpep-P Tablets",     subtitle: "Pain & Fever Relief",            category: "Tablets"   },
  { image: "/images/orobloc-2ad-pdf.jpeg",          name: "Orobloc 2% AD",        subtitle: "Local Anaesthetic Injection",    category: "Injection" },
  { image: "/images/iesa-guard-gloves.jpg",         name: "IesaGuard Gloves",     subtitle: "Latex Examination Gloves",       category: "Accessories" },
  { image: "/images/protiesa-protein-powder.png",   name: "Protiesa",             subtitle: "Nutritional Recovery Supplement",category: "Nutritional" },
]

function ProductSlide({
  item,
  index,
  isActive,
  onInView,
}: {
  item: typeof productItems[0]
  index: number
  isActive: boolean
  onInView: (inView: boolean) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" })

  useEffect(() => {
    onInView(isInView)
  }, [isInView, onInView])

  return (
    <div
      ref={ref}
      className="h-screen w-full flex items-center justify-center snap-start shrink-0 px-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isInView ? 1 : 0.3, scale: isInView ? 1 : 0.92 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[260px] h-[340px] sm:w-[320px] sm:h-[420px] rounded-3xl bg-white border border-slate-100 shadow-xl overflow-hidden flex items-center justify-center p-8"
      >
        {/* Index number */}
        <span className="absolute top-5 left-6 text-[10px] font-bold uppercase tracking-widest text-slate-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Category chip */}
        <span className="absolute top-5 right-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {item.category}
        </span>
        {/* Product image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/280x340/f8fafc/94a3b8?text=No+Image"
          }}
        />
      </motion.div>
    </div>
  )
}

function ProductScrollShowcase() {
  const nameRef = useRef<TextRotateRef>(null)
  const subtitleRef = useRef<TextRotateRef>(null)
  const [activeIndex, setActiveIndex] = [
    useRef(0),
    (idx: number) => {
      nameRef.current?.jumpTo(idx)
      subtitleRef.current?.jumpTo(idx)
    },
  ]

  const handleInView = (index: number, inView: boolean) => {
    if (inView) {
      activeIndex.current = index
      nameRef.current?.jumpTo(index)
      subtitleRef.current?.jumpTo(index)
    }
  }

  return (
    <section className="relative w-screen snap-start overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      {/* Sticky left panel */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pointer-events-none z-20 py-16 px-6 sm:px-12 lg:px-20">
        {/* Top label */}
        <div>
          <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Our Products — Scroll to Explore
          </p>

          {/* Giant rotating product name */}
          <TextRotate
            ref={nameRef}
            texts={productItems.map((p) => p.name)}
            mainClassName="text-[clamp(2.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.9] text-slate-900 block"
            splitLevelClassName="overflow-hidden"
            elementLevelClassName="inline-block"
            staggerFrom="first"
            animatePresenceMode="wait"
            loop={false}
            auto={false}
            staggerDuration={0.015}
            initial={{ opacity: 0, y: "110%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-110%" }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
          />

          {/* Subtitle */}
          <TextRotate
            ref={subtitleRef}
            texts={productItems.map((p) => p.subtitle)}
            mainClassName="text-base sm:text-xl text-slate-400 font-medium mt-4 block"
            splitLevelClassName="overflow-hidden"
            staggerFrom="first"
            animatePresenceMode="wait"
            loop={false}
            auto={false}
            staggerDuration={0.008}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
          />
        </div>

        {/* Bottom: counter */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 max-w-[60px] bg-slate-200" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
            {productItems.length} Products
          </span>
        </div>
      </div>

      {/* Scrollable product images — overlaid on top of sticky */}
      <div className="absolute inset-0 overflow-y-scroll snap-y snap-mandatory">
        {/* Offset spacer so images appear on the right side on desktop */}
        {productItems.map((item, index) => (
          <ProductSlide
            key={index}
            item={item}
            index={index}
            isActive={activeIndex.current === index}
            onInView={(inView) => handleInView(index, inView)}
          />
        ))}
      </div>
    </section>
  )
}

export { ProductScrollShowcase }
export default ProductScrollShowcase
