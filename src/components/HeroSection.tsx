import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-main.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const letterVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.8 + i * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const brandName = "BESTEES";

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-foreground">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={heroImage}
          alt="Bestees streetwear collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        {/* Season label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="editorial-label text-primary-foreground/60 mb-6"
        >
          Spring / Summer 2026
        </motion.p>

        {/* Brand name with per-letter reveal */}
        <div className="overflow-hidden">
          <h1 className="font-display text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] font-normal uppercase text-primary-foreground flex">
            {brandName.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden mt-4">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-sm md:text-base uppercase tracking-[0.4em] text-primary-foreground/70 font-light"
          >
            Wear Your Vibe
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex gap-4"
        >
          <Link
            to="/shop"
            className="group relative bg-primary-foreground text-foreground font-body text-xs uppercase tracking-[0.2em] font-medium px-10 py-4 overflow-hidden transition-colors duration-500 hover:bg-foreground hover:text-primary-foreground"
          >
            Shop Collection
          </Link>
          <Link
            to="/about"
            className="border border-primary-foreground/40 text-primary-foreground font-body text-xs uppercase tracking-[0.2em] font-medium px-10 py-4 hover:bg-primary-foreground/10 transition-all duration-500"
          >
            Our Story
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-primary-foreground/40">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-primary-foreground/30"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
