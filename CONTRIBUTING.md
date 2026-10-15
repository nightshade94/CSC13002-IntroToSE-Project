# Hướng dẫn đóng góp

## Bắt đầu

1. Cài công cụ theo [README](README.md), chạy `pnpm install` và `pnpm format:check`.
2. Tạo hoặc chọn Issue có mục tiêu, phạm vi và tiêu chí hoàn thành rõ ràng.
3. Mỗi Issue có **một assignee chính**; có thể trao đổi hoặc làm cùng người khác.
4. Thống nhất hướng làm trong Issue trước các thay đổi lớn, đặc biệt khi lựa chọn stack FE/BE.

Chọn mẫu Feature, Bug hoặc Task khi mở Issue. Nếu dùng GitHub Projects, đề xuất trạng thái:
`Backlog → Ready → In Progress → In Review → Done`.

## Nhánh và commit

Tạo nhánh từ `main` mới nhất, theo `<type>/<issue-id>-<description>`;
mô tả dùng lowercase kebab-case. Ví dụ `docs/25-update-readme`, `chore/40-update-dependencies`.

Commit dùng Conventional Commits có scope, ví dụ:

```text
docs(repo): update contribution guide
chore(deps): update prettier
feat(web): add login form
fix(api): handle invalid request
```

Mỗi commit nên tập trung vào một thay đổi có ý nghĩa. Chưa tự động bắt buộc tên nhánh
hoặc commit message. Xem [ví dụ quy trình đầy đủ](docs/development/git-workflow.md).

## Pull Request và review

- Mở PR vào `main`, điền mẫu PR và liên kết Issue bằng `Closes #<id>`.
- Mở **Draft PR** để trao đổi khi công việc chưa hoàn thành; chuyển Ready for review khi sẵn sàng.
- Tự review diff, tránh thay đổi ngoài phạm vi Issue, không commit secrets.
- Chạy `pnpm format:check`; nếu cần sửa định dạng, chạy `pnpm format` rồi kiểm tra diff.
- Sau khi có ứng dụng, chạy thêm lint, typecheck, test, build đã được cấu hình thực tế.
- Test được thêm/cập nhật khi thay đổi hành vi hoặc sửa lỗi; PR chỉ sửa tài liệu không cần test mới.

PR thông thường nên có ít nhất **một approval từ thành viên khác**.
PR liên quan authentication/authorization, schema database, API contract dùng chung,
CI hoặc bảo mật nên có **hai approvals khi khả thi**.
Reviewer chú ý tính đúng đắn, dễ đọc, khả năng bảo trì, xử lý lỗi, test và kiến trúc nhất quán.
Góp ý cụ thể, lịch sự; phân biệt lỗi cần sửa với đề xuất tùy chọn.

## Merge

Tác giả có thể **Squash and merge** khi đủ review, CI pass và đã xử lý các trao đổi.
Tên squash commit nên theo Conventional Commits có scope. Không push trực tiếp vào `main`.
Sau merge, xóa nhánh feature và kiểm tra Issue đã đóng.
Các quy tắc này cần maintainer cấu hình trên GitHub theo [hướng dẫn](docs/development/github-setup.md).
