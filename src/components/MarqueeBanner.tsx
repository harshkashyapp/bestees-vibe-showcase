const MarqueeBanner = () => {
  const items = ["New Drops Available", "✦", "Free Shipping Over $100", "✦", "Premium Streetwear", "✦", "Wear Your Vibe", "✦"];

  return (
    <div className="bg-foreground text-primary-foreground py-3.5 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {Array.from({ length: 3 }).map((_, rep) => (
          <div key={rep} className="flex items-center shrink-0">
            {items.map((item, i) => (
              <span
                key={`${rep}-${i}`}
                className="font-body text-[10px] uppercase tracking-[0.3em] font-light mx-4"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
