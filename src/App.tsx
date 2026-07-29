import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { User, Settings, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const smoothEase = [0.22, 1, 0.36, 1];
const hoverEase = [0.34, 1.56, 0.64, 1];

// Viewport & Card Fan slot definitions
const HERO_ROW_Y = 522;

const SLOTS = [
  { x: -480, y: 18, rotate: -18, scale: 0.88, z: 1 },
  { x: -310, y: 6, rotate: -10, scale: 0.92, z: 2 },
  { x: -155, y: -2, rotate: -4, scale: 0.96, z: 3 },
  { x: 0, y: -8, rotate: 0, scale: 1.0, z: 4 },
  { x: 160, y: -2, rotate: 5, scale: 0.96, z: 3 },
  { x: 320, y: 6, rotate: 12, scale: 0.92, z: 2 },
  { x: 480, y: 18, rotate: 20, scale: 0.88, z: 1 },
];

const CASCADE = [
  { top: 300, left: 20, rotate: -3, z: 7 },
  { top: 370, left: 170, rotate: 0, z: 6 },
  { top: 440, left: 320, rotate: 3, z: 5 },
  { top: 510, left: 470, rotate: 6, z: 4 },
  { top: 580, left: 620, rotate: 9, z: 3 },
  { top: 650, left: 770, rotate: 12, z: 2 },
  { top: 720, left: 920, rotate: 15, z: 1 },
];

const CARDS = [
  '/card-1.png',
  '/card-2.png',
  '/card-3.png',
  '/card-4.png',
  '/card-5.png',
  '/card-6.png',
  '/card-7.png',
];

// Helper to compute cubic bezier progress
function getTimeForProgress(targetP: number): number {
  return Math.pow(targetP, 0.7);
}

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionTwoRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1440, h: typeof window !== 'undefined' ? window.innerHeight : 900 });

  useEffect(() => {
    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#F2F2F0] min-h-screen text-[#111111] font-sans selection:bg-[#4ECDC4] selection:text-white">
      {/* Fixed Background Blobs */}
      <BackgroundBlobs />

      {/* Fixed Top Navbar */}
      <Navbar />

      {/* Fixed Scroll Indicator */}
      <ScrollIndicator />

      {/* Global ScrollCards Overlay */}
      <ScrollCards containerRef={containerRef} sectionTwoRef={sectionTwoRef} viewport={viewport} />

      {/* Page Sections */}
      <main className="relative z-10 flex flex-col w-full">
        <Section1 />
        <Section2 sectionTwoRef={sectionTwoRef} />
        <Section3 />
      </main>
    </div>
  );
}

// ----------------------------------------------------
// Fixed Background Blobs Layer
// ----------------------------------------------------
function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Blob 1 */}
      <div
        className="absolute top-[5%] left-[8%] w-[300px] h-[300px] rounded-full blur-[40px]"
        style={{ background: 'radial-gradient(circle, rgba(180,180,180,0.12) 0%, transparent 70%)' }}
      />
      {/* Blob 2 */}
      <div
        className="absolute top-[8%] right-[10%] w-[250px] h-[250px] rounded-full blur-[40px]"
        style={{ background: 'radial-gradient(circle, rgba(180,180,180,0.12) 0%, transparent 70%)' }}
      />
      {/* Blob 3 */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[60px]"
        style={{ background: 'radial-gradient(circle, rgba(160,160,160,0.08) 0%, transparent 70%)' }}
      />
    </div>
  );
}

// ----------------------------------------------------
// Fixed Top Navbar
// ----------------------------------------------------
function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-[18px] flex items-center justify-between w-full bg-transparent">
      {/* Left: Logo & Wordmark */}
      <div className="flex items-center gap-[10px] cursor-pointer">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Back shape */}
          <path d="M6 4L22 4L16 22L0.5 22L6 4Z" fill="#4ECDC4" opacity="1" />
          {/* Front shape */}
          <path d="M11 9L27 9L21 27L5.5 27L11 9Z" fill="#4ECDC4" opacity="0.85" />
        </svg>
        <span className="font-heading text-[18px] font-semibold text-[#111111]">Pallet Ross</span>
      </div>

      {/* Center: Nav links */}
      <nav className="hidden md:flex items-center gap-1">
        <button className="font-heading text-[14px] text-[#111111] px-[14px] py-2 hover:opacity-75 transition-opacity">
          Get Started
        </button>
        <button className="font-heading text-[14px] text-[#111111] px-[14px] py-2 flex items-center gap-[6px] hover:opacity-75 transition-opacity">
          <span className="w-[14px] h-[14px] rounded-full bg-[#4ECDC4] inline-block shrink-0" />
          <span>Create strategy</span>
        </button>
        <button className="font-heading text-[14px] text-[#111111] px-[14px] py-2 hover:opacity-75 transition-opacity">
          Pricing
        </button>
        <button className="font-heading text-[14px] text-[#111111] px-[14px] py-2 hover:opacity-75 transition-opacity">
          Contact
        </button>
        <button className="font-heading text-[14px] text-[#111111] px-[14px] py-2 hover:opacity-75 transition-opacity">
          Solution
        </button>
        <button className="font-heading text-[14px] text-[#111111] px-[14px] py-2 hover:opacity-75 transition-opacity">
          E-Commerce
        </button>
      </nav>

      {/* Right: User & Settings */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-[#111111] bg-transparent hover:bg-black/5 rounded-lg transition-colors" aria-label="User profile">
          <User size={20} />
        </button>
        <button className="p-2 text-[#111111] bg-transparent hover:bg-black/5 rounded-lg transition-colors" aria-label="Settings">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}

// ----------------------------------------------------
// Fixed Scroll Indicator
// ----------------------------------------------------
function ScrollIndicator() {
  const handleScrollUp = () => {
    window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
      <button
        onClick={handleScrollUp}
        className="w-[36px] h-[36px] rounded-[8px] border-[1.5px] border-black/15 bg-transparent flex items-center justify-center text-[#111111] hover:bg-black/5 transition-colors"
        aria-label="Scroll up"
      >
        <ChevronUp size={16} />
      </button>
      <button
        onClick={handleScrollDown}
        className="w-[36px] h-[36px] rounded-[8px] border-[1.5px] border-black/15 bg-transparent flex items-center justify-center text-[#111111] hover:bg-black/5 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown size={16} />
      </button>
    </div>
  );
}

// ----------------------------------------------------
// Global ScrollCards Overlay Engine
// ----------------------------------------------------
interface ScrollCardsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  sectionTwoRef: React.RefObject<HTMLDivElement | null>;
  viewport: { w: number; h: number };
}

function ScrollCards({ containerRef, sectionTwoRef, viewport }: ScrollCardsProps) {
  const [introDone, setIntroDone] = useState(false);
  const [revealedCards, setRevealedCards] = useState<boolean[]>(Array(7).fill(false));
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [lockProgress, setLockProgress] = useState(0.5);
  const [scrollableHeight, setScrollableHeight] = useState(1000);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate Section 2 lock progress
  useEffect(() => {
    const calculateLayout = () => {
      if (!containerRef.current || !sectionTwoRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + containerRect.top;
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      const sectionTwoRect = sectionTwoRef.current.getBoundingClientRect();
      const sectionTwoTop = window.scrollY + sectionTwoRect.top;

      const progress = Math.min(Math.max((sectionTwoTop - containerTop) / (totalScrollable || 1), 0.05), 0.99);
      setLockProgress(progress);
      setScrollableHeight(totalScrollable);
    };

    calculateLayout();
    const timer = setTimeout(calculateLayout, 300);
    window.addEventListener('resize', calculateLayout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateLayout);
    };
  }, [containerRef, sectionTwoRef]);

  // Reveal calculation during Card 1 sweep
  const introDelay = 0.8;
  const introDuration = 0.72;
  const travelToRightDuration = 0.6;
  const sweepLeftDuration = 1.6;
  const sweepStart = introDelay + introDuration + travelToRightDuration;

  useEffect(() => {
    if (introDone) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    SLOTS.forEach((_, i) => {
      if (i === 0) return;
      const slot6X = SLOTS[6].x;
      const slot0X = SLOTS[0].x;
      const progress = (SLOTS[i].x - slot6X) / (slot0X - slot6X);
      const revealTime = getTimeForProgress(progress);
      const delayMs = (sweepStart + revealTime * sweepLeftDuration) * 1000;

      const t = setTimeout(() => {
        setRevealedCards((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, delayMs);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [introDone, sweepStart, sweepLeftDuration]);

  // Current progress check for wrapper positioning
  const [currentProgress, setCurrentProgress] = useState(0);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => setCurrentProgress(v));
    return () => unsubscribe();
  }, [scrollYProgress]);

  const isLocked = currentProgress >= lockProgress;
  const wrapperStyle: React.CSSProperties = isLocked
    ? { position: 'absolute', top: lockProgress * scrollableHeight, left: 0, width: '100%', height: viewport.h, zIndex: 5 }
    : { position: 'fixed', inset: 0, zIndex: 5 };

  return (
    <div style={wrapperStyle} className="pointer-events-none">
      {!introDone ? (
        // Intro Animation Overlay
        <div className="relative w-full h-full">
          {/* Lead Card (Card 1, index 0) */}
          <LeadIntroCard
            viewport={viewport}
            onComplete={() => setIntroDone(true)}
            isHovered={hoveredCard === 0}
            onHover={(h) => setHoveredCard(h ? 0 : null)}
          />

          {/* Cards 2 to 7 (indices 1 to 6) */}
          {CARDS.slice(1).map((src, idx) => {
            const i = idx + 1;
            const slot = SLOTS[i];
            const isRevealed = revealedCards[i];

            return (
              <motion.div
                key={`intro-card-${i}`}
                className="absolute top-0 left-0 w-[220px] h-[220px] rounded-[18px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.20)] pointer-events-auto cursor-pointer"
                style={{
                  x: viewport.w / 2 + slot.x,
                  y: HERO_ROW_Y + slot.y,
                  rotate: slot.rotate,
                  scale: slot.scale,
                  transformOrigin: 'center center',
                  zIndex: hoveredCard === i ? 30 : slot.z,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealed ? 1 : 0 }}
                transition={{
                  duration: isRevealed ? (i <= 3 ? 0.06 : 0.18) : 0.25,
                  ease: isRevealed ? 'easeOut' : hoverEase,
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ transition: { duration: 0.2, ease: hoverEase } }}
              >
                <img src={src} alt={`Artwork ${i + 1}`} className="w-full h-full object-cover select-none pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      ) : (
        // Scroll-Linked State Overlay
        <div className="relative w-full h-full">
          {CARDS.map((src, i) => (
            <ScrollLinkedCard
              key={`scroll-card-${i}`}
              index={i}
              src={src}
              viewport={viewport}
              scrollYProgress={scrollYProgress}
              lockProgress={lockProgress}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Lead Intro Card 1 Component
interface LeadIntroCardProps {
  viewport: { w: number; h: number };
  onComplete: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

function LeadIntroCard({ viewport, onComplete, isHovered, onHover }: LeadIntroCardProps) {
  const introDelay = 0.8;
  const introDuration = 0.72;
  const travelToRightDuration = 0.6;
  const sweepLeftDuration = 1.6;
  const totalDuration = introDuration + travelToRightDuration + sweepLeftDuration;

  const slot6 = SLOTS[6];
  const slot0 = SLOTS[0];

  return (
    <motion.div
      className="absolute top-0 left-0 w-[220px] h-[220px] rounded-[18px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.20)] pointer-events-auto cursor-pointer"
      style={{
        transformOrigin: 'center center',
        zIndex: isHovered ? 30 : SLOTS[0].z,
      }}
      initial={{
        x: viewport.w / 2,
        y: viewport.h / 2 + 180,
        rotate: 0,
        scale: 0.3,
        opacity: 0,
      }}
      animate={{
        x: [viewport.w / 2, viewport.w / 2, viewport.w / 2 + slot6.x, viewport.w / 2 + slot0.x],
        y: [viewport.h / 2 + 180, HERO_ROW_Y, HERO_ROW_Y + slot6.y, HERO_ROW_Y + slot0.y],
        rotate: [0, 0, slot6.rotate, slot0.rotate],
        scale: [0.3, 1, slot6.scale, slot0.scale],
        opacity: [0, 1, 1, 1],
      }}
      transition={{
        delay: introDelay,
        duration: totalDuration,
        times: [0, introDuration / totalDuration, (introDuration + travelToRightDuration) / totalDuration, 1],
        ease: [smoothEase, smoothEase, smoothEase],
      }}
      onAnimationComplete={onComplete}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      whileHover={{ transition: { duration: 0.2, ease: hoverEase } }}
    >
      <img src={CARDS[0]} alt="Artwork 1" className="w-full h-full object-cover select-none pointer-events-none" />
    </motion.div>
  );
}

// Scroll-Linked Card Component
interface ScrollLinkedCardProps {
  index: number;
  src: string;
  viewport: { w: number; h: number };
  scrollYProgress: any;
  lockProgress: number;
  hoveredCard: number | null;
  setHoveredCard: (idx: number | null) => void;
}

function ScrollLinkedCard({
  index,
  src,
  viewport,
  scrollYProgress,
  lockProgress,
  hoveredCard,
  setHoveredCard,
}: ScrollLinkedCardProps) {
  const lp = Math.max(lockProgress, 0.05);
  const p1 = lp * 0.33;
  const p2 = lp * 0.66;

  // Clamped progress value so transforms don't exceed lock
  const clampedProgress = useTransform(scrollYProgress, (v: number) => Math.min(v, lp));

  const slot = SLOTS[index];
  const cascade = CASCADE[index];

  const s1Cx = viewport.w / 2 + slot.x;
  const s1Cy = HERO_ROW_Y + slot.y;
  const stackCx = viewport.w / 2;
  const stackCy = viewport.h / 2;
  const cascadeLeftRef = viewport.w * 0.4;
  const s2Cx = cascadeLeftRef + cascade.left + 220 / 2;
  const s2Cy = cascade.top + 220 / 2;

  const x = useTransform(clampedProgress, [0, p1, p2, lp], [s1Cx, stackCx, stackCx, s2Cx]);
  const y = useTransform(clampedProgress, [0, p1, p2, lp], [s1Cy, stackCy, s2Cy, s2Cy]);
  const rotate = useTransform(clampedProgress, [0, p1, lp], [slot.rotate, 0, cascade.rotate]);
  const scale = useTransform(clampedProgress, [0, p1, lp], [slot.scale, 1, 1]);

  return (
    <motion.div
      className="absolute top-0 left-0 w-[220px] h-[220px] rounded-[18px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.20)] pointer-events-auto cursor-pointer"
      style={{
        x,
        y,
        rotate,
        scaleX: scale,
        scaleY: scale,
        transformOrigin: 'center center',
        translateX: '-50%',
        translateY: '-50%',
        zIndex: hoveredCard === index ? 30 : cascade.z,
      }}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      whileHover={{ transition: { duration: 0.2, ease: hoverEase } }}
    >
      <img src={src} alt={`Artwork ${index + 1}`} className="w-full h-full object-cover select-none pointer-events-none" />
    </motion.div>
  );
}

// ----------------------------------------------------
// Section 1: Hero Section
// ----------------------------------------------------
function Section1() {
  const line1Words = "A place to display".split(" ");
  const line2Words = "your masterpiece.".split(" ");

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-[140px] flex flex-col items-center text-center">
      {/* Headline */}
      <h1 className="font-heading text-[96px] font-extrabold leading-[1.0] tracking-[-3px] text-[#111111] max-w-[1100px] mx-auto">
        <div className="flex justify-center flex-wrap">
          {line1Words.map((word, i) => (
            <motion.span
              key={`line1-${i}`}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
        <div className="flex justify-center flex-wrap">
          {line2Words.map((word, i) => (
            <motion.span
              key={`line2-${i}`}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: (line1Words.length + i) * 0.08 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </h1>

      {/* Card Spacer containing Chat Bubbles */}
      <div className="relative w-full h-[260px] mt-[40px]">
        {/* @coplin bubble */}
        <motion.div
          className="absolute left-[calc(50%-320px)] top-[-12px] z-20 bg-[#4D7EFF] px-[18px] py-[8px] rounded-full font-heading text-[15px] font-semibold text-white shadow-lg pointer-events-auto"
          initial={{ opacity: 0, scaleX: 1, scaleY: 1 }}
          animate={{
            opacity: 1,
            scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
            scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
          }}
          transition={{ duration: 0.8, delay: 3.05 }}
        >
          @coplin
          <div
            className="absolute bottom-[-8px] left-[16px] w-0 h-0"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '10px solid #4D7EFF',
            }}
          />
        </motion.div>

        {/* @andrea bubble */}
        <motion.div
          className="absolute right-[calc(50%-420px)] top-[-20px] z-20 bg-[#3DBF7A] px-[18px] py-[8px] rounded-full font-heading text-[15px] font-semibold text-white shadow-lg pointer-events-auto"
          initial={{ opacity: 0, scaleX: 1, scaleY: 1 }}
          animate={{
            opacity: 1,
            scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
            scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
          }}
          transition={{ duration: 0.8, delay: 3.2 }}
        >
          @andrea
          <div
            className="absolute bottom-[-8px] right-[16px] w-0 h-0"
            style={{
              borderLeft: '4px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '10px solid #3DBF7A',
            }}
          />
        </motion.div>
      </div>

      {/* Subtitle paragraph */}
      <motion.p
        className="font-body text-[16px] font-normal text-black/55 leading-[1.6] max-w-[480px] mt-[48px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        Artists can display their masterpieces, and buyers can discover and purchase works that resonate with them.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex items-center gap-[16px] mt-[28px] pb-[80px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.4 }}
      >
        <button className="bg-[#111111] text-white font-heading text-[15px] font-semibold px-[28px] py-[14px] rounded-full hover:bg-[#333333] transition-colors">
          Join for $9.99/m
        </button>
        <button className="bg-transparent text-[#111111] font-heading text-[15px] font-medium px-[20px] py-[14px] rounded-full hover:bg-black/5 transition-colors">
          Read more
        </button>
      </motion.div>
    </section>
  );
}

// ----------------------------------------------------
// Section 2: E-Commerce & Cascade Target
// ----------------------------------------------------
interface Section2Props {
  sectionTwoRef: React.RefObject<any>;
}

function Section2({ sectionTwoRef }: Section2Props) {
  const isSectionInView = useInView(sectionTwoRef as any, { amount: 0.95 });

  const line1 = "Showcase, Sell".split(" ");
  const line2 = "& acquire arts to".split(" ");
  const line3 = "our marketplace.".split(" ");

  return (
    <section
      ref={sectionTwoRef}
      data-section="two"
      className="relative min-h-[calc(100vh-30px)] bg-[#F2F2F0] px-[64px] pt-[80px] flex items-start overflow-hidden w-full"
    >
      {/* Left Column Text */}
      <div className="w-[520px] pt-[32px] shrink-0 z-20">
        {/* Eyebrow */}
        <motion.div
          className="font-heading text-[11px] font-medium tracking-[2.5px] text-black/45 mb-[20px]"
          initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          E-COMMERCE
        </motion.div>

        {/* H2 Headline */}
        <h2 className="font-heading text-[60px] font-extrabold leading-[1.05] tracking-[-1.5px] m-0">
          <div className="flex flex-wrap text-[#111111]">
            {line1.map((w, i) => (
              <motion.span
                key={`s2-l1-${i}`}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
              >
                {w}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap text-[#C0392B]">
            {line2.map((w, i) => (
              <motion.span
                key={`s2-l2-${i}`}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: (line1.length + i) * 0.06 }}
              >
                {w}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap text-[#111111]">
            {line3.map((w, i) => (
              <motion.span
                key={`s2-l3-${i}`}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: (line1.length + line2.length + i) * 0.06 }}
              >
                {w}
              </motion.span>
            ))}
          </div>
        </h2>

        {/* Paragraph */}
        <motion.p
          className="font-body text-[15px] font-normal text-black/55 leading-[1.65] max-w-[340px] mt-[28px]"
          initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        >
          Dynamic community where artists and buyers seamlessly merge. ArtFusion brings together creators and enthusiasts to share creativity.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex items-center gap-[12px] mt-[48px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <button className="bg-[#111111] text-white font-heading text-[15px] font-semibold px-[28px] py-[14px] rounded-full hover:bg-[#333333] transition-colors">
            Join for $9.99/m
          </button>
          <button className="bg-transparent text-[#111111] font-heading text-[15px] font-medium px-[20px] py-[14px] rounded-full border-[1.5px] border-black/15 hover:bg-black/5 transition-colors">
            Read more
          </button>
        </motion.div>
      </div>

      {/* Floating Tag Bubbles */}
      {/* @howard tag */}
      <motion.div
        className="absolute top-[260px] left-[calc(40%+340px)] z-20 bg-[#C0392B] px-[20px] py-[9px] rounded-full font-heading text-[15px] font-semibold text-white shadow-lg pointer-events-auto"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: isSectionInView ? 1 : 0, scale: isSectionInView ? 1 : 0.6 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        @howard
        <div
          className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '10px solid #C0392B',
          }}
        />
      </motion.div>

      {/* @robin tag */}
      <motion.div
        className="absolute top-[430px] left-[calc(40%+680px)] z-20 bg-[#111111] px-[20px] py-[9px] rounded-full font-heading text-[15px] font-semibold text-white shadow-lg pointer-events-auto"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: isSectionInView ? 1 : 0, scale: isSectionInView ? 1 : 0.6 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
      >
        @robin
        <div
          className="absolute bottom-[-9px] left-[20px] w-0 h-0"
          style={{
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '10px solid #111111',
          }}
        />
      </motion.div>
    </section>
  );
}

// ----------------------------------------------------
// Section 3: Class Banner & Slideshow
// ----------------------------------------------------
function Section3() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const headlineWords = "Gateway to artist people.".split(" ");

  return (
    <section data-section="three" className="relative min-h-screen bg-[#F2F2F0] px-[64px] py-[80px] overflow-hidden w-full">
      {/* Text Block Header */}
      <div className="max-w-[520px] mb-[40px] relative z-10">
        <motion.div
          className="font-heading text-[11px] font-medium tracking-[2.5px] text-black/45 mb-[20px]"
          initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          CLASS BY REATHA C. PHELAN
        </motion.div>

        <h2 className="font-heading text-[80px] font-extrabold leading-[1.0] tracking-[-2.5px] text-[#111111] m-0 flex flex-wrap">
          {headlineWords.map((word, i) => (
            <motion.span
              key={`s3-${i}`}
              className="inline-block mr-[0.2em]"
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.07 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </div>

      {/* Floating @reatha tag */}
      <motion.div
        className="absolute top-[120px] right-[180px] z-10 bg-[#111111] px-[22px] py-[10px] rounded-full font-heading text-[16px] font-semibold text-white shadow-xl pointer-events-auto"
        initial={{ opacity: 0, scaleX: 1, scaleY: 1 }}
        whileInView={{
          opacity: 1,
          scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
          scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.65 }}
      >
        @reatha
        <div
          className="absolute bottom-[-9px] right-[24px] w-0 h-0"
          style={{
            borderLeft: '8px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '10px solid #111111',
          }}
        />
      </motion.div>

      {/* Autoplay Banner Container */}
      <motion.div
        className="relative w-full h-[600px] rounded-[24px] overflow-hidden bg-[#111111]"
        initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
      >
        {/* Slides */}
        {[1, 2, 3].map((num, i) => (
          <motion.img
            key={`banner-slide-${i}`}
            src={`/banner-${num}.png`}
            alt={`Banner Slide ${num}`}
            className="absolute inset-0 w-full h-full object-cover object-top"
            animate={{
              opacity: activeSlide === i ? 1 : 0,
              scale: activeSlide === i ? 1 : 1.04,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        ))}

        {/* Top-Right Dot Indicators */}
        <div className="absolute top-[24px] right-[24px] z-10 flex items-center gap-[5px]">
          {[0, 1, 2].map((idx) => (
            <button
              key={`dot-${idx}`}
              onClick={() => setActiveSlide(idx)}
              className="h-[6px] rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: activeSlide === idx ? '18px' : '6px',
                backgroundColor: activeSlide === idx ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom-Left Watch CTA with Pulsing Rings */}
        <div className="absolute bottom-[28px] left-[28px] z-10 inline-block">
          {/* Pulsing ring 1 */}
          <motion.span
            className="absolute inset-[-8px] rounded-full border-2 border-white/40 pointer-events-none"
            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          {/* Pulsing ring 2 */}
          <motion.span
            className="absolute inset-[-4px] rounded-full border-2 border-white/25 pointer-events-none"
            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: 'easeOut' }}
          />

          {/* Watch Button */}
          <motion.button
            className="relative z-10 bg-white text-[#111111] font-heading text-[15px] font-semibold px-[28px] py-[12px] rounded-full flex items-center gap-[8px] shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span>Watch</span>
          </motion.button>
        </div>

        {/* Bottom-Right Prev / Next Controls */}
        <div className="absolute bottom-[28px] right-[28px] z-10 flex items-center gap-[10px]">
          <motion.button
            onClick={() => setActiveSlide((prev) => (prev - 1 + 3) % 3)}
            className="w-[44px] h-[44px] rounded-full bg-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#111111] hover:bg-white transition-colors cursor-pointer"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2 }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            onClick={() => setActiveSlide((prev) => (prev + 1) % 3)}
            className="w-[44px] h-[44px] rounded-full bg-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#111111] hover:bg-white transition-colors cursor-pointer"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2 }}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
