import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Plus, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import QuickView from "./QuickView";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addItem } = useCart();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[3/4] bg-muted">
          <motion.img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
              opacity: isHovered ? 0 : 1,
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.img
            src={product.hoverImage}
            alt={`${product.name} alternate`}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 1.08,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNewDrop && (
              <span className="bg-foreground text-primary-foreground text-[9px] font-body uppercase tracking-[0.2em] font-medium px-2.5 py-1">
                New
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className="absolute top-3 right-3 p-2 text-foreground/50 hover:text-foreground transition-colors z-10"
            aria-label="Toggle wishlist"
          >
            <Heart size={16} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
          </button>

          {/* Quick actions overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-3 flex gap-2"
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={(e) => { e.preventDefault(); addItem(product, "M"); }}
              className="flex-1 bg-foreground/90 backdrop-blur-sm text-primary-foreground font-body text-[10px] uppercase tracking-[0.15em] font-medium py-3 hover:bg-foreground transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={12} /> Add to Cart
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setShowQuickView(true); }}
              className="bg-background/90 backdrop-blur-sm text-foreground p-3 hover:bg-background transition-colors"
              aria-label="Quick view"
            >
              <Eye size={14} />
            </button>
          </motion.div>
        </Link>

        {/* Product info */}
        <div className="mt-4 space-y-1">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-body text-[13px] font-medium text-foreground tracking-wide">{product.name}</h3>
          </Link>
          <p className="font-body text-[13px] text-muted-foreground">${product.price}</p>
        </div>
      </motion.div>

      <QuickView product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  );
};

export default ProductCard;
