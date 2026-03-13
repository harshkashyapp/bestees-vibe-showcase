import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collections, products } from "@/data/products";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import heroMain from "@/assets/hero-main.jpg";
import productHoodieBeige from "@/assets/product-hoodie-beige.jpg";
import productTshirtBlack from "@/assets/product-tshirt-black.jpg";

const collectionImages: Record<string, string> = {
  "new-drops": heroMain,
  "best-sellers": lifestyle1,
  "t-shirts": productTshirtBlack,
  "hoodies": productHoodieBeige,
  "oversized": lifestyle2,
};

const Collections = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="pt-28 pb-8 section-padding border-b border-border">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="text-muted-foreground text-[11px]">/</span>
          <span className="font-body text-[11px] uppercase tracking-[0.2em] text-foreground">
            Collections
          </span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl md:text-8xl uppercase tracking-wide"
        >
          Collections
        </motion.h1>
      </div>

      {/* Collection Grid */}
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.map((col, i) => (
            <motion.div
              key={col.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <Link
                to={`/shop?category=${col.slug}`}
                className={`group relative block overflow-hidden bg-card ${
                  i === 0 ? "aspect-[21/9]" : "aspect-[4/3]"
                }`}
              >
                <motion.img
                  src={collectionImages[col.slug] || lifestyle1}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="editorial-label text-primary-foreground/50 mb-2">{col.count} pieces</p>
                  <div className="flex items-end justify-between">
                    <h3 className={`font-display uppercase text-primary-foreground tracking-wide ${
                      i === 0 ? "text-5xl md:text-7xl" : "text-3xl md:text-5xl"
                    }`}>
                      {col.name}
                    </h3>
                    <ArrowUpRight
                      className="text-primary-foreground/60 group-hover:text-primary-foreground transition-colors mb-1"
                      size={i === 0 ? 28 : 22}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Collections;
