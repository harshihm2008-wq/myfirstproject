import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import PlayZonesSection from "@/components/sections/PlayZonesSection";
import BirthdaySection from "@/components/sections/BirthdaySection";
import MembershipSection from "@/components/sections/MembershipSection";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import BookingContactSection from "@/components/sections/BookingContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <PlayZonesSection />
      <BirthdaySection />
      <MembershipSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <BookingContactSection />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
