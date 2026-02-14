import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LoginSection from "@/components/LoginSection";
import TripScheduling from "@/components/TripScheduling";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LoginSection />
      <TripScheduling />
      <Footer />
    </div>
  );
};

export default Index;
