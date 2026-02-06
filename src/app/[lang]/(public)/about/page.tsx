import StoreIntroduction from "@/components/features/about/StoreIntroduction";
import MapEmbed from "@/components/shared/MapEmbed";

export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-12 
          items-stretch
        "
      >
        {/* Left */}
        <div className="h-[480px]">
          <StoreIntroduction />
        </div>

        {/* Right */}
        <div className="h-[480px]">
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
