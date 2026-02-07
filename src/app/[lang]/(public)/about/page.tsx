import StoreIntroduction from "@/components/features/about/StoreIntroduction";
import MapEmbed from "@/components/features/about/MapEmbed";

export default function AboutPage() {
  return (
    <section
      className="
        container
        mx-auto
        px-4
        py-16

        /* đảm bảo anchor / scroll không bị header che */
        scroll-mt-[var(--header-height)]
      "
    >
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-20
          md:gap-12
          items-stretch
        "
      >
        {/* Left: Store Introduction */}
        <div
          className="
            h-[480px]

            /* mobile: bù chiều cao header */
            pt-[var(--header-height)]

            /* desktop: không cần */
            md:pt-0
          "
        >
          <StoreIntroduction />
        </div>

        {/* Right: Map */}
        <div
          className="
            h-[480px]
            pt-[var(--header-height)]
            md:pt-0
          "
        >
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
