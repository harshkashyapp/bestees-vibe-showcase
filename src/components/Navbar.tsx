import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { label: "Shop", path: "/shop" },
  { label: "Collections", path: "/shop?category=new-drops" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden && !isOpen ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-16 py-5">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Desktop nav (left) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-body text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? (scrolled ? "text-foreground" : "text-primary-foreground")
                  : (scrolled ? "text-muted-foreground hover:text-foreground" : "text-primary-foreground/60 hover:text-primary-foreground")
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Logo (center) */}
        <Link
          to="/"
          className={`absolute left-1/2 -translate-x-1/2 font-display text-2xl md:text-3xl uppercase tracking-wider transition-colors duration-300 ${
            scrolled ? "text-foreground" : "text-primary-foreground"
          }`}
        >
          Bestees
        </Link>

        {/* Icons (right) */}
        <div className="flex items-center gap-5">
          <Link
            to="/shop"
            className={`relative transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            <Heart size={18} strokeWidth={1.5} fill={wishlist.length > 0 ? "currentColor" : "none"} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-foreground text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-body font-medium">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className={`relative transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-foreground text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-body font-medium"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 top-0 bg-background z-[-1] flex flex-col items-center justify-center gap-8 overflow-hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-5xl uppercase tracking-wider text-foreground hover:text-muted-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
