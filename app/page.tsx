import HeroSection from "@/components/HeroSection";
import FeaturedMovies from "@/components/FeaturedMovies";

export default async function Home() {

  return (
    <div className="min-h-screen p-6 sm:p-20 bg-gray-950 text-white font-sans">
      <HeroSection />
      <FeaturedMovies />
    </div>
  );
}
