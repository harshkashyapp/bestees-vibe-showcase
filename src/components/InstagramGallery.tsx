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
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Instagram size={20} />
          <span className="font-body text-sm text-muted-foreground">@bestees</span>
        </div>
        <h2 className="brand-heading text-3xl md:text-4xl">Follow the Vibe</h2>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
        {images.map((img, i) => (
          <motion.a
            key={i}
            href="#"
            className="relative aspect-square overflow-hidden group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <img src={img} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-center justify-center">
              <Instagram className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default InstagramGallery;
