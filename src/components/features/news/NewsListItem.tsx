import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
};

export default function NewsListItem({
  slug,
  title,
  publishedAt,
  thumbnail,
}: Readonly<Props>) {
  return (
    <Link
      href={`/news/${slug}`}
      className="flex gap-6 py-6 border-b hover:bg-muted/40 transition"
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-40 h-28 object-cover rounded-lg shrink-0"
      />

      <div className="flex flex-col justify-center">
        <p className="text-xs text-muted-foreground mb-2">
          {publishedAt}
        </p>

        <h3 className="text-lg font-semibold leading-snug">
          {title}
        </h3>
      </div>
    </Link>
  );
}
