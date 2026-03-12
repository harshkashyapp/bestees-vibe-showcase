import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-main.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax BG */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img src={heroImage} alt="Bestees streetwear" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-sm uppercase tracking-[0.3em] text-primary-foreground/80 mb-4"
        >
          Spring / Summer 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter text-primary-foreground"
        >
          Bestees
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-lg md:text-xl uppercase tracking-[0.2em] text-primary-foreground/90 mt-2"
        >
          Wear Your Vibe
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex gap-4"
        >
          <Link
            to="/shop"
            className="bg-primary-foreground text-foreground font-display text-sm uppercase tracking-widest px-8 py-3.5 hover:bg-primary-foreground/90 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            to="/about"
            className="border border-primary-foreground text-primary-foreground font-display text-sm uppercase tracking-widest px-8 py-3.5 hover:bg-primary-foreground/10 transition-colors"
          >
            Our Story
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
