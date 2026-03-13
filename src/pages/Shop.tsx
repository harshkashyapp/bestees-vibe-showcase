import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Grid3X3, LayoutGrid, ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "T-Shirts", "Hoodies", "Oversized", "New Drops"];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(
    initialCategory
      ? categories.find(c => c.toLowerCase().replace(/\s+/g, "-") === initialCategory) || "All"
      : "All"
  );
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return products;
    if (activeCategory === "New Drops") return products.filter(p => p.isNewDrop);
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page header */}
      <div className="pt-28 pb-8 section-padding border-b border-border">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="text-muted-foreground text-[11px]">/</span>
          <span className="font-body text-[11px] uppercase tracking-[0.2em] text-foreground">
            Shop
          </span>
        </div>
        <div className="flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-6xl md:text-8xl uppercase tracking-wide">
              {activeCategory === "All" ? "All Products" : activeCategory}
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-2">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>
          </motion.div>

          {/* Grid toggle (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setGridCols(3)}
              className={`p-2 transition-colors ${gridCols === 3 ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="3 columns"
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-2 transition-colors ${gridCols === 4 ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="4 columns"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="section-padding !py-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 py-6 border-b border-border overflow-x-auto scrollbar-hide"
        >
          <SlidersHorizontal size={14} className="text-muted-foreground flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-[11px] uppercase tracking-[0.15em] font-medium px-5 py-2.5 border whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Product Grid */}
      <div className="section-padding !pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid grid-cols-2 gap-4 md:gap-6 ${
              gridCols === 3 ? "md:grid-cols-3" : "md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-body text-muted-foreground text-sm">No products found in this category.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 font-body text-[11px] uppercase tracking-[0.2em] font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              View all products
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
