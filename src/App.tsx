import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight,
  Check,
  X,
  Plus,
  Shield,
  Droplets,
  Home,
  Layers,
  Menu,
  ArrowUp,
  ArrowDownRight,
  Zap,
  ShieldCheck,
  Palette,
  TreeDeciduous,
  Box,
  ChevronDown,
  Waves,
  Bath
} from 'lucide-react';
import { cn } from './lib/utils';
import { SERVICES, NAV_LINKS } from './constants';

// --- Components ---

const Navbar = ({ activeIndex, onNavigate, isAbout, isContact }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e: any) => {
      const scrollTop = e.target.scrollTop || window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Use capture: true to catch scroll events from the overflow-y-auto containers
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full h-[64px] z-1000 flex items-center px-6 md:px-12 transition-all duration-500",
      isScrolled ? "bg-black border-b border-white/5 shadow-2xl" : "bg-black/90 backdrop-blur-md border-b border-white/5"
    )}>
      {/* Left: Logo */}
      <div className={cn(
        "flex-1 flex items-center transition-all duration-500",
        isScrolled ? "opacity-0 -translate-x-10 pointer-events-none" : "opacity-100 translate-x-0"
      )}>
        <div className="flex items-center cursor-pointer shrink-0 h-8" onClick={() => onNavigate(0)}>
          <img 
            src="https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/468474bf-f6a2-4380-acef-4c9ebdb1cc00/public" 
            alt="Mater Floors Logo" 
            className="h-full w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Center: Main Services Pill */}
      <div className={cn(
        "hidden lg:flex items-center justify-center transition-transform duration-500",
        isScrolled ? "translate-y-4" : "translate-y-2"
      )}>
        <div className={cn(
          "nav-pill-group transition-all duration-500",
          isScrolled && "scale-90 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        )}>
          {SERVICES.map((link, idx) => {
            const isActive = activeIndex === idx && !isAbout && !isContact;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(idx)}
                className={cn(
                  "nav-pill",
                  isActive && "active"
                )}
              >
                {link.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Secondary Links */}
      <div className={cn(
        "flex-1 hidden lg:flex items-center justify-end gap-7 transition-all duration-500",
        isScrolled ? "opacity-0 translate-x-10 pointer-events-none" : "opacity-100 translate-x-0"
      )}>
        <button
          onClick={() => onNavigate(3)}
          className={cn(
            "nav-link transition-all duration-300",
            isAbout ? "text-white font-bold" : "text-grey-1 hover:text-white"
          )}
        >
          About Us
        </button>
        <button
          onClick={() => onNavigate(4)}
          className={cn(
            "nav-link transition-all duration-300",
            isContact ? "text-white font-bold" : "text-grey-1 hover:text-white"
          )}
        >
          Contact
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center ml-auto">
        <button 
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white active:scale-95 transition-all" 
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black z-[2000]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[280px] bg-[#050505] border-l border-white/10 z-[2001] p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <img 
                  src="https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/468474bf-f6a2-4380-acef-4c9ebdb1cc00/public" 
                  alt="Logo" 
                  className="h-5 w-auto brightness-200 opacity-40 grayscale"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {NAV_LINKS.map((link, idx) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={() => {
                      onNavigate(idx);
                      setIsMenuOpen(false);
                    }}
                    className="text-left group"
                  >
                    <span className="block text-gold/30 text-[8px] uppercase tracking-[0.3em] font-bold mb-1">
                      0{idx + 1}
                    </span>
                    <span className="text-xl font-bold text-gold tracking-tight uppercase transition-transform group-hover:translate-x-2 block">
                      {link.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5">
                <div className="space-y-4">
                  <p className="text-white/30 text-[9px] uppercase tracking-widest font-bold">Contact Support</p>
                  <a href="tel:+94770029792" className="flex items-center gap-3 text-gold/80 text-sm font-medium">
                    <Phone size={14} /> +94 77 002 9792
                  </a>
                  <button className="w-full py-4 bg-gold text-bg font-black uppercase tracking-widest text-[10px] rounded-lg mt-4 shadow-lg shadow-gold/10">
                    Request a Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SideTab = ({ direction, label, onClick }: { direction: 'left' | 'right', label: string, onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "side-tab",
        direction === 'left' && "right-auto left-0 rounded-r-lg rounded-l-none border-l-0 border-r-2 border-black/10"
      )}
    >
      <div className="side-tab-bar" />
      <span className="side-tab-text">
        {label}
      </span>
      <div className="side-tab-arrow">
        {direction === 'right' ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </div>
    </button>
  );
};

const WhySection = () => {
  const paragraphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = paragraphRef.current;
    if (!el) return;

    // Store original content to re-split on resize
    const originalHTML = el.innerHTML;

    const splitIntoLines = () => {
      if (!el) return;
      
      // Reset to original to measure correctly
      el.innerHTML = originalHTML;
      
      // Get the text parts to preserve styling later
      const boldText = el.querySelector('.font-bold')?.textContent || "";
      const fullText = el.innerText;
      const words = fullText.split(/\s+/).filter(w => w.length > 0);
      
      // Temporary wrap words to measure lines
      el.innerHTML = words.map(w => `<span>${w}</span>`).join(' ');
      const spans = Array.from(el.querySelectorAll('span')) as HTMLElement[];
      
      const lines = [];
      let currentLine = [];
      let lastTop = -1;
      
      spans.forEach(span => {
        const top = span.offsetTop;
        if (lastTop !== -1 && top > lastTop + 5) {
          lines.push(currentLine);
          currentLine = [];
        }
        currentLine.push(span.innerText);
        lastTop = top;
      });
      if (currentLine.length > 0) lines.push(currentLine);
      
      // Rebuild with reveal-line spans
      el.innerHTML = '';
      let charCount = 0;
      
      lines.forEach(lineWords => {
        const lineSpan = document.createElement('span');
        lineSpan.className = 'reveal-line';
        lineSpan.style.opacity = '0.3';
        lineSpan.style.transition = 'opacity 0.4s ease';
        lineSpan.style.display = 'block';
        
        lineWords.forEach(word => {
          const wordSpan = document.createElement('span');
          wordSpan.innerText = word + ' ';
          
          // Check if this word is part of the bold text
          // We use a simple character count to determine the boundary
          if (charCount < boldText.length) {
            wordSpan.className = 'font-bold text-white';
          } else {
            wordSpan.className = 'text-[#999999] font-normal';
          }
          lineSpan.appendChild(wordSpan);
          charCount += word.length + 1;
        });
        
        el.appendChild(lineSpan);
      });
    };

    const updateReveal = () => {
      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Progress 0 when top of element is at 90% of viewport
      // Progress 1 when top of element is at 10% of viewport
      const start = viewHeight * 0.9;
      const end = viewHeight * 0.1;
      
      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      
      const revealLines = el.querySelectorAll('.reveal-line');
      const totalLines = revealLines.length;
      const revealCount = Math.floor(progress * totalLines);
      
      revealLines.forEach((line, index) => {
        if (index <= revealCount) {
          (line as HTMLElement).style.opacity = '1';
        } else {
          (line as HTMLElement).style.opacity = '0.3';
        }
      });
    };

    splitIntoLines();
    updateReveal();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateReveal();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    
    let resizeTimeout: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        splitIntoLines();
        updateReveal();
      }, 250);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="w-full bg-[#1e2328] py-24 md:py-48 px-6 md:px-12 border-b border-white/5">
      <div className="max-w-[1160px] mx-auto flex flex-col md:grid md:grid-cols-[30%_70%] gap-8 md:gap-0 items-center md:items-start text-center md:text-left">
        <div className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.2em] text-gold font-semibold pt-0 md:pt-2.5">
          Why MASTER FLOORS
        </div>
        <div ref={paragraphRef} className="text-[22px] sm:text-[28px] md:text-[46px] leading-[1.3] md:leading-[1.2] tracking-tight md:tracking-[-0.03em] font-sans text-grey-1/70">
          <span className="text-white font-bold">Your</span> next chapter starts here. Don't{" "}
          <br className="hidden md:block" />
          just build — create something that{" "}
          <br className="hidden md:block" />
          lasts. We combine smart design and{" "}
          <br className="hidden md:block" />
          reliable construction to shape homes{" "}
          <br className="hidden md:block" />
          made for real living.
        </div>
      </div>
    </section>
  );
};

const InteractiveServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services = [
    {
      title: "Structural Design",
      paragraph: "We plan and design your home or building with safety, strength, and clear direction from day one.",
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/4f410845-c64e-4270-9d79-97b2f0aeaa00/public",
    },
    {
      title: "Building Construction",
      paragraph: "From foundation to finish, we manage your build with quality work, clear process, and reliable delivery.",
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/46a25357-cbcc-4233-eaa6-f42ac0d17b00/public",
    },
    {
      title: "Interior Design",
      paragraph: "We create interiors that feel right, function well, and match your lifestyle or business needs.",
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/a84ca9c5-f9bf-4fa3-b748-5b11949ed200/public",
    },
  ];

  return (
    <section className="w-full bg-bg py-20 md:py-40 px-4 md:px-12 overflow-hidden">
      {/* Desktop Version */}
      <div className="hidden md:flex max-w-[1400px] mx-auto flex-row gap-5 h-[500px]">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="relative h-full overflow-hidden rounded-xl cursor-pointer group flex-shrink-0"
            animate={{
              flex: hoveredIndex === index ? 1.4 : hoveredIndex === null ? 1 : 0.8,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <motion.img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-all duration-[1s] grayscale group-hover:grayscale-0"
                animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                transition={{ duration: 1.2 }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
              <div className="space-y-5">
                <h3 className="text-4xl font-bold text-white leading-tight tracking-tighter uppercase max-w-[280px]">
                  {service.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h3>
                
                <AnimatePresence mode="wait">
                  {hoveredIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="text-white/90 text-lg font-light max-w-[320px] leading-relaxed"
                    >
                      {service.paragraph}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-auto">
                <button className="group/btn w-fit flex items-center justify-center gap-3 px-8 py-4 border border-white/30 rounded-full text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all duration-500 shadow-xl whitespace-nowrap">
                  Request a Quote
                  <ArrowDownRight size={16} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Version - Simple and Robust */}
      <div className="flex md:hidden flex-col gap-6">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="relative h-[480px] w-full overflow-hidden rounded-xl border border-white/10"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
              <h3 className="text-3xl font-bold text-white leading-tight tracking-tighter uppercase mb-4">
                {service.title}
              </h3>
              
              <p className="text-white/80 text-base font-light mb-8 leading-relaxed">
                {service.paragraph}
              </p>

              <button className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-[11px] rounded-full shadow-2xl">
                Request a Quote
                <ArrowDownRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const VideoStatsHero = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://iframe.videodelivery.net/db0322115faf514a3ed54d99071b7082?autoplay=true&muted=true&loop=true&controls=false&playsinline=true&preload=true"
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh] min-w-full min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            loading="eager"
          ></iframe>
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Content */}
      <div className="container relative z-20">
        <div className="max-w-6xl mx-auto text-white">
          {/* Top Row: Labels */}
          <div className="grid grid-cols-1 md:grid-cols-3 mb-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <span className="text-xl md:text-3xl font-light tracking-tight">From Vision</span>
            </motion.div>
            <div className="hidden md:block" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <span className="text-xl md:text-3xl font-light tracking-tight">to Precision</span>
            </motion.div>
          </div>

          {/* Divider Line */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full h-px bg-white/30 mb-10 origin-left"
          />

          {/* Bottom Row: Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="text-6xl md:text-8xl font-bold mb-2 tracking-tighter">350+</div>
              <div className="text-xs md:text-sm font-light uppercase tracking-[0.3em] opacity-70">Projects</div>
            </motion.div>

            {/* Center Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl md:text-8xl font-bold mb-2 tracking-tighter">10</div>
              <div className="text-xs md:text-sm font-light uppercase tracking-[0.3em] opacity-70">Years</div>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <div className="text-6xl md:text-8xl font-bold mb-2 tracking-tighter">100%</div>
              <div className="text-xs md:text-sm font-light uppercase tracking-[0.3em] opacity-70">Customer Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#14181c] border-t border-[rgba(255,207,83,0.1)] py-20">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center mb-4 h-10">
            <img 
              src="https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/468474bf-f6a2-4380-acef-4c9ebdb1cc00/public" 
              alt="Mater Floors Logo" 
              className="h-full w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-grey-1 text-sm mb-6">Building Sri Lanka, One Home at a Time.</p>
          <div className="flex space-x-4">
            {['Facebook', 'Instagram', 'LinkedIn', 'WhatsApp'].map(p => (
              <div key={p} className="w-8 h-8 rounded-full bg-[rgba(255,207,83,0.08)] border border-[rgba(255,207,83,0.15)] flex items-center justify-center text-gold hover:bg-[rgba(255,207,83,0.15)] cursor-pointer transition-colors">
                <span className="text-[10px] font-bold">{p[0]}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-[10px] tracking-widest">Services</h4>
          <ul className="space-y-3 text-grey-1 text-sm">
            <li>Home Construction</li>
            <li>Flooring</li>
            <li>Waterproofing</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-[10px] tracking-widest">Company</h4>
          <ul className="space-y-3 text-grey-1 text-sm">
            <li>About</li>
            <li>Contact</li>
            <li>Get Quote</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-[10px] tracking-widest">Contact</h4>
          <div className="space-y-4">
            <div>
              <span className="text-gold text-[10px] uppercase tracking-widest block mb-1">Email Us</span>
              <span className="text-grey-1 text-sm">info@materfloors.lk</span>
            </div>
            <div>
              <span className="text-gold text-[10px] uppercase tracking-widest block mb-1">WhatsApp</span>
              <span className="text-grey-1 text-sm">+94 77 002 9792</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[rgba(255,207,83,0.05)] text-[11px] text-grey-1">
        <span>© 2024 MaterFloors. All rights reserved.</span>
        <div className="space-x-6 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms</span>
        </div>
      </div>
    </div>
  </footer>
);

const WhatsAppBubble = () => (
  <a 
    href="https://wa.me/94770029792" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-10 right-10 z-9999 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:rotate-[10deg] hover:scale-115 transition-all duration-500 ease-out group"
  >
    <MessageCircle className="text-white fill-white" size={32} />
    {/* Pulser effect */}
    <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-[ping_2.5s_infinite] opacity-40" />
    <div className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-20" />
  </a>
);

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  if (!visible) return null;
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-10 right-30 z-9999 w-14 h-14 bg-gold rounded-full flex items-center justify-center text-bg shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
    >
      <ArrowUp size={20} strokeWidth={3} />
    </button>
  );
};

// --- Sections ---

const Hero = ({ eyebrow, title, goldWord, ghostText, subtitle, layout = "default", videoId = "913a80395b3e6ac28dbf026ae1012c54" }: any) => {
  if (layout === "split") {
    return (
      <section className="hero relative h-screen flex items-center overflow-hidden bg-black">
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
              src={`https://iframe.videodelivery.net/${videoId}?autoplay=true&muted=true&loop=true&controls=false&playsinline=true`}
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh] min-w-full min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 border-0"
              allow="autoplay; fullscreen"
              loading="eager"
            ></iframe>
          </div>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>

        <div className="container relative z-20 w-full">
          <div className="flex flex-col justify-end min-h-[70vh] pb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[40px] md:text-[80px] lg:text-[100px] font-bold text-white leading-[0.9] tracking-tighter mb-8 md:mb-10 text-left"
            >
              {title}
            </motion.h1>

            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-full h-px bg-white/20 mb-10 origin-left"
            />

            <div className="flex justify-end">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="text-white/90 text-base md:text-xl font-light max-w-2xl text-right leading-relaxed"
              >
                {subtitle}
              </motion.p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const parts = goldWord ? title.split(goldWord) : [title, ""];
  return (
    <section className="hero relative overflow-hidden bg-black">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src={`https://iframe.videodelivery.net/${videoId}?autoplay=true&muted=true&loop=true&controls=false&playsinline=true`}
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh] min-w-full min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 border-0"
            allow="autoplay; fullscreen"
            loading="eager"
          ></iframe>
        </div>
        {/* Premium Dark Overlay - Darker on the left for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-black/20 z-10" />
      </div>

      <div className="container relative z-20">
        <div className="hero-content text-center lg:text-left">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="eyebrow hero-eyebrow"
          >
            {eyebrow}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="hero-title"
          >
            {parts[0]}<span className="text-gold">{goldWord}</span>{parts[1]}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="body-text hero-subtitle !text-white/90"
          >
            We combine traditional Sri Lankan craftsmanship with modern engineering to deliver results that exceed expectations.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button className="btn-primary">
              View Our Work
            </button>
          </motion.div>
        </div>
      </div>
      <div className="hero-ghost-text hidden lg:block z-10">
        {ghostText}
      </div>
    </section>
  );
};

const OtherServices = () => {
  const services = [
    {
      title: "Wiring",
      subtitle: "Safe and efficient electrical systems for modern living.",
      icon: Zap,
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/56e34e8e-56d8-4a25-438d-5a1e6c7d2000/public",
    },
    {
      title: "Roofing",
      subtitle: "Durable roofing solutions engineered for longevity.",
      icon: ShieldCheck,
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/452fb390-e262-4e49-6be0-671c8bbb0c00/public",
    },
    {
      title: "Painting",
      subtitle: "Premium finishes that bring color and life to your spaces.",
      icon: Palette,
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/996367bd-9970-42eb-e912-47b262cb3200/public",
    },
    {
      title: "Timber Works",
      subtitle: "Craftsmanship in wood for timeless architectural details.",
      icon: TreeDeciduous,
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/f8beef76-b803-42b2-6b07-08b7e92ad000/public",
    },
    {
      title: "Aluminium Works",
      subtitle: "Sleek and sustainable aluminium structures for any project.",
      icon: Layers,
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/3b1d886d-c26c-4029-ed08-bf4d4fed7100/public",
    },
    {
      title: "3D Designing",
      subtitle: "Visualizing your dreams with precision 3D modeling.",
      icon: Box,
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/f07752ce-1b44-4328-b7d0-d0a631a05a00/public",
    },
  ];

  return (
    <section className="bg-[#0d0d0d] py-48 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative">
          {/* Background Grid Lines (Decorative) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 bottom-0 left-1/3 w-px bg-gold/20 hidden lg:block" />
            <div className="absolute top-0 bottom-0 left-2/3 w-px bg-gold/20 hidden lg:block" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gold/20 hidden lg:block" />
            
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gold/20 hidden md:block lg:hidden" />
            <div className="absolute left-0 right-0 top-1/3 h-px bg-gold/20 hidden md:block lg:hidden" />
            <div className="absolute left-0 right-0 top-2/3 h-px bg-gold/20 hidden md:block lg:hidden" />
          </div>

          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative h-[340px] p-12 flex flex-col justify-center cursor-pointer transition-all duration-500",
                "border-gold/20",
                // Responsive borders to match the grid look
                i % 3 !== 2 ? "lg:border-r" : "",
                i < 3 ? "lg:border-b" : "",
                i % 2 === 0 ? "md:border-r lg:md:border-r-0" : "",
                i < 4 ? "md:border-b lg:md:border-b-0" : "",
                "border-b md:border-b-0 lg:border-b-0"
              )}
            >
              {/* Hover Background Image */}
              <div 
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                style={{ 
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 z-10 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-20">
                <div className="mb-8 text-gold transition-transform duration-500 group-hover:scale-110 origin-left">
                  <s.icon size={44} strokeWidth={1.2} />
                </div>
                
                <h3 className="text-3xl font-bold text-gold mb-4 tracking-tight">
                  {s.title}
                </h3>
                
                <p className="text-white/70 text-sm leading-relaxed max-w-[260px] group-hover:text-white transition-colors duration-300">
                  {s.subtitle}
                </p>

                {/* Minimal Arrow (Keeping interaction) */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                  <ArrowRight className="text-gold" size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const testimonials = [
    {
      quote: "“From planning to execution, the team delivered exactly what we envisioned. The attention to detail and finish quality truly set them apart.”",
      name: "Nimal Perera",
      role: "Director, Urban Homes Lanka"
    },
    {
      quote: "“What impressed us most was their professionalism and ability to handle every stage of the project seamlessly. The final result exceeded our expectations.”",
      name: "Chathuri Fernando",
      role: "Business Owner, CF Interiors"
    },
    {
      quote: "“Reliable, efficient, and highly skilled — they transformed our space into something modern and functional without compromising quality.”",
      name: "Ravindu Jayasinghe",
      role: "Managing Partner, RJ Holdings"
    },
    {
      quote: "“Their team understood our requirements perfectly and executed the project with precision. A truly smooth and stress-free experience.”",
      name: "Dinithi Wickramasinghe",
      role: "Founder, DW Studio"
    },
    {
      quote: "“Exceptional craftsmanship and clear communication throughout the project. We felt confident every step of the way.”",
      name: "Kavindu Senanayake",
      role: "Operations Manager, K&S Developments"
    }
  ];

  const nextSlide = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#0a0a0a] py-32 md:py-48 relative overflow-hidden min-h-[600px] flex flex-col justify-center">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header Area */}
        <div className="flex flex-wrap items-start justify-between mb-16 md:mb-24">
          <div className="flex flex-col gap-4">
            <span className="text-gold text-[11px] uppercase tracking-[0.4em] font-bold">
              CLIENT STORIES
            </span>
            <div className="flex items-baseline gap-2 font-mono text-white/40 text-sm">
              <span className="text-white text-lg">0{active + 1}</span>
              <span>/</span>
              <span>0{testimonials.length}</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-bg transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-bg transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <div className="text-gold/20 text-6xl md:text-8xl font-serif mb-4 leading-none select-none">
                “
              </div>
              <h3 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] md:leading-[1.1] tracking-tight mb-12 md:mb-16 max-w-4xl">
                {testimonials[active].quote.replace(/[“”]/g, '')}
              </h3>
              
              <div className="flex flex-col gap-1">
                <span className="text-white text-lg md:text-xl font-bold tracking-tight">
                  {testimonials[active].name}
                </span>
                <span className="text-white/40 text-xs md:text-sm uppercase tracking-[0.2em]">
                  {testimonials[active].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />
    </section>
  );
};

const WhyChooseUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const points = [
    {
      title: "On Time, On Budget",
      subtitle: "Beyond Expectations",
      description: "We respect your time and resources. Our meticulous planning ensures every project stays on track and within the agreed budget, delivering peace of mind alongside quality.",
      gridPos: "row-start-1 col-start-3"
    },
    {
      title: "Design with Purpose",
      subtitle: "",
      description: "Architecture is more than just aesthetics. We create spaces that are functional, sustainable, and deeply connected to the people who inhabit them.",
      gridPos: "row-start-2 col-start-2"
    },
    {
      title: "Integrated Solutions",
      subtitle: "Complete Expertise",
      description: "Every project begins with listening. By blending our expertise with your vision, we create spaces that feel personal, functional, and timeless.",
      gridPos: "row-start-2 col-start-4"
    },
    {
      title: "Build Connections Across Borders",
      subtitle: "",
      description: "Our reach extends beyond local boundaries. We bring international standards and global perspectives to every project, fostering growth and innovation.",
      gridPos: "row-start-3 col-start-3"
    }
  ];

  if (isMobile) {
    return (
      <section className="relative w-full bg-black py-20 px-6 overflow-hidden min-h-screen flex flex-col items-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20 grayscale brightness-50"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]" />

        {/* Logo at Top */}
        <div className="relative z-30 mb-12 flex flex-col items-center">
          <img 
            src="https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/468474bf-f6a2-4380-acef-4c9ebdb1cc00/public" 
            alt="Logo" 
            className="w-auto h-[100px] object-contain opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="h-px w-24 bg-gold/30 mt-6" />
        </div>

        {/* Stacked Accordion Cards */}
        <div className="w-full max-w-[450px] relative z-30 space-y-4">
          {points.map((point, i) => (
            <div 
              key={i}
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-xl overflow-hidden transition-all duration-300"
            >
              <div className="p-6 flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <h3 className="text-white text-lg font-bold tracking-tight uppercase">
                    {point.title}
                  </h3>
                  <ChevronDown 
                    className={cn(
                      "text-gold transition-transform duration-300",
                      expandedIndex === i ? "rotate-180" : "rotate-0"
                    )} 
                    size={18} 
                  />
                </div>
                {point.subtitle && (
                  <p className="text-gold/60 text-xs uppercase tracking-widest font-medium">
                    {point.subtitle}
                  </p>
                )}
                
                <AnimatePresence>
                  {expandedIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="pt-4 mt-4 border-t border-white/5">
                        <p className="text-white/70 text-sm leading-relaxed">
                          {point.description}
                        </p>
                        <button className="mt-5 flex items-center gap-2 text-gold text-[10px] uppercase tracking-widest font-bold">
                          Learn More <ArrowRight size={12} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-black overflow-hidden min-h-[900px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 grayscale brightness-50"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop")' }}
      />
      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px]" />

      {/* Gradient Masks for Edges */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black via-black/80 to-transparent z-20" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />

      {/* Grid Line System */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div 
          className="w-full h-full grid gap-0"
          style={{ 
            gridTemplateColumns: '0.4fr 1.1fr 1.1fr 1.1fr 0.4fr',
            gridTemplateRows: 'repeat(3, 300px)'
          }}
        >
          {[...Array(15)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/10 h-[300px] box-border" />
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div 
        className="w-full relative z-30 h-[900px] grid gap-0"
        style={{ 
          gridTemplateColumns: '0.4fr 1.1fr 1.1fr 1.1fr 0.4fr',
          gridTemplateRows: 'repeat(3, 300px)'
        }}
      >
        {/* Logo in Center */}
        <div className="flex row-start-2 col-start-3 items-center justify-center p-4 min-w-0 overflow-hidden box-border h-[300px]">
           <img 
             src="https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/468474bf-f6a2-4380-acef-4c9ebdb1cc00/public" 
             alt="Logo" 
             className="w-auto h-[120px] md:h-[180px] object-contain opacity-90 select-none"
             referrerPolicy="no-referrer"
           />
        </div>

        {points.map((point, i) => (
          <motion.div
            key={i}
            className={cn(
              "relative px-6 md:px-10 py-0 flex flex-col justify-center items-start transition-all duration-700 group cursor-default h-[300px] min-w-0 overflow-hidden box-border",
              point.gridPos
            )}
            initial="initial"
            whileHover="hover"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Hover Highlight Panel */}
            <motion.div 
              className="absolute inset-[1px] bg-white/[0.05] opacity-0 z-0"
              variants={{
                hover: { opacity: 1 }
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            
            <div className="relative z-10 transition-all duration-500 group-hover:translate-y-[-5px] w-full flex flex-col items-start">
              <motion.div 
                className="overflow-hidden w-full"
                initial={{ height: 0, opacity: 0 }}
                variants={{
                  hover: { height: "auto", opacity: 1 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p 
                  className="text-white/70 leading-relaxed pb-4 mb-4 border-b border-white/10 w-full"
                  style={{ fontSize: 'clamp(10px, 0.9vw, 14px)' }}
                >
                  {point.description}
                </p>
              </motion.div>

              <h3 
                className="text-white font-medium leading-tight tracking-tight whitespace-normal w-full"
                style={{ fontSize: 'clamp(14px, 1.4vw, 24px)' }}
              >
                {point.title}
              </h3>
              {point.subtitle && (
                <p 
                  className="text-white/50 mt-1 font-light whitespace-normal w-full"
                  style={{ fontSize: 'clamp(10px, 1vw, 16px)' }}
                >
                  {point.subtitle}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CTA = ({ heading }: { heading: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-24 md:py-32 bg-[#0f1115] overflow-hidden border-t border-white/5 transition-colors duration-700"
    >
      {/* Cinematic Background Image Reveal */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isHovered ? 0.25 : 0,
          scale: isHovered ? 1 : 1.05
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=2500&auto=format&fit=crop" 
          alt="Premium Craftsmanship" 
          className="w-full h-full object-cover grayscale brightness-[0.4]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115] via-transparent to-[#0f1115]" />
      </motion.div>

      <div className="container relative z-10 text-center">
        <motion.span 
          initial={{ opacity: 0.6 }}
          animate={{ opacity: isHovered ? 1 : 0.6 }}
          className="text-gold text-[11px] uppercase tracking-[0.5em] font-medium mb-6 block"
        >
          Start Your Project
        </motion.span>
        
        <h2 className="text-white font-bold text-[clamp(24px,4.5vw,52px)] leading-none tracking-tight whitespace-nowrap mb-6">
          {heading}
        </h2>
        
        <p className="text-grey-1/70 text-sm md:text-base font-light mb-10 max-w-[450px] mx-auto tracking-wide leading-relaxed">
          Free consultation and professional quote within 24 hours.
        </p>

        <div className="flex flex-col items-center gap-10">
          <motion.button 
            whileHover={{ 
              y: -5,
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(37, 211, 102, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-3 px-12 py-5 bg-[#25D366] text-white rounded-[2px] font-bold uppercase tracking-[0.2em] text-[12px] shadow-2xl transition-colors hover:bg-[#2ae871]"
            onClick={() => window.open('https://wa.me/94770029792', '_blank')}
          >
            <MessageCircle size={18} className="fill-white" />
            WhatsApp Us
          </motion.button>
          
          <button 
            className="group/call flex items-center gap-3 text-gold/80 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300 hover:text-gold hover:tracking-[0.32em]"
            onClick={() => window.location.href = "tel:+94770029792"}
          >
            <span>Or call us directly</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/call:translate-x-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Pages ---

const ConstructionPage = () => {
  return (
    <div className="w-screen h-full overflow-y-auto overflow-x-hidden">
      <Hero 
        title={<>Built for Living.<br />Built for Life.</>}
        subtitle={<>From concept to completion, we create spaces that combine<br />structural strength with practical living—ensuring every<br />build stands the test of time.</>}
        layout="split"
      />
      <WhySection />
      <InteractiveServices />
      <VideoStatsHero />
      <OtherServices />
      <Testimonials />
      <WhyChooseUs />
      <section className="bg-gold py-5 md:py-10 my-16 md:my-24 relative overflow-hidden border-y-[6px] md:border-y-[12px] border-black/5 group">
        {/* Industrial Diagonal Texture */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, #000 40px, #000 80px)' }} />
        
        <div className="flex whitespace-nowrap marquee-track">
          <div className="flex gap-10 md:gap-20 items-center px-6 md:px-10 animate-scroll group-hover:[animation-play-state:paused]">
            {[...Array(4)].map((_, idx) => (
              <React.Fragment key={idx}>
                {['Licensed & Registered', '15-Year Workmanship Guarantee', 'Insured Projects', 'Free Site Consultation'].map(t => (
                  <div key={t} className="flex items-center gap-4 md:gap-6 group/item transition-all duration-500 hover:scale-110 hover:brightness-125">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-bg flex items-center justify-center shadow-lg">
                      <Check className="text-gold w-3 h-3 md:w-[18px] md:h-[18px]" strokeWidth={3} />
                    </div>
                    <span className="text-bg text-sm md:text-3xl font-black uppercase tracking-[0.15em] md:tracking-[0.25em] leading-none">
                      {t}
                    </span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-25%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
        `}} />
      </section>
      <CTA heading="Ready to Build Something Extraordinary?" />
      <Footer />
    </div>
  );
};

const FlooringServices = () => {
  const services = [
    {
      title: "Terrazzo",
      description: "Seamless decorative flooring with long-lasting durability and a refined architectural finish.",
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/ce037d5e-6eb3-4963-5332-5c077a15db00/public"
    },
    {
      title: "Epoxy",
      description: "High-performance resin flooring built for strength, hygiene, and easy maintenance.",
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/36d246ce-0033-4b79-01d4-8feef899ff00/public"
    },
    {
      title: "Metallic Epoxy",
      description: "A bold reflective flooring finish that adds depth, movement, and a premium visual effect.",
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/16394aa7-41af-4a30-9d1c-5def4dc39000/public"
    },
    {
      title: "Polished Concrete",
      description: "A sleek modern surface with excellent durability and a clean industrial-luxury character.",
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/6be2f5e1-b83b-419d-faba-e27ebca06e00/public"
    },
    {
      title: "Cut Cement",
      description: "A textured handcrafted finish that brings warmth, depth, and contemporary simplicity.",
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/668a81b5-451b-4ef1-4725-d8c91586c600/public"
    },
    {
      title: "Hardwood Floor",
      description: "Timeless natural flooring that adds comfort, richness, and elegance to any interior.",
      image: "https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/e5031430-2805-4c5f-b961-4afc9e1fbc00/public"
    }
  ];

  return (
    <section className="bg-[#0f1113] py-48">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
              initial="initial"
              whileHover="hover"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { delay: idx * 0.1 } }
              }}
            >
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Normal State Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

              {/* Title - Normal State */}
              <div className="absolute bottom-10 left-10 z-10 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-white text-3xl font-bold tracking-tight">
                  {service.title}
                </h3>
              </div>

              {/* Hover Yellow Overlay - Slides in from left */}
              <motion.div 
                className="absolute inset-0 bg-gold/80 z-20 flex flex-col justify-end p-10"
                variants={{
                  initial: { x: '-100%' },
                  hover: { x: 0 }
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative z-30">
                  <motion.h3 
                    className="text-white text-4xl font-bold tracking-tight mb-4"
                    variants={{
                      initial: { opacity: 0, x: -20 },
                      hover: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.4 } }
                    }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p 
                    className="text-white/95 text-lg font-medium leading-relaxed"
                    variants={{
                      initial: { opacity: 0, x: -20 },
                      hover: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.4 } }
                    }}
                  >
                    {service.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TerrazzoFeatured = () => {
  return (
    <section className="sticky top-0 h-screen flex items-center overflow-hidden z-0">
      {/* Background Image with Slow Zoom */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 20, ease: "linear" }}
      >
        <img 
          src="https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/3bb3ceea-0f24-4e6b-170d-ca8a5fb4a500/public" 
          alt="Terrazzo Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-75" />
        {/* Top Edge Fade */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#0f1113] to-transparent z-10" />
      </motion.div>

      <div className="container relative z-10">
        <motion.div
          className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-14 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Featured Service</span>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter leading-[0.9] mb-6">
            Terrazzo <br /> Flooring
          </h2>
          <p className="text-gold text-lg md:text-xl font-medium mb-5 tracking-tight">
            Timeless design. Exceptional durability.
          </p>
          <p className="text-grey-1 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            A refined flooring solution that blends natural aggregates with modern finishing techniques, terrazzo delivers a seamless surface that is both visually striking and built to endure. Its versatility allows for unique patterns, textures, and tones, making it ideal for spaces that demand both elegance and performance.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
            {[
              "Seamless, joint-free finish",
              "Highly durable and long-lasting",
              "Customizable patterns and color combinations",
              "Low maintenance and easy upkeep"
            ].map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="flex items-start gap-3"
              >
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                <span className="text-white/80 text-sm font-medium leading-tight">{point}</span>
              </motion.div>
            ))}
          </div>

          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('https://wa.me/94770029792', '_blank')}
          >
            Explore Terrazzo Solutions
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const WarrantySection = () => {
  return (
    <section className="bg-gold py-48">
      <div className="container">
        <div className="mb-24">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start gap-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-xl">
              <span className="eyebrow mb-4 !text-bg/60 font-semibold">Quality Assurance</span>
              <h2 className="text-4xl md:text-5xl font-bold text-bg tracking-tighter leading-tight">
                Performance You Can Rely On
              </h2>
            </div>
            <div className="max-w-xl">
              <p className="text-bg/80 text-base md:text-lg leading-relaxed">
                Every flooring system we deliver is engineered to handle real-world conditions. From high foot traffic to demanding environments, our finishes are applied with precision and built to maintain their strength, structure, and visual quality over time.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            "Resistant to wear, cracking, and surface damage",
            "Maintains finish quality under heavy usage",
            "Easy to clean and maintain",
            "Suitable for both commercial and interior applications"
          ].map((point, i) => (
            <motion.div
              key={i}
              className="aspect-square p-8 bg-[#1a1f24] border border-white/5 rounded-md flex flex-col items-center justify-center text-center group hover:border-gold/20 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <div className="w-20 h-20 rounded-full bg-gold/5 flex items-center justify-center mb-8 border border-gold/10 group-hover:bg-gold/10 transition-colors duration-500">
                <ShieldCheck className="text-gold" size={32} strokeWidth={1.5} />
              </div>
              <p className="text-white text-lg font-medium leading-snug max-w-[200px]">
                {point}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center pt-10 border-t border-bg/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-bg/70 italic text-lg">
            "We stand behind our workmanship with reliable application standards and long-term performance assurance."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const FlooringGallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
      title: "Modern Lobby",
      category: "Terrazzo"
    },
    {
      url: "https://images.unsplash.com/photo-1600607687940-47a04b629733?q=80&w=1000&auto=format&fit=crop",
      title: "Minimalist Kitchen",
      category: "Polished Concrete"
    },
    {
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop",
      title: "Commercial Hallway",
      category: "Epoxy"
    },
    {
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
      title: "Luxury Residence",
      category: "Terrazzo"
    }
  ];

  return (
    <section className="bg-bg py-48">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-xl">
            <span className="eyebrow mb-4">Visual Showcase</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-tight">
              Terrazzo in Real Spaces
            </h2>
          </div>
          <div className="max-w-xl flex flex-col items-start md:items-end gap-6">
            <p className="text-grey-1 text-base md:text-lg leading-relaxed text-left">
              Explore a selection of terrazzo flooring applications across commercial and interior spaces, showcasing the versatility, texture, and refined finish of each installation.
            </p>
            <button className="btn-secondary whitespace-nowrap">View More Projects</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative aspect-[16/10] overflow-hidden rounded-lg group cursor-pointer"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-gold text-[10px] uppercase tracking-widest mb-2 block">{img.category}</span>
                <h3 className="text-white text-2xl font-bold tracking-tight">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FlooringFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How long do different flooring types last?",
      a: "The lifespan depends on the material and usage. Epoxy and terrazzo flooring can last for decades with minimal maintenance, while hardwood offers long-term durability with proper care. Polished concrete is also highly resilient, making it suitable for both residential and commercial spaces."
    },
    {
      q: "Which flooring solution is best for my space?",
      a: "Each project is different. Epoxy is ideal for industrial and high-traffic areas, terrazzo provides a seamless premium finish, hardwood adds warmth and elegance, and polished concrete delivers a modern and durable look. We guide you in selecting the right option based on usage, design, and budget."
    },
    {
      q: "How long does installation take?",
      a: "Installation time varies depending on the flooring type and project size. Epoxy and polished concrete can often be completed quickly, while terrazzo and hardwood may take longer due to detailing and finishing. We always plan efficiently to minimize disruption."
    },
    {
      q: "Do these flooring systems require special maintenance?",
      a: "Most of our flooring solutions are designed for easy maintenance. Epoxy and polished concrete require minimal upkeep, terrazzo is highly durable and easy to clean, and hardwood benefits from occasional care to maintain its finish. We provide clear maintenance guidance for every project."
    },
    {
      q: "Can flooring designs be customized?",
      a: "Yes. All our flooring solutions offer flexible customization options. From colors and textures in epoxy and terrazzo to finishes in concrete and wood selections in hardwood, each project can be tailored to match your design vision and functional needs."
    }
  ];

  return (
    <section className="bg-[#14181c] py-48">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20 lg:gap-32">
          {/* Left Side: Heading & CTA */}
          <div className="flex flex-col items-start">
            <span className="eyebrow mb-6">Support</span>
            <h2 className="text-6xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] mb-4">
              Frequently <br /> Asked,
            </h2>
            <h3 className="text-6xl md:text-7xl font-bold text-grey-1/40 tracking-tighter leading-[0.9] mb-12">
              Answered.
            </h3>
            
            <motion.button 
              className="group flex items-center gap-3 px-8 py-4 bg-black border border-white/10 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get a Free Quote
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Right Side: FAQ List */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-grey-1/60 font-bold block mb-10">
              FAQs:
            </span>
            
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <motion.div 
                  key={i}
                  className="border-t border-white/5 py-10 first:border-t-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div 
                    className="grid grid-cols-[40px_1fr] gap-6 cursor-pointer group"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span className="text-[11px] font-bold text-grey-1/40 pt-2">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    
                    <div className="space-y-4">
                      <h4 className={cn(
                        "text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300",
                        openIndex === i ? "text-white" : "text-white/90 group-hover:text-gold"
                      )}>
                        {faq.q}
                      </h4>
                      
                      <AnimatePresence initial={false}>
                        {openIndex === i && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="text-grey-1 text-lg leading-relaxed overflow-hidden"
                          >
                            {faq.a}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FlooringPage = () => {
  return (
    <div className="w-screen h-full overflow-y-auto overflow-x-hidden">
      <Hero 
        title={<>Floors That<br />Define Every Space.</>}
        subtitle={<>We provide high-performance flooring solutions that combine<br />aesthetic excellence with structural durability—ensuring every<br />surface meets the demands of modern living.</>}
        layout="split"
        videoId="de37e05b6f832376ae8cb693e22809ce"
      />
      <FlooringServices />
      
      <div className="relative">
        <TerrazzoFeatured />
        <div className="relative z-10 bg-bg shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          <WarrantySection />
          <FlooringGallery />
          <FlooringFAQ />
          <CTA heading="Transform Your Floors Today." />
          <Footer />
        </div>
      </div>
    </div>
  );
};

const MainServicesCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  
  const services = [
    {
      title: "Basement Waterproofing",
      desc: "Stop water before it becomes damage. We protect basements from seepage, flooding, and long-term moisture issues, keeping lower levels dry, safe, and structurally sound.",
      icon: <Home className="text-gold" size={28} strokeWidth={1.5} />
    },
    {
      title: "Wall Waterproofing",
      desc: "No more damp walls or hidden leaks. Our internal and external wall waterproofing solutions prevent water penetration while protecting finishes and structural integrity.",
      icon: <Box className="text-gold" size={28} strokeWidth={1.5} />
    },
    {
      title: "Slab / Rooftop Waterproofing",
      desc: "Your first line of defense against water. We secure rooftops and slabs with durable waterproofing systems that help prevent leaks, cracks, and weather-related damage.",
      icon: <Layers className="text-gold" size={28} strokeWidth={1.5} />
    },
    {
      title: "Swimming Pool Waterproofing",
      desc: "Built to hold water, not lose it. We solve pool leakage issues with professional waterproofing systems designed for long-term reliability and protection.",
      icon: <Waves className="text-gold" size={28} strokeWidth={1.5} />
    },
    {
      title: "Water Tank Waterproofing",
      desc: "Safe storage starts with proper sealing. We waterproof water tanks and reservoirs to help prevent leakage, contamination, and structural wear over time.",
      icon: <Droplets className="text-gold" size={28} strokeWidth={1.5} />
    },
    {
      title: "Bathroom & Kitchen Waterproofing",
      desc: "Protect the most water-exposed spaces. We seal wet areas to stop leakage into floors and walls, helping avoid hidden damage, mold, and costly repairs.",
      icon: <Bath className="text-gold" size={28} strokeWidth={1.5} />
    }
  ];

  // Triple the items to ensure seamless loop
  const duplicatedServices = [...services, ...services, ...services];

  return (
    <section className="py-32 bg-bg overflow-hidden border-t border-white/5 relative">
      <div 
        className="relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-20 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-6 px-6"
            animate={{
              x: isPaused ? undefined : ["0%", "-33.333%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            style={{ width: "max-content" }}
          >
            {duplicatedServices.map((service, idx) => (
              <div 
                key={idx}
                className="w-[280px] md:w-[340px] lg:w-[400px] flex-shrink-0 glass-card p-10 rounded-2xl border border-white/5 hover:border-gold/20 hover:-translate-y-2 transition-all duration-500 group/card flex flex-col h-full"
              >
                <div className="w-16 h-16 rounded-xl bg-gold/5 flex items-center justify-center mb-8 border border-gold/10 group-hover/card:bg-gold/10 transition-colors duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-5 tracking-tight">{service.title}</h3>
                <p className="text-grey-1 text-base leading-relaxed opacity-70 group-hover/card:opacity-100 transition-opacity">
                  {service.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TechniquesSection = () => {
  const leftItems = [
    {
      title: "Waterproofing",
      desc: "Protect your property from the inside out. We deliver reliable waterproofing solutions using proven methods and modern materials — built to prevent leaks, dampness, and long-term structural damage across residential, commercial, and industrial spaces."
    },
    {
      title: "Joint Sealing & Grouting",
      desc: "Precision sealing that holds everything together. We ensure strong, durable joints using high-quality materials and expert techniques — preventing water penetration while maintaining structural integrity over time."
    },
    {
      title: "Thermal Insulation & Protection",
      desc: "Smarter temperature control, better efficiency. Our insulation solutions help regulate indoor conditions, reduce heat impact, and improve energy efficiency — keeping your spaces comfortable year-round."
    }
  ];

  const rightItems = [
    {
      title: "Specialized Coatings",
      desc: "Built to protect. Designed to last. Our advanced coating systems enhance surface durability, resist environmental damage, and extend the life of your structures — ideal for both functional protection and performance."
    },
    {
      title: "Concrete Repair & Rehabilitation",
      desc: "Restore strength. Extend lifespan. From minor cracks to major structural repairs, we bring damaged concrete back to life with reliable solutions that improve durability and performance."
    },
    {
      title: "Industrial Flooring",
      desc: "Engineered for strength and performance. We provide durable, low-maintenance flooring systems designed to handle heavy use — improving safety, efficiency, and long-term reliability in industrial environments."
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center py-32 overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://player.vimeo.com/external/494252666.hd.mp4?s=2f5d513b051255913fd25c6e7313072d96d36395&profile_id=175" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-10" />
      </div>

      <div className="container relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Intro */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-24 text-center lg:text-left"
          >
            <span className="eyebrow mb-4">Our Techniques</span>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] mb-6">
              Built for Long-Term <br /> Protection
            </h2>
            <p className="text-grey-1 text-xl font-light max-w-2xl">
              Advanced surface protection and restoration solutions for modern structures.
            </p>
          </motion.div>

          {/* Grid with Center Gap */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.4fr_1fr] gap-12 lg:gap-0">
            {/* Left Column */}
            <div className="space-y-20">
              {leftItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="group"
                >
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight uppercase group-hover:text-gold transition-colors duration-500">
                    {item.title}
                  </h3>
                  <div className="w-12 h-px bg-gold/40 mb-6 group-hover:w-full transition-all duration-700" />
                  <p className="text-grey-1 text-base leading-relaxed font-light">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Center Gap (Empty) */}
            <div className="hidden lg:block" />

            {/* Right Column */}
            <div className="space-y-20">
              {rightItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="group"
                >
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight uppercase group-hover:text-gold transition-colors duration-500">
                    {item.title}
                  </h3>
                  <div className="w-12 h-px bg-gold/40 mb-6 group-hover:w-full transition-all duration-700" />
                  <p className="text-grey-1 text-base leading-relaxed font-light">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WaterproofingPage = () => {
  return (
    <div className="w-screen h-full overflow-y-auto overflow-x-hidden">
      <Hero 
        title={<>We Keep<br />Every Drop Out.</>}
        subtitle={<>From foundation to rooftop, we deliver professional<br />waterproofing systems that protect your investment from<br />moisture, leaks, and structural wear.</>}
        layout="split"
        videoId="830d2a3064766517a9227295a7ffd2ad"
      />
      <MainServicesCarousel />
      
      <section className="relative py-40 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1e2328_0%,#14181c_100%)]">
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_0.7fr] gap-12 lg:gap-24 items-center">
            
            {/* Left Side: Editorial Problems */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="eyebrow !text-gold mb-6 block">Why It Matters</span>
              <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter text-white mb-16 leading-[1.1]">
                The Problems <br /> 
                <span className="font-bold text-white/90 italic">We Eliminate.</span>
              </h2>
              
              <div className="space-y-4 max-w-xl">
                {['Roof leaks & Concrete Cracks', 'Bathroom & Wet Area Seepage', 'Basement Flooring & Rising Damp', 'Exterior Wall Dampness', 'Foundation & Structure Water Damage'].map((p, i) => (
                  <motion.div 
                    key={p}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
                    className="group relative h-[46px] flex items-center bg-gold/[0.03] border border-gold/[0.08] rounded-md px-6 hover:bg-gold/[0.08] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,207,83,0.05)] transition-all duration-500 cursor-default overflow-hidden"
                  >
                    <div className="absolute inset-y-0 left-0 w-1 bg-gold/0 group-hover:bg-gold/40 transition-all duration-500" />
                    <span className="text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-[#999999] group-hover:text-white transition-colors duration-500 font-medium">
                      {p}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Center: Glowing Pulse Line */}
            <div className="hidden lg:flex items-center justify-center h-[500px] relative">
              <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-gold/50 to-transparent relative">
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gold rounded-full shadow-[0_0_20px_#ffcf53]"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-gold/30 rounded-full"
                  animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Right Side: Glass Solutions */}
            <div className="space-y-6">
              {[
                { label: 'Primary Defense', title: 'Membrane Systems', desc: 'High-performance torch-on and liquid membranes.' },
                { label: 'Deep Protection', title: 'Crystalline Tech', desc: 'Deep penetration sealing for concrete structures.' },
                { label: 'Structural Seal', title: 'Grout Injection', desc: 'Precision sealing for cracks and construction joints.' },
              ].map((s, i) => (
                <motion.div 
                  key={i}
                  className="glass-card !bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-8 rounded-2xl hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-500 shadow-2xl relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.15), duration: 0.8 }}
                >
                  <div className="absolute top-0 right-8 h-1 w-0 group-hover:w-16 bg-gold transition-all duration-700" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold/60 font-semibold mb-3 block">
                    {s.label}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-gold transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-white/50 text-[13px] leading-relaxed font-light">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TechniquesSection />

      <section className="bg-bg py-40 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
            {/* Left side: Cinematic Image */}
            <motion.div 
              className="relative group rounded-[2.5rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] h-full min-h-[600px]"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <img 
                src="https://imagedelivery.net/el9pEPAD6kV02rsnFsj9dg/66343139-f562-4d69-f479-4aa125d8b500/public" 
                alt="Waterproofing Protection Detail" 
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-bg/40 to-transparent" />
              
              {/* Inner subtle frame */}
              <div className="absolute inset-8 border border-white/10 rounded-[2rem] pointer-events-none" />
              
              {/* Floating Badge on Image */}
              <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center">
                    <ShieldCheck className="text-gold" size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-bold block mb-1">Protection Level</span>
                    <span className="text-white text-sm font-medium">Certified Industrial Standard</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side: Content Block */}
            <motion.div
              className="h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative h-full flex flex-col justify-center p-10 lg:p-16 border border-white/[0.05] bg-white/[0.01] backdrop-blur-sm rounded-[3rem] shadow-2xl">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-[1px] border-l-[1px] border-gold/20 rounded-tl-[3rem]" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[1px] border-r-[1px] border-gold/20 rounded-br-[3rem]" />

                <div className="w-16 h-16 border border-gold/30 rounded-2xl flex items-center justify-center mb-10 bg-gold/5 shadow-[0_0_40px_rgba(255,207,83,0.1)]">
                  <Shield size={32} className="text-gold" />
                </div>

                <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tight">
                  Protecting <br />
                  <span className="italic font-extralight text-white/80">Every</span> <span className="text-gold">Drop.</span>
                </h2>

                <p className="text-[#888] text-lg md:text-xl mb-12 max-w-[500px] leading-relaxed font-light">
                  Our comprehensive 15-year guarantee covers all structural treatments, ensuring your investment remains dry, secure, and protected against the elements.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {['All application defects', 'Material failure', 'Water ingress', 'Annual inspection'].map(t => (
                    <div key={t} className="flex items-center space-x-3 bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl group hover:bg-white/[0.04] transition-all duration-300">
                      <Check className="text-gold shrink-0 group-hover:scale-110 transition-transform" size={16} />
                      <span className="text-[11px] text-white/60 font-semibold uppercase tracking-[0.15em] group-hover:text-white transition-colors">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                  <motion.div 
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: "0 20px 40px rgba(255, 207, 83, 0.4)"
                    }}
                    className="inline-block px-12 py-6 bg-gold text-bg font-black tracking-[0.25em] text-[13px] rounded-full shadow-[0_10px_30px_rgba(255,207,83,0.2)] cursor-pointer transition-colors hover:bg-[#ffda7c]"
                  >
                    15 YEAR GUARANTEE
                  </motion.div>
                  <div className="flex items-center">
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] border-l border-white/10 pl-6 h-8 flex items-center">Certified Protection</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTA heading="Stop Water Damage Before It Starts." />
      <Footer />
    </div>
  );
};

const AboutPage = () => (
  <div className="w-screen h-full overflow-y-auto overflow-x-hidden pt-20">
    <section>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="stats-left flex flex-col justify-center">
            <span className="eyebrow">About Us</span>
            <h2 className="heading-lg">Built on Sri Lankan Soil. Built to Last.</h2>
            <p className="body-text mb-5 max-w-[480px]">
              MaterFloors was founded with a simple mission: to bring world-class construction standards to Sri Lanka. 
              Over the past 15 years, we have grown from a small flooring specialist into a full-service construction firm.
            </p>
            <p className="body-text mb-7 max-w-[480px]">
              Our team consists of dedicated engineers, architects, and master craftsmen who share a passion for building spaces that inspire.
            </p>
            <div className="internal-links">
              {['Who We Are', 'Our Values', 'Our Team', 'Founders'].map(l => (
                <button key={l} className="internal-link">
                  <span className="internal-link-arrow">▶</span> {l}
                </button>
              ))}
            </div>
          </div>
          <div className="flex">
            <div className="panel-divider ml-15 hidden lg:block" />
            <div className="stats-right flex-1 space-y-8 flex flex-col justify-center">
              {[
                { val: '350+', label: 'Projects Completed' },
                { val: '15', label: 'Years Of Experience' },
                { val: '3', label: 'Core Services' },
              ].map(s => (
                <div key={s.label} className="stat-item">
                  <span className="stat-number">{s.val}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#22272c]">
      <div className="container">
        <span className="eyebrow section-eyebrow">Our Values</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { t: 'Quality', d: 'Uncompromising standards in every project.' },
            { t: 'Reliability', d: 'On time, on budget, every time.' },
            { t: 'Transparency', d: 'Clear communication start to finish.' },
            { t: 'Craftsmanship', d: '15 years of perfecting our trade.' },
          ].map((v, i) => (
            <div key={i} className="glass-card group">
              <span className="absolute right-5 top-5 text-3xl font-bold text-gold/10 group-hover:text-gold/20 transition-colors">0{i+1}</span>
              <h4 className="text-gold font-bold mb-2.5 text-sm">{v.t}</h4>
              <p className="text-[12px] text-grey-1 leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTA heading="Let's Build Something Together." />
    <Footer />
  </div>
);

const ContactPage = () => (
  <div className="w-screen h-full overflow-y-auto overflow-x-hidden pt-20">
    <section>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
          <div>
            <span className="eyebrow">Get In Touch</span>
            <h2 className="heading-lg mb-8">Let's Talk About Your Project.</h2>
            <div className="space-y-5 mb-9">
              {[
                { icon: <Phone size={14} />, label: 'Phone', val: '+94 77 002 9792' },
                { icon: <MessageCircle size={14} />, label: 'WhatsApp', val: '+94 77 002 9792' },
                { icon: <Mail size={14} />, label: 'Email', val: 'info@materfloors.lk' },
                { icon: <MapPin size={14} />, label: 'Address', val: '123 Construction Way, Colombo, Sri Lanka' },
                { icon: <Clock size={14} />, label: 'Hours', val: 'Mon–Sat 8:00am – 6:00pm' },
              ].map((item, i) => (
                <div key={i} className="flex items-center text-white">
                  <div className="text-gold mr-3.5">{item.icon}</div>
                  <span className="text-[13px]"><span className="text-grey-1 mr-2">{item.label}:</span> {item.val}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.open('https://wa.me/94770029792', '_blank')}
              className="bg-[#25D366] text-white px-9 py-4 rounded-[4px] flex items-center font-bold text-sm uppercase tracking-widest hover:bg-[#20bd5a] hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <MessageCircle className="mr-3 fill-white" size={20} /> Chat on WhatsApp
            </button>
          </div>
          <div className="flex">
            <div className="panel-divider mr-15 hidden lg:block" />
            <div className="glass-card flex-1 !p-6">
              <form className="space-y-3.5" onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder="Name" className="w-full bg-white/5 border border-gold/15 rounded-md p-3 text-xs text-white focus:border-gold/50 outline-none" />
                <input type="tel" placeholder="Phone" className="w-full bg-white/5 border border-gold/15 rounded-md p-3 text-xs text-white focus:border-gold/50 outline-none" />
                <input type="email" placeholder="Email" className="w-full bg-white/5 border border-gold/15 rounded-md p-3 text-xs text-white focus:border-gold/50 outline-none" />
                <select className="w-full bg-white/5 border border-gold/15 rounded-md p-3 text-xs text-white focus:border-gold/50 outline-none">
                  <option className="bg-bg">Home Construction</option>
                  <option className="bg-bg">Flooring</option>
                  <option className="bg-bg">Waterproofing</option>
                  <option className="bg-bg">Other</option>
                </select>
                <textarea placeholder="Message" rows={3} className="w-full bg-white/5 border border-gold/15 rounded-md p-3 text-xs text-white focus:border-gold/50 outline-none" />
                <button className="w-full btn-primary py-3.5">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <div className="h-[350px] bg-grey-2 relative border-y border-gold/10">
      <div className="absolute inset-0 flex items-center justify-center text-grey-1 text-sm">
        [Google Maps Embed - Colombo, Sri Lanka]
      </div>
      <div className="absolute bottom-6 left-6 bg-bg/90 backdrop-blur border border-gold/20 p-4 rounded-md">
        <h4 className="text-white font-bold text-xs mb-1">MaterFloors HQ</h4>
        <p className="text-grey-1 text-[10px] mb-3">123 Construction Way, Colombo</p>
        <button className="text-gold text-[9px] uppercase font-bold tracking-widest">Get Directions →</button>
      </div>
    </div>

    <div className="py-8 text-center text-grey-1 text-[10px] uppercase tracking-widest">
      We serve Colombo and surrounding districts including Gampaha, Kalutara, Kandy
    </div>
    <Footer />
  </div>
);

// --- Main App ---

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAbout, setIsAbout] = useState(false);
  const [isContact, setIsContact] = useState(false);

  const handleNavigate = (index: number) => {
    if (index === 3) {
      setIsAbout(true);
      setIsContact(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (index === 4) {
      setIsAbout(false);
      setIsContact(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAbout(false);
      setIsContact(false);
      setActiveIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-bg min-h-screen overflow-x-hidden font-sans selection:bg-gold selection:text-bg">
      <Navbar 
        activeIndex={activeIndex} 
        onNavigate={handleNavigate} 
        isAbout={isAbout} 
        isContact={isContact} 
      />

      <main className="relative">
        {!isAbout && !isContact ? (
          <div className="w-screen h-screen overflow-hidden">
            <motion.div 
              className="flex w-[300vw] h-full"
              animate={{ x: `-${activeIndex * 100}vw` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <ConstructionPage />
              <FlooringPage />
              <WaterproofingPage />
            </motion.div>

            {/* Side Tabs */}
            {activeIndex < 2 && (
              <SideTab 
                direction="right" 
                label={SERVICES[activeIndex + 1].name} 
                onClick={() => handleNavigate(activeIndex + 1)} 
              />
            )}
            {activeIndex > 0 && (
              <SideTab 
                direction="left" 
                label={SERVICES[activeIndex - 1].name} 
                onClick={() => handleNavigate(activeIndex - 1)} 
              />
            )}
          </div>
        ) : isAbout ? (
          <AboutPage />
        ) : (
          <ContactPage />
        )}
      </main>

      <WhatsAppBubble />
      <ScrollToTop />
    </div>
  );
}
