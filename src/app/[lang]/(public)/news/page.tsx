import NewsListItem from "@/components/features/news/NewsListItem";
import { ARTICLES } from "@/data/articles";


export default function NewsPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-12 max-w-prose">
        <h1 className="text-3xl font-bold text-text-heading mb-4">Tin tức & Bài viết</h1>

        <p className="text-text-body">
          Những ghi chép xoay quanh thủ công mây tre lá, không gian sống và các
          giá trị truyền thống trong đời sống hiện đại.
        </p>
      </div>

      <div className="max-w-4xl">
        {ARTICLES.map((article) => (
          <NewsListItem
            key={article.slug}
            slug={article.slug}
            title={article.title}
            publishedAt={article.publishedAt}
            thumbnail={article.thumbnail}
          />
        ))}
      </div>
    </section>
  );
}
