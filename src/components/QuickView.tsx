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
          <motion.div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-background rounded-sm max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden z-10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 text-foreground" aria-label="Close">
              <X size={20} />
            </button>
            <div className="aspect-square bg-card">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex flex-col justify-center gap-4">
              <div>
                <h3 className="font-display text-xl font-bold uppercase">{product.name}</h3>
                <p className="font-display text-2xl font-extrabold mt-1">${product.price}</p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className="text-accent" />
                ))}
                <span className="text-xs text-muted-foreground font-body ml-1">({product.reviews})</span>
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{product.description}</p>
              <div>
                <p className="text-xs uppercase tracking-widest font-display mb-2">Size</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-10 h-10 border text-xs font-body uppercase transition-colors ${
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
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-foreground"><Minus size={14} /></button>
                  <span className="px-3 text-sm font-body">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-foreground"><Plus size={14} /></button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-foreground text-primary-foreground font-display text-sm uppercase tracking-widest py-3 hover:bg-foreground/90 transition-colors"
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
