"use client";

import { useTranslation } from "react-i18next";

export default function StoreIntroduction() {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-primary mb-6">
        {t("about.title", "Câu chuyện của Kiều Sâm")}
      </h2>

      <p className="text-muted-foreground leading-relaxed mb-5">
        {t(
          "about.paragraph_1",
          "Kiều Sâm được hình thành từ tình yêu dành cho những giá trị thủ công mộc mạc, nơi mây, tre và lá không chỉ là chất liệu, mà là một phần của ký ức, của đời sống và của văn hóa làng nghề Việt.",
        )}
      </p>

      <p className="text-muted-foreground leading-relaxed mb-5">
        {t(
          "about.paragraph_2",
          "Trong từng sản phẩm, dấu vết của đôi tay người thợ vẫn hiện diện — không hoàn hảo tuyệt đối, nhưng chân thật và có hồn. Chúng tôi trân trọng những nét cong tự nhiên của tre, những sợi mây được đan chậm rãi, và cả khoảng lặng cần có để một vật dụng được thành hình.",
        )}
      </p>

      <p className="text-muted-foreground leading-relaxed mb-5">
        {t(
          "about.paragraph_3",
          "Kiều Sâm không tìm cách làm mới thủ công bằng sự phô trương, mà lựa chọn một con đường lặng lẽ hơn: giữ nguyên tinh thần xưa, tiết chế trong hình thức, để sản phẩm có thể hòa vào không gian sống hiện đại một cách tự nhiên.",
        )}
      </p>

      <p className="text-muted-foreground leading-relaxed mb-5">
        {t(
          "about.paragraph_4",
          "Mỗi món đồ mây tre lá là kết quả của thời gian — thời gian để chọn nguyên liệu, để phơi nắng, để đan, để chỉnh sửa và để chờ đợi. Chính nhịp điệu chậm ấy tạo nên giá trị bền vững, vượt lên trên công năng sử dụng thông thường.",
        )}
      </p>

      <p className="text-muted-foreground leading-relaxed">
        {t(
          "about.paragraph_5",
          "Kiều Sâm mong muốn mang những giá trị thủ công đó trở lại đời sống thường nhật, như một cách nhắc nhớ về sự cân bằng, sự giản dị và vẻ đẹp đến từ những điều tự nhiên nhất.",
        )}
      </p>
    </div>
  );
}
