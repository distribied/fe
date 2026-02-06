export type ArticleBlock =
  | { type: "paragraph"; content: string }
  | { type: "image"; src: string; caption?: string }
  | { type: "heading"; content: string };

export type Article = {
  slug: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  blocks: ArticleBlock[];
};

export const ARTICLES: Article[] = [
  {
    slug: "tat-tan-tat-ve-may-tre-la-co-the-ban-chua-biet",
    title: "Tất tần tật về Mây Tre Lá Có Thể Bạn Chưa Biết?",
    publishedAt: "08.2026",
    thumbnail: "/articles/thumnails/thumbnail-1.jpg",
    blocks: [
      {
        type: "paragraph",
        content:
          "Thiên nhiên, khí hậu, thổ nhưỡng Việt Nam ban tặng cho chúng ta rất nhiều chất liệu tự nhiên tuyệt vời như mây tre lá, qua bàn tay tài hoa của nghệ nhân trở thành nhiều vật dụng rất hữu ích cho đời sống ngàn năm nay. Cùng Nội Thất Home Mây (noithathomemay.com) tìm hiểu xem qua bàn tay của những nghệ nhân thì vật liệu mây tre đan sẽ được chế tạo thành những món đồ gia dụng tiện lợi như thế nào nhé!",
      },
      {
        type: "paragraph",
        content:
          "Tre là loại cây dễ sống, mọc nhanh, có ứng dụng vô biên, làm nhà, lợp mái, đóng cọc.v.v… Trại Cá xin phép chỉ nói đến Tre trên khía cạnh nguyên liệu làm đồ dùng thủ công.",
      },
      {
        type: "paragraph",
        content:
          "Xử lý chung: Để làm được đồ thủ công, cây tre cần được chẻ đôi phơi khô trước ( nhưng chưa khô giòn, còn độ ẩm nhất định để mềm dẻo dễ thao tác ) sau khi được chẻ vót, đan thành sản phẩm, cần được phơi khô tiếp cho kiệt nước, định hình và hạn chế mốc.",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-1.jpg",
        caption: "Cây tre Việt Nam",
      },
      {
        type: "heading",
        content: "Cấu tạo của mây tre lá",
      },
      {
        type: "paragraph",
        content:
          "Cấu tạo tre: Thân tre bao gồm Cật tre, thịt tre, ruột tre, màng tre.",
      },
      {
        type: "paragraph",
        content:
          "Ruột tre ( Tre bụng) : Phần này làm sản phẩm đẹp vì trắng, mềm dễ uốn. tuy nhiên đây là phần ít sợi gỗ nhất và nhiều nước nhất, yếu nhất, dễ mốc hỏng nhất.",
      },
      {
        type: "paragraph",
        content:
          "Nếu các sản phẩm từ tre bụng không được xử lý như phơi, hun khói sẽ bị mốc nhanh chóng. Thường tre bụng chỉ thích hợp làm các sản phẩm ngắn hạn như hộp quà, làn, giỏ đi tặng. Lạt buộc bánh chưng cũng là phần tre bụng này",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-2.jpg",
        caption: "Sản phẩm tre bụng: giỏ trứng trong siêu thị",
      },
      {
        type: "paragraph",
        content:
          "Thịt tre: nằm giữa ruột và cật, đây là phần được sử dụng nhiều nhất, chủ yếu cho thân sản phẩm.",
      },
      {
        type: "paragraph",
        content:
          "Cật tre là lớp ngoài cùng của tre, có thể còn lớp vỏ xanh ( còn gọi là tinh tre ) nhẵn bóng hoặc không (màu xanh lâu dần chuyển thành vàng) Đây cũng là phần bền nhất của cây tre, cực kỳ chắc chắn, khó mốc. Thường cật tre hay được ưu tiên dùng cho các phần cần chịu lực cao như vành rổ, đáy rổ.",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-3.jpg",
        caption: "Phần rổ làm từ thịt tre, phần vành rổ từ cật tre",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-4.jpg",
        caption: "Trước khi gia công những cây tre được chẻ nhỏ để đạt được độ deo dai nhất định",
      },
      {
        type: "heading",
        content: "Những điều có thể bạn chưa biết về song mây",
      },
      {
        type: "paragraph",
        content:
          "Mây hay còn gọi là song mây, là loại cây lâm sản, mọc nhiều ở rừng, tuy nhiên cây mây cũng cần sự chăm sóc của con người nếu muốn thu hoạch để làm sản phẩm.",
      },
      {
        type: "paragraph",
        content:
          "Khác với cây tre thân rỗng, cây mây có thân đặc, bền, dẻo, nhẹ, cây mây là chất liệu có ứng dụng tuyệt vời với đồ thủ công và đồ nội thất.",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-5.jpg",
        caption: "Cây mây được thu hoạch chuẩn bị sử dụng tại Núi Thành, Quảng Nam, đây là loại thân nhỏ",
      },
      {
        type: "paragraph",
        content:
          "Cấu tạo cây song mây: khi cắt ngang cây mây sẽ thấy có lớp vỏ và lớp thân đặc",
      },
      {
        type: "paragraph",
        content:
          "Vỏ mây: chính là sợi mây: là loại sợi bóng, cực dai và chắc, có màu trắng mịn sợi mây thích hợp để buộc, cạp viền rổ, giữ chắc các mối nối, sợi mây khi đan thành sản phẩm thì đặc biệt đẹp, nhẹ và bền, khó mốc.",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-6.jpg",
        caption: "Vành rổ được cạp bằng sợi mây, làng nghề Bao La, Huế. hiện nay vành rổ hay được cạp bằng sợi nhựa tại nhiều nơi.",
      },
      {
        type: "paragraph",
        content:
          "Thân mây: hay còn gọi là song. Thân mây có thể có đường kính rất to, với những thân mây to, ứng dụng làm bàn, ghế, kết hợp cùng da, gỗ. Thân mây có thể được chẻ nhỏ ra và đan thành nhiều sản phẩm",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-7.jpg",
        caption: "Mây được cho vài máy để chẻ thành sợi đều nhau như ý muốn ( Núi Thành Quảng Nam )",
      },
      {
        type: "paragraph",
        content:
          "Khi chẻ nhỏ, thân mân cũng chia thành mây bụng ( mây ruột) : là phần lõi của thân mây ( giống như lõi mía xốp xốp ) phần này khi làm sản phẩm cũng được nhưng yếu hơn và kém đẹp so với phần mây xung quanh.",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-8.jpg",
        caption: "mây được nhuộm màu và đan thành sản phẩm ( Núi Thành, Quảng Nam )",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-9.jpg",
        caption: "Đồ Mây tre sẽ được xử lí khô để tránh ẩm mốc",
      },
      {
        type: "paragraph",
        content:
          "Sợi mây cũng cần xử lý phơi khô, hun sau khi thành sản phẩm để tránh mốc đặc biệt với khí hậu nóng ẩm của Việt Nam.",
      },
    ],
  },
];
