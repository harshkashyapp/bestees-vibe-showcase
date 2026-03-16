import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import heroMain from "@/assets/hero-main.jpg";

const values = [
  { number: "01", title: "Quality First", desc: "Premium materials, meticulous construction. Every piece is built to last beyond seasons and trends." },
  { number: "02", title: "Street Culture", desc: "Rooted in the streets, inspired by movement. We design for real life, not runways." },
  { number: "03", title: "Sustainability", desc: "Ethical production, responsible sourcing. Fashion that respects the planet and the people who make it." },
  { number: "04", title: "Community", desc: "More than a brand — a movement. Built by and for the people who wear their vibe." },
];

const About = () => {
  const parallaxRef1 = useRef(null);
  const parallaxRef2 = useRef(null);
  const { scrollYProgress: sp1 } = useScroll({ target: parallaxRef1, offset: ["start end", "end start"] });
  const { scrollYProgress: sp2 } = useScroll({ target: parallaxRef2, offset: ["start end", "end start"] });
  const imgY1 = useTransform(sp1, [0, 1], ["10%", "-10%"]);
  const imgY2 = useTransform(sp2, [0, 1], ["10%", "-10%"]);

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="relative h-[80vh] overflow-hidden">
          <motion.img
            src={heroMain}
            alt="Bestees"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-body text-[11px] uppercase tracking-[0.4em] text-primary-foreground/50 mb-6"
            >
              Est. 2024
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-9xl uppercase tracking-wider text-primary-foreground"
            >
              Our Story
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-px bg-primary-foreground/40 mt-8"
            />
          </div>
        </section>

        {/* Origin Story */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            <motion.div
              className="md:col-span-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="editorial-label mb-4">The Beginning</p>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide leading-[0.95]">
                More Than Just Clothes
              </h2>
            </motion.div>
            <motion.div
              className="md:col-span-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-body text-muted-foreground leading-[1.9] text-base mb-6">
                Bestees started as a simple idea: create the perfect wardrobe essentials that don't compromise
                on quality, comfort, or style. What began in a small studio has grown into a movement — a
                community of people who believe that what you wear should reflect who you are.
              </p>
              <p className="font-body text-muted-foreground leading-[1.9] text-base">
                We don't chase trends. We create pieces that stand the test of time — wardrobe staples that
                feel as premium on day one hundred as they do on day one. Every stitch, every fabric choice,
                every detail is intentional.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Parallax Image 1 */}
        <section ref={parallaxRef1} className="relative h-[60vh] overflow-hidden">
          <motion.img
            src={lifestyle1}
            alt="Lifestyle"
            className="absolute inset-0 w-full h-[130%] object-cover"
            style={{ y: imgY1 }}
          />
          <div className="absolute inset-0 bg-foreground/10" />
        </section>

        {/* Values */}
        <section className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="editorial-label mb-3">What Drives Us</p>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wide">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-background p-8 md:p-12 group"
              >
                <span className="font-display text-6xl md:text-7xl text-muted-foreground/10 group-hover:text-muted-foreground/20 transition-colors duration-500">
                  {v.number}
                </span>
                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-wide mt-4 mb-4">{v.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-[1.8] max-w-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
            <div className="flex items-center px-8 md:px-20 py-20 md:py-0 order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-lg"
              >
                <p className="editorial-label mb-6">Our Vision</p>
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-wide leading-[0.95] mb-8">
                  Redefining<br />
                  Everyday<br />
                  Wear
                </h2>
                <p className="font-body text-muted-foreground leading-[1.8] mb-4 text-sm">
                  We envision a world where premium quality isn't a luxury — it's the standard. Every Bestees
                  piece is designed to make you feel confident, comfortable, and authentically you.
                </p>
                <p className="font-body text-muted-foreground leading-[1.8] mb-10 text-sm">
                  No logos screaming for attention, just clean design that speaks for itself.
                </p>
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.2em] font-medium text-foreground border-b border-foreground pb-2 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-300"
                >
                  Explore the Collection
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>
            <div ref={parallaxRef2} className="relative aspect-[3/4] md:aspect-auto overflow-hidden order-1 md:order-2">
              <motion.img
                src={lifestyle2}
                alt="Vision"
                className="w-full h-[130%] object-cover absolute top-0"
                style={{ y: imgY2 }}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-foreground text-primary-foreground py-24 md:py-32 text-center"
        >
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-primary-foreground/40 mb-6">
            Join the Movement
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-wide mb-10">
            Wear Your Vibe
          </h2>
          <Link
            to="/shop"
            className="inline-block font-body text-[11px] uppercase tracking-[0.2em] font-medium border border-primary-foreground/30 text-primary-foreground px-12 py-4 hover:bg-primary-foreground hover:text-foreground transition-all duration-500"
          >
            Shop Now
          </Link>
        </motion.section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;
