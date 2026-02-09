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
        caption:
          "Trước khi gia công những cây tre được chẻ nhỏ để đạt được độ deo dai nhất định",
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
        caption:
          "Cây mây được thu hoạch chuẩn bị sử dụng tại Núi Thành, Quảng Nam, đây là loại thân nhỏ",
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
        caption:
          "Vành rổ được cạp bằng sợi mây, làng nghề Bao La, Huế. hiện nay vành rổ hay được cạp bằng sợi nhựa tại nhiều nơi.",
      },
      {
        type: "paragraph",
        content:
          "Thân mây: hay còn gọi là song. Thân mây có thể có đường kính rất to, với những thân mây to, ứng dụng làm bàn, ghế, kết hợp cùng da, gỗ. Thân mây có thể được chẻ nhỏ ra và đan thành nhiều sản phẩm",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-7.jpg",
        caption:
          "Mây được cho vài máy để chẻ thành sợi đều nhau như ý muốn ( Núi Thành Quảng Nam )",
      },
      {
        type: "paragraph",
        content:
          "Khi chẻ nhỏ, thân mân cũng chia thành mây bụng ( mây ruột) : là phần lõi của thân mây ( giống như lõi mía xốp xốp ) phần này khi làm sản phẩm cũng được nhưng yếu hơn và kém đẹp so với phần mây xung quanh.",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-8.jpg",
        caption:
          "Mây được nhuộm màu và đan thành sản phẩm ( Núi Thành, Quảng Nam )",
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
      {
        type: "heading",
        content:
          "Cói – Một trong những chất liệu thân cỏ được sử dụng nhiều nhất",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-8.jpg",
        caption: "Ảnh tự chụp tại hợp tác xã làm chiếu, Đồng Minh, Hải Phòng",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-11.jpg",
        caption: "Ảnh tự chụp tại hợp tác xã làm chiếu, Đồng Minh, Hải Phòng",
      },
      {
        type: "paragraph",
        content:
          "Cói là chất liệu quen thuộc, ai ai cũng lớn lên cùng chiếc chiếu cói. Cây cói là loài thân cỏ, được trồng nhiều ở phía Bắc. Khi cắt ngang sợi cói sẽ thấy rất nhiều sợi nhỏ bên trong, cấu tạo như một miếng mút xốp, có độ đàn hồi. Chính vì cấu tạo này mà đặc tính của cói là hút ẩm.",
      },
      {
        type: "paragraph",
        content:
          "Đặc tính hút ẩm này giúp cho chiếu cói có khả năng thấm hút mồ hôi, khô thoáng, nhưng lại vẫn giữ ấm. Cói cũng có độ êm nhất định nên chiếc chiếu cói có tác dụng rất tốt cho sức khỏe.",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-12.jpg",
        caption: "Ảnh tự chụp tại hợp tác xã làm chiếu, Đồng Minh, Hải Phòng",
      },
      {
        type: "paragraph",
        content:
          "Nhưng cũng vì đặc tính hút ẩm này, nếu cói được làm thành giỏ, sọt, hay các vật dụng khác, khả năng bị mốc khá cao. Sợi cây cói là môi trường lý tưởng cho mốc phát triển.",
      },
      {
        type: "paragraph",
        content:
          "Vì sao cói nhanh mốc mà làm chiếu thì lại không sao? Vì khi nằm, ngồi, chiếu tiếp xúc nhiều với da người nên hút được một lớp dầu tự nhiên, lớp dầu này làm cho sợi cói bóng, và không bị mốc được.",
      },
      {
        type: "paragraph",
        content:
          "Đây cũng là lý do vì sao không nên giặt chiếu bằng xà phòng. Xà phòng sẽ phá hủy cấu trúc tự nhiên của cói, làm cho cói bị thâm, nhanh hỏng, mất lớp dầu bảo vệ. Ta chỉ nên giặt chiếu bằng nước thường hoặc bằng quả giặt tự nhiên như bồ hòn.",
      },
      {
        type: "paragraph",
        content:
          "Kết luận: đặc tính hút ẩm của sợi nếu được áp dụng đúng sản phẩm, sẽ phát huy tác dụng rất tốt. Nếu bạn sử dụng giỏ, túi, hộp cói, hãy đảm bảo rằng bạn sử dụng thường xuyên, hơi tay người và lớp dầu tự nhiên trên tay bạn sẽ giúp sản phẩm không bị mốc. Điều này đúng với cả các sản phẩm rổ rá tre, sọt mây… như Trại Cá đã giới thiệu ở phần trước",
      },
      {
        type: "heading",
        content: "Cỏ Bàng – Nguyên liệu cơ bản thay thế cho mây tre lá",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-13.jpg",
        caption: "Ảnh tự chụp tại Phò Trạch, Huế",
      },
      {
        type: "paragraph",
        content:
          "Cũng là một loại sợi thân cỏ, cỏ bàng được trồng nhiều hơn ở phía Nam. Khi cắt ngang sợi cỏ bàng bạn sẽ thấy rỗng. Ống hút cỏ bàng thay cho ống hút nhựa cũng là sản phẩm được quan tâm nhiều gần đây.",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-14.jpg",
        caption: "Ảnh tự chụp tại nhà bạn Tiến Trần, Long An",
      },
      {
        type: "paragraph",
        content:
          "Ứng dụng của cỏ bàng khá tương đồng với cói, cỏ bàng được đan thành thảm, chiếu, túi, mũ, hộp, giỏ sọt. Tuy nhiên 2 vật liệu này có ưu nhược khác nhau:",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-15.jpg",
        caption: "Ảnh tự chụp tại nhà bạn Tiến Trần, Long An",
      },
      {
        type: "paragraph",
        content:
          "Cỏ bàng làm thảm, chiếu thì không có độ êm như cói, thân cỏ bàng rỗng, khi cán dẹp, phơi khô sẽ khó còn độ đàn hồi, êm ái. Thảm chiếu cỏ bàng sẽ hơi “phồng phành”, trải ra không bằng phẳng mượt như chiếu cói. Tuy nhiên với khí hậu khô nóng phía Nam, chiếu cỏ bàng lại rất thích hợp vì độ mát nhẹ của mình.",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-16.jpg",
        caption:
          "Ảnh tự chụp bà Hai, người duy nhất còn làm bị vuông cỏ bàng, Long An",
      },
      {
        type: "paragraph",
        content:
          "Cỏ bàng làm thành các sản phẩm khác như hộp, giỏ, sọt… Trại Cá lại đánh giá cao hơn. Sợi cỏ bàng rỗng và khô, nên khó bị mốc hơn, không có đặc tính miếng mút hút ẩm như cói. Sợi cỏ bàng cũng ít đàn hồi, nên đan lên sản phẩm sẽ chặt tay, đều, khó bị co giãn, biến dạng cho nên cho ra sản phẩm đẹp, định hình và bền chắc hơn so với sản phẩm cói.",
      },
      {
        type: "heading",
        content: "Tìm hiểu về cỏ Tế (Guột)",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-17.jpg",
        caption: "Ảnh tự chụp tại làng cỏ tế Phú Túc",
      },
      {
        type: "paragraph",
        content:
          "Cỏ tế thuộc họ dương xỉ, thường có ở các vùng trung du miền núi phía bắc. Cỏ tế cần phơi để có màu đẹp, dẻo, để nguyên hoặc chẻ nhỏ thành sợi mỏng, dai, hay được kết hợp với song mây gọi là kỹ thuật xâu xiên ( phần 1).",
      },
      {
        type: "image",
        src: "/articles/illustrations/article-1/illu-18.jpg",
        caption: "Ảnh tự chụp tại làng cỏ tế Phú Túc",
      },
      {
        type: "paragraph",
        content:
          "Cỏ tế chuốt thành sợi rất đều, mịn, tạo ra các sản phẩm vô cùng tinh xảo, bền, giá trị thẩm mỹ cao, có giá rất đắt. Một số ứng dụng chính là: hộp ủ ấm trà, hộp trà, sọt, giỏ, bình…",
      },
      {
        type: "paragraph",
        content:
          "Vì cỏ tế và song mây khô, chắc nên khó bị mốc, không hút ẩm. Nếu có bị mốc có thể cọ bằng bàn chải mềm với nước rồi phơi khô là sản phẩm lại đẹp như mới.",
      },
      {
        type: "heading",
        content: "Tìm hiểu về chất liệu Lục Bình",
      },
      {
        type: "paragraph",
        content:
          "Lục bình hay chính là bèo tây, có thân béo và rất xốp. Lục bình được phơi khô và sử dụng trong các sản phẩm thảm, túi, hộp giỏ đan. Tuy nhiên Trại Cá nghĩ sản phẩm này không thích hợp lắm với điều kiện nóng ẩm ở Việt Nam vì rất hút ẩm, dễ mốc, dễ bám bụi. Thường sản phẩm lục bình được khách hàng nước ngoài ưa chuộng, thường làm để xuất khẩu.",
      },
      {
        type: "paragraph",
        content:
          "Mây, Tre, Cói, Cỏ bàng, Cỏ tế, Lục bình là một số các chất liệu cơ bản của các sản phẩm mây tre lá. Hi vọng rằng qua bài viết này bạn sẽ hiểu hơn về sản phẩm và có những lựa chọn đúng đắn khi sẵn đồ mây tre lá cho gia đình. Các sản phẩm mây tre lá nếu được dùng đúng mục đích sẽ rất bền, hữu ích và đẹp thêm, ấm áp cho ngôi nhà.",
      },
    ],
  },
];
