import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Star, Heart, Truck, RotateCcw, Shield } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  if (!product) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <p className="font-body text-muted-foreground">Product not found.</p>
        </div>
      </PageTransition>
    );
  }

  const images = [product.image, product.hoverImage];
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const moreRelated = related.length < 4
    ? [...related, ...products.filter(p => p.id !== product.id && !related.includes(p)).slice(0, 4 - related.length)]
    : related;

  const handleAdd = () => {
    if (!selectedSize) return;
    for (let i = 0; i < quantity; i++) addItem(product, selectedSize);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 section-padding">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-8">
            <Link to="/" className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground text-[11px]">/</span>
            <Link to="/shop" className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </Link>
            <span className="text-muted-foreground text-[11px]">/</span>
            <span className="font-body text-[11px] uppercase tracking-[0.2em] text-foreground">
              {product.name}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative aspect-[3/4] bg-card overflow-hidden cursor-zoom-in mb-3"
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <motion.img
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  style={isZoomed ? {
                    transform: `scale(2)`,
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    transition: "transform-origin 0.1s ease",
                  } : {
                    transform: "scale(1)",
                    transition: "transform 0.4s ease",
                  }}
                />
                {!isZoomed && (
                  <div className="absolute bottom-4 left-4 font-body text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                    Click to zoom
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImage(i); setIsZoomed(false); }}
                    className={`w-20 h-24 border-2 overflow-hidden transition-all duration-300 ${
                      activeImage === i ? "border-foreground" : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 lg:py-4"
            >
              {/* Badges */}
              <div className="flex gap-2">
                {product.isNewDrop && (
                  <span className="bg-foreground text-primary-foreground text-[10px] font-body uppercase tracking-[0.2em] font-medium px-3 py-1">New Drop</span>
                )}
                {product.isBestSeller && (
                  <span className="border border-foreground text-foreground text-[10px] font-body uppercase tracking-[0.2em] font-medium px-3 py-1">Best Seller</span>
                )}
              </div>

              <div>
                <p className="editorial-label mb-2">{product.category}</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide">{product.name}</h1>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-display text-3xl">${product.price}</p>
                <div className="flex items-center gap-1.5 ml-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className="text-foreground" />
                  ))}
                  <span className="text-sm text-muted-foreground font-body ml-2">{product.rating} ({product.reviews})</span>
                </div>
              </div>

              <p className="font-body text-muted-foreground leading-[1.8]">{product.description}</p>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-body text-[11px] uppercase tracking-[0.2em] font-medium">
                    Size {selectedSize && <span className="text-muted-foreground">— {selectedSize}</span>}
                  </p>
                  <button className="font-body text-[11px] text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(s => (
                    <motion.button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      whileTap={{ scale: 0.95 }}
                      className={`w-14 h-14 border text-sm font-body uppercase transition-all duration-300 ${
                        selectedSize === s
                          ? "bg-foreground text-primary-foreground border-foreground"
                          : "border-border text-foreground hover:border-foreground"
                      }`}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity + Actions */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3.5 text-foreground hover:bg-muted transition-colors">
                    <Minus size={16} />
                  </button>
                  <motion.span
                    key={quantity}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="px-5 font-body text-sm font-medium"
                  >
                    {quantity}
                  </motion.span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3.5 text-foreground hover:bg-muted transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                <motion.button
                  onClick={handleAdd}
                  disabled={!selectedSize}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-foreground text-primary-foreground font-body text-[11px] uppercase tracking-[0.2em] font-medium py-4 hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {selectedSize ? "Add to Cart" : "Select a Size"}
                </motion.button>
                <motion.button
                  onClick={() => toggleWishlist(product.id)}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 border border-border hover:border-foreground transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </motion.button>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-6 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck size={18} className="text-muted-foreground" />
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Free Shipping 100+</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw size={18} className="text-muted-foreground" />
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-muted-foreground">30-Day Returns</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield size={18} className="text-muted-foreground" />
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Premium Quality</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reviews Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24 border-t border-border pt-16"
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="editorial-label mb-3">Customer Reviews</p>
                <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide">
                  {product.reviews} Reviews
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className="text-foreground" />
                ))}
                <span className="font-body text-sm font-medium ml-1">{product.rating}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                { name: "Alex M.", text: "Perfect fit and incredible quality. The fabric feels premium.", rating: 5 },
                { name: "Jordan K.", text: "Best purchase I've made this year. Already ordered two more.", rating: 5 },
                { name: "Sam R.", text: "Shipping was fast, packaging was premium. Love the attention to detail.", rating: 5 },
              ].map((review, i) => (
                <div key={i} className="bg-background p-8">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={11} fill={j < review.rating ? "currentColor" : "none"} className="text-foreground" />
                    ))}
                  </div>
                  <p className="font-body text-sm text-foreground leading-[1.8] mb-4">"{review.text}"</p>
                  <p className="font-body text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">{review.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Related Products */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24"
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="editorial-label mb-3">You May Also Like</p>
                <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide">Related</h2>
              </div>
              <Link
                to="/shop"
                className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {moreRelated.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
