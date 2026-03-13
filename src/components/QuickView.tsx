import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const QuickView = ({ product, isOpen, onClose }: QuickViewProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-background max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden z-10"
          >
            <button onClick={onClose} className="absolute top-5 right-5 z-10 text-foreground/50 hover:text-foreground transition-colors" aria-label="Close">
              <X size={18} />
            </button>
            <div className="aspect-square bg-muted">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col justify-center gap-5">
              <div>
                <p className="editorial-label mb-2">{product.category}</p>
                <h3 className="font-display text-3xl uppercase tracking-wide">{product.name}</h3>
                <p className="font-body text-lg font-medium mt-2 text-foreground">${product.price}</p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className="text-foreground" />
                ))}
                <span className="text-[11px] text-muted-foreground font-body ml-1.5">({product.reviews})</span>
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{product.description}</p>
              <div>
                <p className="editorial-label mb-3">Size</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-10 h-10 border text-xs font-body font-medium uppercase transition-all duration-300 ${
                        selectedSize === s
                          ? "bg-foreground text-primary-foreground border-foreground"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center border border-border">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 text-muted-foreground hover:text-foreground transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-body font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 text-muted-foreground hover:text-foreground transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-foreground text-primary-foreground font-body text-[11px] uppercase tracking-[0.15em] font-medium py-3.5 hover:bg-foreground/90 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickView;
