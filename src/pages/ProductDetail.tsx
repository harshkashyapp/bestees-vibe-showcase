import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Star, ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const images = [product.image, product.hoverImage];
  const related = products.filter(p => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    if (!selectedSize) return;
    for (let i = 0; i < quantity; i++) addItem(product, selectedSize);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 section-padding">
        <Link to="/shop" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="relative aspect-[3/4] bg-card rounded-sm overflow-hidden cursor-zoom-in mb-4"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <motion.img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                animate={{ scale: isZoomed ? 1.5 : 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveImage(i); setIsZoomed(false); }}
                  className={`w-20 h-20 border-2 overflow-hidden transition-colors ${
                    activeImage === i ? "border-foreground" : "border-border"
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
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div>
              <div className="flex gap-2 mb-2">
                {product.isNewDrop && (
                  <span className="bg-foreground text-primary-foreground text-[10px] font-display uppercase tracking-widest px-2 py-1">New</span>
                )}
                {product.isBestSeller && (
                  <span className="bg-accent text-accent-foreground text-[10px] font-display uppercase tracking-widest px-2 py-1">Best Seller</span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight">{product.name}</h1>
              <p className="font-display text-2xl font-bold mt-2">${product.price}</p>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className="text-accent" />
              ))}
              <span className="text-sm text-muted-foreground font-body ml-2">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Size */}
            <div>
              <p className="font-display text-xs uppercase tracking-widest mb-3 font-bold">
                Size {selectedSize && `— ${selectedSize}`}
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 border text-sm font-body uppercase transition-all duration-200 ${
                      selectedSize === s
                        ? "bg-foreground text-primary-foreground border-foreground"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-foreground hover:bg-muted transition-colors">
                  <Minus size={16} />
                </button>
                <span className="px-4 font-body text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-foreground hover:bg-muted transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={!selectedSize}
                className="flex-1 bg-foreground text-primary-foreground font-display text-sm uppercase tracking-widest py-3.5 hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {selectedSize ? "Add to Cart" : "Select a Size"}
              </button>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <p className="font-body text-xs text-muted-foreground">✦ Free shipping on orders over $100</p>
              <p className="font-body text-xs text-muted-foreground">✦ 30-day hassle-free returns</p>
              <p className="font-body text-xs text-muted-foreground">✦ Premium heavyweight cotton</p>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        <div className="mt-24">
          <h2 className="brand-heading text-2xl md:text-3xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
