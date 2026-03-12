import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import FeaturedCollections from "@/components/FeaturedCollections";
import BestSellers from "@/components/BestSellers";
import BrandStory from "@/components/BrandStory";
import CustomerReviews from "@/components/CustomerReviews";
import NewsletterSection from "@/components/NewsletterSection";
import InstagramGallery from "@/components/InstagramGallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <FeaturedCollections />
      <BestSellers />
      <BrandStory />
      <CustomerReviews />
      <NewsletterSection />
      <InstagramGallery />
      <Footer />
    </div>
  );
};

export default Index;
