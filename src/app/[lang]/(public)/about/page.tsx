import StoreIntroduction from "@/components/features/about/StoreIntroduction";
import MapEmbed from "@/components/features/about/MapEmbed";

export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 pt-8 md:pt-10 pb-8 md:pb-4">
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-12
          md:gap-10
          items-stretch
        "
      >
        {/* Introduction – cột cao hơn */}
        <div className="flex">
          <StoreIntroduction />
        </div>

        {/* Map – tự giãn bằng chiều cao introduction */}
        <div className="flex">
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
