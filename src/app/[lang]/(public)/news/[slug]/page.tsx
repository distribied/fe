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
      <div className="mx-auto max-w-3xl">
        {/* Meta */}
        <p className="mb-4 text-sm text-text-subtle">{article.publishedAt}</p>

        {/* Title */}
        <h1 className="mb-8 text-3xl font-bold text-text-heading">
          {article.title}
        </h1>

        {/* Content */}
        <div className="space-y-8">
          {article.blocks.map((block, index) => {
            if (block.type === "paragraph") {
              return (
                <p key={index} className="leading-relaxed text-text-body">
                  {block.content}
                </p>
              );
            }

            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className="text-xl font-semibold text-text-heading"
                >
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
                    className="w-full rounded-lg"
                  />
                  {block.caption && (
                    <figcaption className="mt-2 text-center text-sm text-text-muted">
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
