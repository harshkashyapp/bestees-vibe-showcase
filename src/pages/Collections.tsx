import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import { collections } from "@/data/products";
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

const collectionDescriptions: Record<string, string> = {
  "new-drops": "Fresh styles just landed. Be the first to wear the latest.",
  "best-sellers": "The pieces everyone loves. Tried, tested, and always in demand.",
  "t-shirts": "Premium cotton tees built for everyday. The foundation of your wardrobe.",
  "hoodies": "Heavyweight comfort meets street-ready style.",
  "oversized": "Relaxed fits that make a statement. Comfort without compromise.",
};

const Collections = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />

        <PageHeader
          title="Collections"
          subtitle={`${collections.length} collections`}
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Collections" },
          ]}
        />

        {/* Featured Collection - Full Width */}
        <div className="section-padding !pb-0">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/shop?category=${collections[0].slug}`}
              className="group relative block aspect-[21/9] overflow-hidden bg-card"
            >
              <motion.img
                src={collectionImages[collections[0].slug]}
                alt={collections[0].name}
                className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="editorial-label text-primary-foreground/50 mb-2"
                >
                  {collections[0].count} pieces
                </motion.p>
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase text-primary-foreground tracking-wide">
                      {collections[0].name}
                    </h2>
                    <p className="font-body text-sm text-primary-foreground/50 mt-2 max-w-md hidden md:block">
                      {collectionDescriptions[collections[0].slug]}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="text-primary-foreground/40 group-hover:text-primary-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={32}
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Collection Grid */}
        <div className="section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.slice(1).map((col, i) => (
              <motion.div
                key={col.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/shop?category=${col.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-card"
                >
                  <motion.img
                    src={collectionImages[col.slug] || lifestyle1}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                    <p className="editorial-label text-primary-foreground/50 mb-2">{col.count} pieces</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-display text-3xl md:text-5xl uppercase text-primary-foreground tracking-wide">
                          {col.name}
                        </h3>
                        <p className="font-body text-xs text-primary-foreground/40 mt-1 max-w-xs hidden md:block">
                          {collectionDescriptions[col.slug]}
                        </p>
                      </div>
                      <ArrowUpRight
                        className="text-primary-foreground/40 group-hover:text-primary-foreground transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        size={22}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-padding !pt-0"
        >
          <div className="bg-foreground text-primary-foreground p-12 md:p-20 text-center">
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-primary-foreground/40 mb-4">
              Can't decide?
            </p>
            <h3 className="font-display text-4xl md:text-6xl uppercase tracking-wide mb-6">
              Shop Everything
            </h3>
            <Link
              to="/shop"
              className="inline-block font-body text-[11px] uppercase tracking-[0.2em] font-medium border border-primary-foreground/30 px-10 py-4 hover:bg-primary-foreground hover:text-foreground transition-all duration-500"
            >
              View All Products
            </Link>
          </div>
        </motion.div>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Collections;
