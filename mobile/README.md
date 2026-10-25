# Halou - Mobile Native Configuration & Store Assets

Tài liệu hướng dẫn cấu hình Mobile Native (iOS / Android) và Asset Store cho ứng dụng **Halou** (Được phát triển bởi **聂诚忠 - NIE THANH TRUNG**).

---

## 1. Cấu trúc thư mục Bản địa hóa Mobile

```text
mobile/
├── ios/
│   ├── en.lproj/InfoPlist.strings      # Cấu hình chuỗi & Permission iOS (Default / English)
│   ├── vi.lproj/InfoPlist.strings      # Cấu hình chuỗi & Permission iOS (Tiếng Việt)
│   └── ja.lproj/InfoPlist.strings      # Cấu hình chuỗi & Permission iOS (日本語)
├── android/
│   ├── values/strings.xml              # Android Resources Strings (Default / English)
│   ├── values-vi/strings.xml           # Android Resources Strings (Tiếng Việt)
│   └── values-ja/strings.xml           # Android Resources Strings (日本語)
└── metadata/                           # Fastlane / App Store / Play Console Store Listing
    ├── vi/                             # Metadata Tiếng Việt
    ├── en-US/                          # Metadata Tiếng Anh
    └── ja/                             # Metadata Tiếng Nhật
```

---

## 2. Tích hợp vào iOS (Xcode)

Khi build native bằng **Capacitor**, **React Native**, hoặc **Swift**:
1. Copy các thư mục `vi.lproj`, `en.lproj`, `ja.lproj` vào thư mục gốc của Xcode Project (ngang cấp với `Info.plist`).
2. Trong Xcode: Chọn Project $\rightarrow$ **Info** $\rightarrow$ **Localizations** $\rightarrow$ Thêm `Vietnamese (vi)` và `Japanese (ja)` (Base là English).
3. Các quyền truy cập Camera (OCR), Microphone (TTS/Speech), Photo Library sẽ tự động hiển thị đúng ngôn ngữ của thiết bị người dùng.

---

## 3. Tích hợp vào Android (Android Studio)

1. Copy các thư mục vào `android/app/src/main/res/`:
   - `values/strings.xml` $\rightarrow$ `res/values/strings.xml`
   - `values-vi/strings.xml` $\rightarrow$ `res/values-vi/strings.xml`
   - `values-ja/strings.xml` $\rightarrow$ `res/values-ja/strings.xml`
2. Hệ điều hành Android sẽ tự động phát hiện `Locale.getDefault()` và nạp đúng ngôn ngữ hiển thị.

---

## 4. Đăng ký Store Metadata (App Store Connect & Google Play Console)

Trong thư mục `mobile/metadata/`:
- `title.txt`: Tiêu đề Store (chuẩn ASO giới hạn 30 ký tự trên Apple, 50 ký tự trên Google Play).
- `subtitle.txt`: Phụ đề ngắn (30 ký tự trên App Store, 80 ký tự short description trên Google Play).
- `description.txt`: Toàn bộ mô tả ứng dụng, định vị sản phẩm và danh sách tính năng.
- `keywords.txt`: Từ khóa tìm kiếm tối ưu hóa ASO (App Store Optimization).
