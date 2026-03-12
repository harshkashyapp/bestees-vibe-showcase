const MarqueeBanner = () => {
  const text = "BESTEES · WEAR YOUR VIBE · NEW DROPS · FREE SHIPPING OVER $100 · ";
  
  return (
    <div className="bg-foreground text-primary-foreground py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="font-display text-xs uppercase tracking-[0.3em] mx-0">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
