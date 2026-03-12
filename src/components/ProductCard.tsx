import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[3/4] bg-card rounded-sm">
          <motion.img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.img
            src={product.hoverImage}
            alt={`${product.name} alternate`}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNewDrop && (
              <span className="bg-foreground text-primary-foreground text-[10px] font-display uppercase tracking-widest px-2 py-1">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-accent text-accent-foreground text-[10px] font-display uppercase tracking-widest px-2 py-1">
                Best Seller
              </span>
            )}
          </div>

          {/* Quick actions */}
          <motion.div
            className="absolute bottom-3 left-3 right-3 flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={(e) => { e.preventDefault(); addItem(product, "M"); }}
              className="flex-1 bg-foreground text-primary-foreground font-body text-xs uppercase tracking-wider py-2.5 hover:bg-foreground/90 transition-colors flex items-center justify-center gap-1.5"
            >
              <ShoppingBag size={14} /> Add to Cart
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setShowQuickView(true); }}
              className="bg-background/90 backdrop-blur text-foreground p-2.5 hover:bg-background transition-colors"
              aria-label="Quick view"
            >
              <Eye size={14} />
            </button>
          </motion.div>
        </Link>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 p-2 text-foreground/70 hover:text-foreground transition-colors z-10"
          aria-label="Toggle wishlist"
        >
          <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
        </button>

        {/* Info */}
        <div className="mt-3 space-y-1">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-body text-sm font-medium text-foreground">{product.name}</h3>
          </Link>
          <p className="font-display text-base font-bold text-foreground">${product.price}</p>
        </div>
      </motion.div>

      <QuickView product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  );
};

export default ProductCard;
