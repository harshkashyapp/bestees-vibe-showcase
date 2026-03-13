import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import lifestyle2 from "@/assets/lifestyle-2.jpg";

const BrandStory = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[90vh]">
        {/* Image side */}
        <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
          <motion.img
            src={lifestyle2}
            alt="Bestees lifestyle"
            className="w-full h-[120%] object-cover absolute top-0"
            style={{ y }}
          />
        </div>

        {/* Text side */}
        <div className="flex items-center px-8 md:px-20 py-20 md:py-0 bg-background">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg"
          >
            <p className="editorial-label mb-6">Our Story</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-wide leading-[0.95] mb-8">
              Built for<br />
              those who<br />
              move different
            </h2>
            <p className="font-body text-muted-foreground leading-[1.8] mb-4 text-sm">
              Bestees was born from the idea that what you wear should feel as good as it looks.
            </p>
            <p className="font-body text-muted-foreground leading-[1.8] mb-10 text-sm">
              We create premium essentials that bridge the gap between streetwear and everyday comfort — 
              designed for the culture, built to last.
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.2em] font-medium text-foreground border-b border-foreground pb-2 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-300"
            >
              Read Our Story
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
