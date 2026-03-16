import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ArrowRight, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const shippingCost = totalPrice >= 100 ? 0 : 10;
  const freeShippingRemaining = Math.max(0, 100 - totalPrice);

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />

        <PageHeader
          title={`Cart (${totalItems})`}
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Shop", path: "/shop" },
            { label: "Cart" },
          ]}
        />

        <div className="section-padding min-h-[50vh]">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <ShoppingBag size={48} className="mx-auto text-muted-foreground/20 mb-6" />
              <h2 className="font-display text-3xl uppercase tracking-wide mb-3">Your Cart is Empty</h2>
              <p className="font-body text-muted-foreground text-sm mb-8">Looks like you haven't added anything yet.</p>
              <Link
                to="/shop"
                className="inline-block bg-foreground text-primary-foreground font-body text-[11px] uppercase tracking-[0.2em] font-medium px-10 py-4 hover:bg-foreground/90 transition-colors"
              >
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Free shipping progress */}
              {freeShippingRemaining > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-10 p-4 border border-border"
                >
                  <Truck size={16} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-body text-xs text-muted-foreground">
                      Add <span className="text-foreground font-medium">${freeShippingRemaining}</span> more for free shipping
                    </p>
                    <div className="w-full h-1 bg-muted mt-2">
                      <motion.div
                        className="h-full bg-foreground"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (totalPrice / 100) * 100)}%` }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Items */}
                <div className="lg:col-span-2">
                  <div className="border-b border-border pb-4 mb-0 hidden md:grid grid-cols-12 gap-4 font-body text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
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
                        exit={{ opacity: 0, x: 20, height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="grid grid-cols-12 gap-4 items-center py-6 border-b border-border"
                      >
                        <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                          <Link to={`/product/${item.product.id}`} className="w-20 h-24 bg-card overflow-hidden flex-shrink-0 group">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </Link>
                          <div>
                            <Link to={`/product/${item.product.id}`} className="font-body text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
                              {item.product.name}
                            </Link>
                            <p className="font-body text-[11px] text-muted-foreground mt-1 uppercase tracking-[0.1em]">
                              Size: {item.size} · ${item.product.price}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-4 md:col-span-2 flex items-center justify-center">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="p-2 text-foreground hover:bg-muted transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <motion.span
                              key={item.quantity}
                              initial={{ scale: 1.3 }}
                              animate={{ scale: 1 }}
                              className="px-3 text-sm font-body font-medium min-w-[2rem] text-center"
                            >
                              {item.quantity}
                            </motion.span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="p-2 text-foreground hover:bg-muted transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <div className="col-span-4 md:col-span-2 text-right">
                          <p className="font-display text-lg">${item.product.price * item.quantity}</p>
                        </div>
                        <div className="col-span-4 md:col-span-2 flex justify-end">
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
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
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="h-fit sticky top-24"
                >
                  <div className="bg-card p-8">
                    <h3 className="font-display text-2xl uppercase tracking-wide mb-8">Order Summary</h3>
                    <div className="space-y-4 mb-8 font-body text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                        <span className="font-medium">${totalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span>
                      </div>
                      <div className="border-t border-border pt-4 flex justify-between">
                        <span className="font-display text-lg uppercase tracking-wide">Total</span>
                        <span className="font-display text-2xl">
                          ${totalPrice + shippingCost}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-foreground text-primary-foreground font-body text-[11px] uppercase tracking-[0.2em] font-medium py-4 hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
                    >
                      Checkout <ArrowRight size={16} />
                    </motion.button>
                    <Link to="/shop" className="block text-center mt-4 font-body text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors py-2">
                      Continue Shopping
                    </Link>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Cart;
