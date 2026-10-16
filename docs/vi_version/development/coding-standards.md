# Quy ước viết mã

Hướng dẫn dành cho nhóm Nhóm 07 - IntroSE 24C02 trong khôn khổ học phần **Nhập môn Công nghệ phần mềm (CSC13002)**.
Prettier đã được cấu hình; TypeScript, React, Express và ESLint dưới đây là **dự kiến**,
chưa có ứng dụng hoặc cấu hình tương ứng. Xem [kiến trúc](../architecture/overview.md).

## Đặt tên và trình bày

- Dùng tiếng Anh cho identifiers, tên cấu hình và commit; tài liệu chủ yếu dùng tiếng Việt.
- `camelCase`: biến và hàm, ví dụ `expiryDate`, `filterRecipes`.
- `PascalCase`: component, class, type và interface, ví dụ `InventoryItem`.
- `kebab-case`: tên file thông thường, ví dụ `expiry-validation.ts`.
- `UPPER_SNAKE_CASE`: hằng toàn cục phù hợp, ví dụ `MAX_RECIPE_RESULTS`.
- Đặt tên rõ nghĩa, viết hàm tập trung vào một việc; tránh lặp mã và abstraction quá sớm.

## TypeScript dự kiến

- Bật `strict` khi khởi tạo ứng dụng; hiện chưa có `tsconfig`.
- Khai báo kiểu rõ nghĩa khi giúp hiểu hợp đồng hàm/dữ liệu; để suy luận kiểu cho trường hợp đơn giản.
- Tránh `any` không cần thiết; với dữ liệu chưa biết, kiểm tra kiểu trước khi sử dụng.
- Không dùng type assertion chỉ để bỏ qua lỗi compiler; kiểu TypeScript không thay thế validation lúc chạy.

## React dự kiến

- Ưu tiên functional components, nhỏ và tập trung vào hiển thị/tương tác.
- Tách business logic phức tạp khỏi UI để dễ đọc và kiểm thử.
- Chỉ tách hook dùng lại khi có nhu cầu; tuân thủ quy tắc gọi Hooks.
- Thể hiện trạng thái đang tải, rỗng và lỗi khi luồng tương tác cần chúng.

## Express dự kiến

- Phân biệt routing, xử lý request/response và business logic; tách file khi hữu ích.
- Không đặt toàn bộ nghiệp vụ trong route handler, không bắt buộc số tầng cố định.
- Validate params, query và body từ bên ngoài; xử lý lỗi và response nhất quán.
- Giữ hợp đồng API rõ ràng giữa frontend/backend; trao đổi trong PR khi thay đổi hợp đồng chung.

## Chất lượng mã

Prettier là công cụ định dạng hiện tại. ESLint dự kiến hỗ trợ phát hiện lỗi khi có mã ứng dụng.
Viết mã dễ hiểu, giữ PR tập trung; comment giải thích lý do khó thấy thay vì lặp lại mã.
Chỉ thêm thư viện khi có lợi ích cụ thể và nêu lý do trong PR.
Xem [chiến lược kiểm thử](testing-strategy.md) khi thay đổi nghiệp vụ.

## Bảo mật cơ bản

Không commit credentials; dùng biến môi trường và `.env.example` an toàn khi cần.
Không đưa API key, token hoặc thông tin cá nhân vào log. Kiểm tra dữ liệu bên ngoài,
bao gồm response dịch vụ AI; không xem nội dung AI trả về là dữ liệu luôn đúng.
