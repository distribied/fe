import { ARTICLES } from "@/data/articles";
import { notFound } from "next/navigation";

export default function ArticleDetail({
  params,
}: {
  params: { slug: string };
}) {
  const article = ARTICLES.find((a) => a.slug === params.slug);

  if (!article) return notFound();

  return (
    <article className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-muted-foreground mb-4">
          {article.publishedAt}
        </p>

        <h1 className="text-3xl font-bold mb-8">{article.title}</h1>

        <div className="space-y-8">
          {article.blocks.map((block, index) => {
            if (block.type === "paragraph") {
              return (
                <p
                  key={index}
                  className="leading-relaxed text-muted-foreground"
                >
                  {block.content}
                </p>
              );
            }

            if (block.type === "heading") {
              return (
                <h2 key={index} className="text-xl font-semibold">
                  {block.content}
                </h2>
              );
            }

            if (block.type === "image") {
              return (
                <figure key={index}>
                  <img
                    src={block.src}
                    alt={block.caption ?? ""}
                    className="rounded-lg w-full"
                  />
                  {block.caption && (
                    <figcaption className="text-sm text-muted-foreground mt-2 text-center">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return null;
          })}
        </div>
      </div>
    </article>
  );
}
