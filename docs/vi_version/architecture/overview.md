# Kiến trúc tổng quát

## Tổng quan hệ thống

Hệ thống là ý tưởng ứng dụng web của Nhóm 07 - IntroSE 24C02, môn
**Nhập môn Công nghệ phần mềm (CSC13002)**. Hệ thống hướng đến quản lý thực phẩm tại nhà, theo dõi hạn sử dụng dự kiến và lập kế hoạch bữa ăn để giảm lãng phí.

Kho thực phẩm là dữ liệu nền cho gợi ý công thức và kế hoạch sử dụng nguyên liệu.
AI dự kiến hỗ trợ đề xuất; người dùng quyết định món ăn và cách sử dụng thực phẩm.
Xem [README](../../README.md) để biết tầm nhìn và phạm vi sản phẩm đầy đủ.

## Trạng thái triển khai hiện tại

Repository chưa có mã frontend/backend, database hoặc API nghiệp vụ. Công cụ hiện có:

- Node.js 24 LTS cho công cụ và pnpm 10.32.1 để quản lý dependency.
- Prettier; Husky + lint-staged định dạng các file staged được hỗ trợ.
- GitHub Actions được cấu hình cài dependency bằng frozen lockfile và kiểm tra định dạng.

`pnpm-workspace.yaml` hiện có `packages: []`, chưa có workspace con.
React, Vite, Express, TypeScript, ESLint và bộ test **chưa triển khai**.
Cấu hình CI trong repository không xác nhận kết quả chạy CI hoặc branch protection trên GitHub.

## Kiến trúc dự kiến

Định hướng là fullstack monorepo, dùng TypeScript ở frontend và backend.
Sơ đồ dưới đây chỉ mô tả luồng khái niệm, chưa phải các thành phần đã được xây dựng:

```text
User / Browser
      |
      v
React + Vite Frontend
      |
      | HTTP / REST API
      v
Node.js + Express Backend
      |
      +---- Database (TBD)
      |
      +---- AI Service (TBD)
```

Backend dự kiến xử lý nghiệp vụ, truy cập dữ liệu và gọi dịch vụ AI.
Nhóm chưa chọn database, ORM, nhà cung cấp AI hoặc cách xác thực.
API key và thông tin kết nối riêng tư cần được giữ phía backend khi tích hợp.

## Các nhóm chức năng

Đây là phân nhóm để phân tích yêu cầu, không cam kết tất cả đều thuộc MVP.

| Nhóm                             | Định hướng                                                                     | Phạm vi                         |
| -------------------------------- | ------------------------------------------------------------------------------ | ------------------------------- |
| Authentication & User Management | Đăng ký, đăng nhập, quản lý tài khoản                                          | Ưu tiên đề xuất                 |
| Fridge & Food Inventory          | Nhập thủ công, cập nhật thực phẩm và số lượng                                  | Ưu tiên đề xuất                 |
| Food Expiration Tracking         | Theo dõi hạn dự kiến, nhận biết thực phẩm sắp hết hạn; cân nhắc cách thông báo | Ưu tiên đề xuất                 |
| Recipe Recommendation            | Gợi ý món ăn theo nguyên liệu, ưu tiên thực phẩm cần dùng sớm                  | Ưu tiên đề xuất                 |
| Meal Planning                    | Hỗ trợ lập kế hoạch bữa ăn cơ bản                                              | Ưu tiên đề xuất                 |
| Household Collaboration          | Chia sẻ kho thực phẩm và kế hoạch trong gia đình                               | Đang cân nhắc, chưa cam kết MVP |
| Community                        | Chia sẻ bài viết, công thức và tương tác                                       | Mở rộng, chưa cam kết MVP       |
| Business & Promotions            | Ưu đãi và kết nối đối tác                                                      | Mở rộng, chưa cam kết MVP       |
| Administration                   | Quản trị tài khoản hoặc nội dung theo nhu cầu thực tế                          | Phạm vi cần làm rõ              |

OCR hóa đơn, AI ước tính hạn sử dụng và phân tích xu hướng tiêu dùng tổng hợp cũng đang
được cân nhắc. Không mặc định thu thập, chia sẻ hoặc thương mại hóa dữ liệu người dùng.
Hạn sử dụng do AI ước tính chỉ mang tính tham khảo, không thay thế nhãn sản phẩm và hướng dẫn bảo quản.

## Actors dự kiến

- **User:** quản lý kho thực phẩm, kế hoạch bữa ăn và sử dụng gợi ý công thức.
- **Admin:** thực hiện chức năng quản trị phù hợp phạm vi được thống nhất; chưa xác định chi tiết quyền.
- **Business Partner — đang cân nhắc:** có thể quản lý ưu đãi hoặc chương trình khuyến mãi nếu tính năng dành cho doanh nghiệp được chọn. Chỉ mô hình hóa thành actor khi đối tác trực tiếp tương tác với hệ thống; đây chưa phải actor được xác nhận cho MVP.

## Cấu trúc monorepo dự kiến

```text
apps/
├── web/         # Frontend
└── api/         # Backend

packages/
└── shared/      # Chỉ tạo khi có types/schemas thực sự dùng chung
```

Khi khởi tạo ứng dụng, cập nhật workspace và scripts theo
cấu trúc thực tế. Không tạo package dùng chung chỉ để hoàn thiện cây thư mục.

## Các quyết định còn mở

- Chốt stack và ranh giới MVP, đặc biệt cộng tác hộ gia đình, thông báo và OCR.
- Database, nhu cầu ORM và cách quản lý dữ liệu.
- Cách xác thực, quản lý phiên và phân quyền.
- Nhà cung cấp AI, chiến lược tích hợp và xử lý khi dịch vụ không khả dụng.
- Nguồn công thức, quyền sử dụng và chất lượng dữ liệu.
- Kiến trúc deployment và cấu hình môi trường.
- Quyền riêng tư: dữ liệu cần thu thập, thời gian lưu, sự đồng ý và phạm vi chia sẻ.

Ghi quyết định cùng lý do ngắn gọn trong Issue/PR rồi cập nhật tài liệu theo mã thực tế.

## Nguyên tắc kiến trúc

Tách giao diện, xử lý yêu cầu và nghiệp vụ khi việc đó giúp mã dễ hiểu; xác định rõ đầu vào,
đầu ra và lỗi của API. Kiểm tra dữ liệu bên ngoài, xử lý lỗi rõ ràng và giữ secrets trong
cấu hình môi trường. Duy trì cấu trúc dễ tìm, chỉ thêm abstraction khi có nhu cầu thực tế.
Không cần microservices hoặc nhiều tầng kiến trúc cho giai đoạn hiện tại.
