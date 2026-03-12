import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl font-extrabold uppercase tracking-tighter mb-4">Bestees</h3>
            <p className="font-body text-primary-foreground/70 max-w-sm">
              Wear your vibe. Premium streetwear designed for those who move different.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest mb-4 font-bold">Shop</h4>
            <div className="flex flex-col gap-2 font-body text-sm text-primary-foreground/70">
              <Link to="/shop" className="hover:text-primary-foreground transition-colors">All Products</Link>
              <Link to="/shop?category=new-drops" className="hover:text-primary-foreground transition-colors">New Drops</Link>
              <Link to="/shop?category=best-sellers" className="hover:text-primary-foreground transition-colors">Best Sellers</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest mb-4 font-bold">Info</h4>
            <div className="flex flex-col gap-2 font-body text-sm text-primary-foreground/70">
              <Link to="/about" className="hover:text-primary-foreground transition-colors">About Us</Link>
              <span className="cursor-default">Shipping & Returns</span>
              <span className="cursor-default">Contact</span>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-primary-foreground/50">© 2026 Bestees. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
