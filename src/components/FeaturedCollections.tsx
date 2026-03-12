import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { collections } from "@/data/products";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import productHoodieBeige from "@/assets/product-hoodie-beige.jpg";

const collectionImages = [lifestyle1, lifestyle2, productHoodieBeige];

const FeaturedCollections = () => {
  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-12"
      >
        <h2 className="brand-heading text-3xl md:text-5xl">Collections</h2>
        <Link to="/shop" className="hidden md:flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
          View All <ArrowRight size={16} />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collections.slice(0, 3).map((col, i) => (
          <motion.div
            key={col.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <Link
              to={`/shop?category=${col.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-card rounded-sm"
            >
              <motion.img
                src={collectionImages[i % collectionImages.length]}
                alt={col.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors duration-500" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-display text-2xl font-bold uppercase text-primary-foreground">{col.name}</h3>
                <p className="font-body text-sm text-primary-foreground/70 mt-1">{col.count} items</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;
