type NewsCardProps = {
  title: string;
  excerpt: string;
  publishedAt: string;
};

export default function NewsCard({
  title,
  excerpt,
  publishedAt,
}: Readonly<NewsCardProps>) {
  return (
    <article className="rounded-xl border bg-background p-6 hover:shadow-lg transition-shadow">
      <p className="text-xs text-muted-foreground mb-3">{publishedAt}</p>

      <h3 className="text-lg font-semibold leading-snug mb-3">{title}</h3>

      <p className="text-sm text-muted-foreground leading-relaxed">{excerpt}</p>
    </article>
  );
}
