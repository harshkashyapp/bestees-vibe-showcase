import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="font-display text-4xl uppercase tracking-wider mb-4">Bestees</h3>
            <p className="font-body text-primary-foreground/40 text-sm max-w-xs leading-relaxed">
              Premium streetwear designed for those who move different. Wear your vibe.
            </p>
          </div>

          {/* Shop */}
          <div className="md:col-span-2">
            <h4 className="font-body text-[11px] uppercase tracking-[0.2em] font-medium mb-5 text-primary-foreground/60">Shop</h4>
            <div className="flex flex-col gap-3">
              <Link to="/shop" className="font-body text-sm text-primary-foreground/40 hover:text-primary-foreground transition-colors">All Products</Link>
              <Link to="/shop?category=new-drops" className="font-body text-sm text-primary-foreground/40 hover:text-primary-foreground transition-colors">New Drops</Link>
              <Link to="/shop?category=best-sellers" className="font-body text-sm text-primary-foreground/40 hover:text-primary-foreground transition-colors">Best Sellers</Link>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h4 className="font-body text-[11px] uppercase tracking-[0.2em] font-medium mb-5 text-primary-foreground/60">Info</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="font-body text-sm text-primary-foreground/40 hover:text-primary-foreground transition-colors">About Us</Link>
              <span className="font-body text-sm text-primary-foreground/40 cursor-default">Shipping</span>
              <span className="font-body text-sm text-primary-foreground/40 cursor-default">Contact</span>
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-3">
            <h4 className="font-body text-[11px] uppercase tracking-[0.2em] font-medium mb-5 text-primary-foreground/60">Follow Us</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors" aria-label="Twitter">
                <Twitter size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] text-primary-foreground/30 tracking-wide">
            © 2026 Bestees. All rights reserved.
          </p>
          <p className="font-body text-[11px] text-primary-foreground/30 tracking-wide">
            Designed with intention.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
