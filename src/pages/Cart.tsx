import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 section-padding min-h-[80vh]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="brand-heading text-4xl md:text-5xl mb-12"
        >
          Cart ({totalItems})
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ShoppingBag size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="font-body text-muted-foreground mb-6">Your cart is empty</p>
            <Link
              to="/shop"
              className="inline-block bg-foreground text-primary-foreground font-display text-sm uppercase tracking-widest px-8 py-3 hover:bg-foreground/90 transition-colors"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-0">
              <div className="border-b border-border pb-4 mb-4 hidden md:grid grid-cols-12 gap-4 font-display text-xs uppercase tracking-widest text-muted-foreground">
                <span className="col-span-6">Product</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Price</span>
                <span className="col-span-2" />
              </div>
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={`${item.product.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-12 gap-4 items-center py-6 border-b border-border"
                  >
                    <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                      <Link to={`/product/${item.product.id}`} className="w-20 h-20 bg-card overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </Link>
                      <div>
                        <Link to={`/product/${item.product.id}`} className="font-body text-sm font-medium text-foreground hover:underline">
                          {item.product.name}
                        </Link>
                        <p className="font-body text-xs text-muted-foreground mt-1">Size: {item.size}</p>
                      </div>
                    </div>
                    <div className="col-span-4 md:col-span-2 flex items-center justify-center">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="p-1.5 text-foreground hover:bg-muted transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          className="px-3 text-sm font-body"
                        >
                          {item.quantity}
                        </motion.span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-1.5 text-foreground hover:bg-muted transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-4 md:col-span-2 text-right">
                      <p className="font-display text-sm font-bold">${item.product.price * item.quantity}</p>
                    </div>
                    <div className="col-span-4 md:col-span-2 flex justify-end">
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        aria-label="Remove"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card p-8 h-fit sticky top-24"
            >
              <h3 className="font-display text-lg uppercase tracking-wider font-bold mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{totalPrice >= 100 ? "Free" : "$10"}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-display uppercase tracking-wider font-bold">Total</span>
                  <span className="font-display text-xl font-extrabold">
                    ${totalPrice >= 100 ? totalPrice : totalPrice + 10}
                  </span>
                </div>
              </div>
              {totalPrice < 100 && (
                <p className="font-body text-xs text-muted-foreground mb-4">
                  Add ${100 - totalPrice} more for free shipping
                </p>
              )}
              <button className="w-full bg-foreground text-primary-foreground font-display text-sm uppercase tracking-widest py-3.5 hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2">
                Checkout <ArrowRight size={16} />
              </button>
              <Link to="/shop" className="block text-center mt-4 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
