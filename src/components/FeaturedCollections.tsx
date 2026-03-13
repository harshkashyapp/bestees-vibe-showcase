import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/products";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import productHoodieBeige from "@/assets/product-hoodie-beige.jpg";

const collectionImages = [lifestyle1, lifestyle2, productHoodieBeige];

const FeaturedCollections = () => {
  return (
    <section className="section-padding">
      <div className="flex items-end justify-between mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="editorial-label mb-3">Curated For You</p>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wide">Collections</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            View All <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Asymmetric bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
        {/* Large card */}
        <motion.div
          className="md:col-span-7 md:row-span-2"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to={`/shop?category=${collections[0].slug}`}
            className="group relative block aspect-[4/5] md:aspect-auto md:h-full overflow-hidden bg-card"
          >
            <motion.img
              src={collectionImages[0]}
              alt={collections[0].name}
              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="editorial-label text-primary-foreground/50 mb-2">{collections[0].count} pieces</p>
              <div className="flex items-end justify-between">
                <h3 className="font-display text-4xl md:text-5xl uppercase text-primary-foreground tracking-wide">
                  {collections[0].name}
                </h3>
                <ArrowUpRight className="text-primary-foreground/60 group-hover:text-primary-foreground transition-colors mb-1" size={22} />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Smaller cards */}
        {collections.slice(1, 3).map((col, i) => (
          <motion.div
            key={col.slug}
            className="md:col-span-5"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/shop?category=${col.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden bg-card"
            >
              <motion.img
                src={collectionImages[(i + 1) % collectionImages.length]}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="editorial-label text-primary-foreground/50 mb-1">{col.count} pieces</p>
                <div className="flex items-end justify-between">
                  <h3 className="font-display text-2xl md:text-3xl uppercase text-primary-foreground tracking-wide">
                    {col.name}
                  </h3>
                  <ArrowUpRight className="text-primary-foreground/60 group-hover:text-primary-foreground transition-colors" size={18} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;
