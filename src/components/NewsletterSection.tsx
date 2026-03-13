import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-foreground text-primary-foreground py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center px-6"
      >
        <p className="font-body text-[11px] uppercase tracking-[0.3em] text-primary-foreground/40 font-medium mb-4">
          Newsletter
        </p>
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wide mb-6">
          Join the Club
        </h2>
        <p className="font-body text-primary-foreground/50 text-sm mb-10 max-w-md mx-auto leading-relaxed">
          Get early access to new drops, exclusive offers, and behind-the-scenes content. No spam, ever.
        </p>
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-3xl uppercase tracking-wide">You're In ✦</p>
            <p className="font-body text-sm text-primary-foreground/40 mt-2">Welcome to the club.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent border-b border-primary-foreground/20 px-0 py-3 font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-primary-foreground/60 transition-colors"
            />
            <button
              type="submit"
              className="ml-4 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={20} />
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
