# Hướng dẫn đóng góp

Tài liệu này hướng dẫn các thành viên tham gia theo quy trình cộng tác thống nhất.

Nhóm sử dụng:

- **Jira:** Quản lý công việc, phân công nhiệm vụ và theo dõi tiến độ.
- **GitHub:** Quản lý mã nguồn, branches, Pull Requests và Code Review.
- **GitHub Actions:** Kiểm tra tự động khi tạo hoặc cập nhật Pull Request.

Mục tiêu là duy trì quy trình rõ ràng, dễ thực hiện và phù hợp với nhóm mới tiếp cận Software Engineering.

## 1. Bắt đầu

1. Cài đặt công cụ theo hướng dẫn trong [README](README.md).
2. Chạy `pnpm install` để cài đặt dependencies.
3. Chạy `pnpm format:check` để kiểm tra định dạng.
4. Truy cập Jira Project của nhóm để xem danh sách công việc.
5. Chọn hoặc nhận một Jira Issue đã có yêu cầu và tiêu chí hoàn thành rõ ràng.

Mỗi Jira Issue nên có:

- **Summary:** Tên công việc ngắn gọn.
- **Description:** Mô tả mục tiêu và phạm vi.
- **Issue Type:** Story, Task hoặc Bug.
- **Priority:** Mức độ ưu tiên.
- **Assignee:** Một người chịu trách nhiệm chính.
- **Acceptance Criteria:** Các điều kiện để xác nhận hoàn thành.

Thành viên có thể phối hợp thực hiện nhưng cần có một người chịu trách nhiệm theo dõi tiến độ chính.

Trước những thay đổi lớn về kiến trúc, API hoặc công nghệ, hãy trao đổi trong Jira Issue hoặc với nhóm.

## 2. Jira Workflow

Nhóm sử dụng Kanban Board trên Jira với các trạng thái:

```text
Backlog → Ready → In Progress → In Review → Done
```

| Trạng thái  | Ý nghĩa                                               |
| ----------- | ----------------------------------------------------- |
| Backlog     | Công việc được ghi nhận nhưng chưa sẵn sàng thực hiện |
| Ready       | Yêu cầu đã rõ ràng và có thể bắt đầu                  |
| In Progress | Thành viên đang thực hiện                             |
| In Review   | Đã hoàn thành phần triển khai và đang chờ PR review   |
| Done        | PR đã merge và công việc đáp ứng Acceptance Criteria  |

### Quy trình thực hiện một Jira Issue

1. Chọn Issue ở trạng thái `Ready`.
2. Gán Assignee và chuyển sang `In Progress`.
3. Tạo Git branch gắn với Jira Issue Key.
4. Thực hiện thay đổi và commit code.
5. Mở Pull Request trên GitHub.
6. Chuyển Issue sang `In Review` khi PR đã sẵn sàng review.
7. Sau khi PR được approve, CI pass và merge, chuyển Jira Issue sang `Done`.

Nếu Jira đã được tích hợp với GitHub, các thông tin branch, commit và PR có thể hiển thị trong phần Development của Jira Issue.

Việc tự động chuyển trạng thái Jira sau khi merge chỉ hoạt động khi nhóm đã cấu hình automation tương ứng. Nếu chưa có, Assignee cập nhật thủ công.

## 3. Nhánh và Commit

### Branch Naming

Tạo branch từ `main` mới nhất.

Sử dụng quy tắc:

```text
<type>/<JIRA-KEY>-<description>
```

Ví dụ, với Jira Project Key là `SFP`:

```text
feat/SFP-12-fridge-inventory
fix/SFP-18-expiry-validation
docs/SFP-25-update-readme
chore/SFP-40-update-dependencies
```

Quy ước:

- `type` viết thường: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`.
- Jira Issue Key giữ nguyên định dạng, ví dụ `SFP-12`.
- Phần mô tả dùng lowercase kebab-case.
- Một branch nên tập trung vào một Jira Issue chính.
- Không push code trực tiếp vào `main`.

### Commit Convention

Sử dụng **Conventional Commits với scope**:

```text
<type>(<scope>): <description>
```

Ví dụ:

```text
feat(web): add fridge inventory page SFP-12
feat(api): implement ingredient endpoint SFP-15
fix(api): handle invalid expiry date SFP-18
docs(repo): update contribution guide SFP-25
chore(deps): update prettier SFP-40
```

Scope đề xuất:

| Scope    | Phạm vi             |
| -------- | ------------------- |
| `web`    | Frontend            |
| `api`    | Backend             |
| `shared` | Code dùng chung     |
| `repo`   | Cấu hình repository |
| `deps`   | Dependencies        |
| `ci`     | CI workflows        |

Mỗi commit nên tập trung vào một thay đổi có ý nghĩa.

Hiện tại nhóm chưa bắt buộc kiểm tra tự động branch naming hoặc commit message.

Xem thêm tại [Git Workflow](docs/development/git-workflow.md).

## 4. Pull Request và Code Review

Sau khi hoàn thiện công việc, tạo Pull Request vào nhánh `main`.

### PR Title

Sử dụng Conventional Commits và Jira Issue Key:

```text
feat(web): implement fridge inventory page [SFP-12]
```

### PR Description

Sử dụng Pull Request Template có sẵn trong repository.

PR cần thể hiện:

- Mục tiêu và những thay đổi chính.
- Jira Issue liên quan, ví dụ `SFP-12` kèm đường dẫn Jira.
- Cách kiểm thử thay đổi.
- Screenshot nếu thay đổi giao diện.
- Những điểm reviewer cần chú ý.

**Lưu ý:** Không sử dụng `Closes #12` để liên kết Jira Issue. Cú pháp này dành cho GitHub Issues.

Jira Issue Key trong branch, commit và PR sẽ hỗ trợ liên kết với Jira khi tích hợp GitHub đã được cấu hình.

### Trước khi yêu cầu Review

- Tự kiểm tra các thay đổi bằng `git diff`.
- Không đưa thay đổi ngoài phạm vi công việc vào PR.
- Không commit credentials, API keys hoặc secrets.
- Chạy `pnpm format:check`.
- Nếu cần sửa định dạng, chạy `pnpm format` và kiểm tra lại diff.
- Khi ứng dụng đã được khởi tạo, chạy thêm lint, typecheck, test và build theo cấu hình thực tế.
- Bổ sung hoặc cập nhật test khi thay đổi business logic, API behavior hoặc sửa bug.

Không bắt buộc bổ sung test mới cho PR chỉ thay đổi tài liệu.

Có thể mở **Draft Pull Request** để nhận góp ý sớm. Chỉ chuyển sang `Ready for review` khi thay đổi đã sẵn sàng để đánh giá.

### Code Review

PR thông thường nên có ít nhất **1 approval từ thành viên khác**.

Các thay đổi quan trọng nên có **2 approvals khi khả thi**, bao gồm:

- Authentication và Authorization.
- Database schema.
- Shared API contracts.
- CI configuration.
- Security-sensitive changes.

Reviewer nên tập trung vào:

- Tính đúng đắn của chức năng.
- Mức độ đáp ứng Acceptance Criteria.
- Khả năng đọc hiểu và bảo trì.
- Error handling và input validation.
- Chất lượng kiểm thử.
- Tính nhất quán với kiến trúc hiện tại.

Đưa ra góp ý rõ ràng, lịch sự và phân biệt lỗi cần sửa với đề xuất cải thiện không bắt buộc.

## 5. Merge và hoàn thành công việc

Tác giả PR có thể thực hiện **Squash and merge** khi:

- PR đã được review theo quy định.
- Các CI checks bắt buộc đều pass.
- Các review conversations cần giải quyết đã được xử lý.
- Không còn vấn đề quan trọng chưa thống nhất.

Tên Squash Commit nên tuân thủ Conventional Commits và chứa Jira Issue Key.

Sau khi merge:

1. Xóa feature branch trên GitHub.
2. Kiểm tra Jira Issue và liên kết PR.
3. Xác nhận Acceptance Criteria đã hoàn thành.
4. Chuyển Jira Issue sang `Done` nếu chưa có automation.
5. Cập nhật tài liệu liên quan nếu cần.

Không push trực tiếp vào `main`.

Các thiết lập Branch Protection và Merge Strategy được maintainer quản lý theo [hướng dẫn GitHub](docs/development/github-setup.md).

## 6. Ví dụ quy trình hoàn chỉnh

Giả sử nhóm cần triển khai giao diện quản lý thực phẩm.

**Bước 1 — Jira**

Tạo hoặc nhận Issue:

```text
SFP-12: Implement fridge inventory page
```

Chuyển Issue sang `In Progress`.

**Bước 2 — Git**

```bash
git switch main
git pull origin main
git switch -c feat/SFP-12-fridge-inventory
```

**Bước 3 — Development**

Triển khai chức năng, thực hiện kiểm tra cần thiết và commit:

```bash
git add .
git commit -m "feat(web): add fridge inventory page SFP-12"
git push -u origin feat/SFP-12-fridge-inventory
```

**Bước 4 — Pull Request**

Tạo PR:

```text
feat(web): implement fridge inventory page [SFP-12]
```

Thêm liên kết đến Jira Issue trong mô tả PR.

Chuyển Issue sang `In Review` khi PR sẵn sàng review.

**Bước 5 — Review & Merge**

Sau khi được approval và CI pass, thực hiện Squash Merge.

**Bước 6 — Jira**

Kiểm tra chức năng đã đáp ứng Acceptance Criteria và chuyển Issue sang `Done`.

---

## 7. Nguyên tắc làm việc nhóm

- Mỗi công việc nên được theo dõi bằng Jira Issue.
- Mỗi Issue có một người chịu trách nhiệm chính.
- Chủ động trao đổi khi gặp khó khăn hoặc có thay đổi về phạm vi.
- Ưu tiên Pull Request nhỏ, dễ review.
- Không merge code chưa đáp ứng các kiểm tra bắt buộc.
- Không yêu cầu quy trình phức tạp hơn mức cần thiết.
- Tôn trọng phản hồi của các thành viên và cùng chịu trách nhiệm về chất lượng sản phẩm.

**Mục tiêu:** Xây dựng thói quen làm việc nhóm có tổ chức, có khả năng truy vết và kiểm soát chất lượng, đồng thời duy trì quy trình đơn giản để mọi thành viên đều có thể tham gia.
