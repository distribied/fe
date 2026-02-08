import StoreIntroduction from "@/components/features/about/StoreIntroduction";
import MapEmbed from "@/components/features/about/MapEmbed";

export default function AboutPage() {
  return (
    <section
      className="
        container
        mx-auto
        px-4

        /* Top spacing: thoáng */
        pt-8
        md:pt-10

        /* Bottom spacing: gọn, tránh hở footer */
        pb-8
        md:pb-4
      "
    >
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2

          gap-12
          md:gap-10
          items-start
        "
      >
        {/* Store Introduction – auto height */}
        <div>
          <StoreIntroduction />
        </div>

        {/* Map – cần khung tối thiểu để đẹp */}
        <div className="min-h-[320px] md:min-h-[420px]">
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
