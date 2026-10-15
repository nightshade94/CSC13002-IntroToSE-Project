# Chiến lược kiểm thử

Hướng dẫn cho nhóm 07 - IntroSE 24C02.
Mục tiêu là kiểm tra hành vi có ý nghĩa với test dễ đọc và dễ bảo trì.

## Trạng thái hiện tại

Repository chưa có frontend/backend, test runner, test case hoặc script `test`.
CI hiện chỉ được cấu hình cài dependency bằng lockfile và kiểm tra định dạng.
`pnpm format:check` không phải kiểm thử chức năng.

## Công cụ dự kiến

Theo định hướng [README](../../README.md), nhóm dự kiến dùng:

| Công cụ               | Mục đích                                        |
| --------------------- | ----------------------------------------------- |
| Vitest                | Chạy unit/integration tests                     |
| React Testing Library | Kiểm tra giao diện React qua hành vi người dùng |
| Supertest             | Gửi HTTP request để kiểm tra API Express        |

Các công cụ này chưa được cài hoặc cấu hình; xác nhận cùng stack khi khởi tạo ứng dụng.
Không thêm E2E hoặc coverage threshold ở giai đoạn này.

## Loại test và ví dụ dự kiến

**Unit tests:** kiểm tra pure functions, business logic và validation độc lập.
Ví dụ: dữ liệu hạn sử dụng không hợp lệ, thực phẩm cần ưu tiên, lọc công thức theo nguyên liệu.
Với mỗi quy tắc quan trọng, xét trường hợp bình thường, biên và đầu vào không hợp lệ.
Khi xử lý ngày tháng, dùng thời điểm cố định để test không phụ thuộc ngày chạy.

**Integration tests:** kiểm tra endpoint Express, status code, response và xử lý lỗi.
Khi có database, kiểm tra các tương tác dữ liệu quan trọng trong môi trường test tách biệt;
không dùng dữ liệu người dùng thật. Bổ sung kiểm tra phân quyền khi chức năng xác thực được triển khai.

**Giao diện:** kiểm tra nội dung người dùng thấy và kết quả thao tác, ví dụ thông báo khi nhập
thực phẩm thiếu tên. Tránh phụ thuộc tên hàm nội bộ hoặc cấu trúc component không liên quan hành vi.

**Tích hợp AI:** khi triển khai, kiểm tra cách ứng dụng xử lý response hợp lệ, sai cấu trúc và lỗi dịch vụ.
Dùng dữ liệu mẫu nhỏ thay cho gọi API AI thật trong test tự động; tránh phụ thuộc mạng, chi phí và câu chữ ngẫu nhiên.

## Chính sách kiểm thử

- Thêm/cập nhật test khi đưa vào hoặc thay đổi business logic quan trọng.
- Kiểm tra hành vi API chính, bao gồm lỗi đầu vào và lỗi xử lý cần thiết.
- Thêm regression test cho bug fix khi khả thi.
- PR chỉ sửa tài liệu không cần test mới; không bắt mọi PR phải thêm test.
- Viết tên test rõ hành vi, assertions có ý nghĩa; tránh test chỉ lặp lại implementation.
- Chỉ mock dependency bên ngoài khi cần, tránh hệ thống mock phức tạp.

## Chạy kiểm tra

Hiện có thể chạy `pnpm format:check` để kiểm tra định dạng.
**Lệnh tương lai:** `pnpm test` chỉ được sử dụng sau khi nhóm bổ sung script thật;
hiện chưa chạy được. Chưa có hướng dẫn test theo workspace vì workspace con chưa tồn tại.

Khi khởi tạo ứng dụng, thêm ít nhất một test hành vi frontend và một test API có ý nghĩa,
script chạy một lần phù hợp CI, rồi cập nhật README và workflow tương ứng trong PR triển khai.
Lệnh watch hoặc coverage có thể bổ sung nếu hữu ích, không đặt ngưỡng coverage bắt buộc.
