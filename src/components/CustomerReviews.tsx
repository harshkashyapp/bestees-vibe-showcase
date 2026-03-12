import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Alex M.", text: "Best quality tees I've ever worn. The oversized fit is perfect.", rating: 5 },
  { name: "Jordan K.", text: "The Cloud Hoodie is unreal. So soft, instant favorite.", rating: 5 },
  { name: "Sam R.", text: "Shipping was fast, packaging was premium. Will order again.", rating: 4 },
];

const CustomerReviews = () => {
  return (
    <section className="section-padding">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="brand-heading text-3xl md:text-4xl text-center mb-12"
      >
        What They Say
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="flex justify-center gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={14} fill={j < review.rating ? "currentColor" : "none"} className="text-accent" />
              ))}
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">"{review.text}"</p>
            <p className="font-display text-xs uppercase tracking-widest font-bold">{review.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
