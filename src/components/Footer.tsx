import { MapPin, Phone, Mail, Clock, Facebook, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Kiều Sâm" className="h-12 w-12 object-contain bg-background rounded-full p-1" />
              <h3 className="font-bold text-lg">Kiều Sâm</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Chuyên sản xuất và cung cấp các sản phẩm mây tre lá thủ công truyền thống Việt Nam. 
              Cam kết chất lượng, giá cả hợp lý.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase">Thông Tin Liên Hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>42 Hồ Bá Phấn - P.Phước Long A - Quận 9 - TPHCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>0905.584.119 - 0984.702.701</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>dalyhuong@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>8:00 - 20:00 (Thứ 2 - Chủ Nhật)</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase">Danh Mục Sản Phẩm</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Hộp Và Giỏ Quà Tết</a></li>
              <li><a href="#" className="hover:underline">Túi Cỏ Bàng Vẽ</a></li>
              <li><a href="#" className="hover:underline">Túi Lá Buông Vẽ</a></li>
              <li><a href="#" className="hover:underline">Túi Lục Bình Vẽ</a></li>
              <li><a href="#" className="hover:underline">Sản Phẩm Tre</a></li>
              <li><a href="#" className="hover:underline">Giỏ Lục Bình</a></li>
            </ul>
          </div>

          {/* Social & Support */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase">Kết Nối</h3>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm opacity-90">
              Theo dõi chúng tôi để cập nhật sản phẩm mới và ưu đãi hấp dẫn!
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/20 py-4">
        <div className="container mx-auto px-4 text-center text-sm opacity-80">
          © 2024 Cơ Sở Mây Tre Lá Kiều Sâm. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
