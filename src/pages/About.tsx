import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import heroMain from "@/assets/hero-main.jpg";

const values = [
  { title: "Quality First", desc: "Premium materials, meticulous construction. Every piece is built to last." },
  { title: "Street Culture", desc: "Rooted in the streets, inspired by movement. We design for real life." },
  { title: "Sustainability", desc: "Ethical production, responsible sourcing. Fashion that respects the planet." },
];

const About = () => {
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <img src={heroMain} alt="Bestees" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-primary-foreground"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Est. 2024</p>
          <h2 className="brand-heading text-3xl md:text-4xl mb-6">More Than Clothes</h2>
          <p className="font-body text-muted-foreground leading-relaxed text-lg">
            Bestees started as a simple idea: create the perfect wardrobe essentials that don't compromise on quality, 
            comfort, or style. What began in a small studio has grown into a movement — a community of people who 
            believe that what you wear should reflect who you are.
          </p>
        </motion.div>
      </section>

      {/* Parallax Image */}
      <section ref={parallaxRef} className="relative h-[50vh] overflow-hidden">
        <motion.img
          src={lifestyle1}
          alt="Lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: imgY }}
        />
      </section>

      {/* Values */}
      <section className="section-padding">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="brand-heading text-3xl md:text-4xl text-center mb-16"
        >
          What We Stand For
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-3">{v.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Our Vision</p>
            <h2 className="brand-heading text-3xl md:text-4xl leading-tight mb-6">
              Redefining everyday wear
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              We envision a world where premium quality isn't a luxury — it's the standard. Every Bestees piece 
              is designed to make you feel confident, comfortable, and authentically you. No logos screaming for 
              attention, just clean design that speaks for itself.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-square overflow-hidden rounded-sm"
          >
            <img src={lifestyle2} alt="Vision" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
