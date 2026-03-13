import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import productHoodieBeige from "@/assets/product-hoodie-beige.jpg";
import productTshirtBlack from "@/assets/product-tshirt-black.jpg";
import productSweatshirtCream from "@/assets/product-sweatshirt-cream.jpg";
import heroMain from "@/assets/hero-main.jpg";

const images = [lifestyle1, productHoodieBeige, lifestyle2, productTshirtBlack, productSweatshirtCream, heroMain];

const InstagramGallery = () => {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 px-6"
      >
        <p className="editorial-label mb-3">@bestees</p>
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wide">Follow the Vibe</h2>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-6">
        {images.map((img, i) => (
          <motion.a
            key={i}
            href="#"
            className="relative aspect-square overflow-hidden group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <img
              src={img}
              alt={`Instagram post ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500 flex items-center justify-center">
              <Instagram
                className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100"
                size={22}
                strokeWidth={1.5}
              />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default InstagramGallery;
