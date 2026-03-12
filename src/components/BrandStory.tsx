import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import lifestyle2 from "@/assets/lifestyle-2.jpg";

const BrandStory = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={ref} className="section-padding overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Our Story</p>
          <h2 className="brand-heading text-3xl md:text-5xl leading-tight mb-6">
            Built for<br />those who<br />move different
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-md">
            Bestees was born from the idea that what you wear should feel as good as it looks. We create premium essentials 
            that bridge the gap between streetwear and everyday comfort — designed for the culture, built to last.
          </p>
          <Link
            to="/about"
            className="inline-block border border-foreground text-foreground font-display text-sm uppercase tracking-widest px-8 py-3 hover:bg-foreground hover:text-primary-foreground transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>
        <motion.div
          className="relative aspect-[3/4] overflow-hidden rounded-sm"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={lifestyle2}
            alt="Bestees lifestyle"
            className="w-full h-full object-cover"
            style={{ y }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStory;
