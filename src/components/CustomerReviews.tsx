import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Alex M.",
    location: "New York",
    text: "Best quality tees I've ever worn. The oversized fit is perfect — not too boxy, not too slim. Instantly became my daily go-to.",
    rating: 5,
    product: "Essential Oversized Tee",
  },
  {
    name: "Jordan K.",
    location: "Los Angeles",
    text: "The Cloud Hoodie is unreal. So soft it feels like wearing a blanket. Already ordered two more.",
    rating: 5,
    product: "Cloud Hoodie",
  },
  {
    name: "Sam R.",
    location: "London",
    text: "Shipping was fast, packaging was premium. You can tell they care about every detail. Will definitely order again.",
    rating: 5,
    product: "Heritage Bomber",
  },
];

const CustomerReviews = () => {
  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <p className="editorial-label mb-3">Testimonials</p>
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wide">What They Say</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-6xl mx-auto">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="bg-background p-8 md:p-10 flex flex-col"
          >
            <Quote size={24} className="text-muted-foreground/30 mb-6" />
            <div className="flex gap-0.5 mb-5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={12} fill={j < review.rating ? "currentColor" : "none"} className="text-foreground" />
              ))}
            </div>
            <p className="font-body text-sm text-foreground leading-[1.8] mb-6 flex-1">
              "{review.text}"
            </p>
            <div className="border-t border-border pt-5">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-foreground">{review.name}</p>
              <p className="font-body text-[11px] text-muted-foreground mt-0.5">{review.location} · {review.product}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
