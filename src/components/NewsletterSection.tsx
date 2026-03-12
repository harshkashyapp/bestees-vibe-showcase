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
    <section className="section-padding bg-secondary">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto text-center"
      >
        <h2 className="brand-heading text-3xl md:text-4xl mb-4">Join the Club</h2>
        <p className="font-body text-muted-foreground mb-8">
          Get early access to new drops, exclusive offers, and behind-the-scenes content.
        </p>
        {submitted ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display text-lg uppercase tracking-wider"
          >
            You're in ✦
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1 bg-background border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
            <button
              type="submit"
              className="bg-foreground text-primary-foreground px-6 py-3 font-display text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center gap-2"
            >
              Join <ArrowRight size={14} />
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
