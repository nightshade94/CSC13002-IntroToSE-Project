# Thiết lập GitHub

Checklist cho maintainer.
Chỉ kiểm tra file local trong lần cập nhật tài liệu này; **chưa xác minh hoặc thay đổi cài đặt remote**.

## Đã xác minh trong repository

- Có ba mẫu Issue Feature/Bug/Task và mẫu PR trong `.github/`.
- `.github/workflows/ci.yml` khai báo CI cho PR vào `main` và push lên `main`.
- Job `Repository quality` dùng Node.js theo `.nvmrc`, pnpm theo `package.json`, cache pnpm,
  chạy `pnpm install --frozen-lockfile` và `pnpm format:check`.
- Chưa có CI ESLint, typecheck, unit/integration test hoặc build; thêm sau khi có ứng dụng.
- Chưa có `.github/CODEOWNERS`.

Các file này không xác nhận workflow đã chạy thành công, repository đang private hoặc protection đã bật.

## Repository và quyền truy cập — cấu hình thủ công

Đề xuất repository **Private** trong giai đoạn làm đồ án, tùy yêu cầu môn học và thống nhất nhóm.
Người có quyền phù hợp kiểm tra **Settings → General → Danger Zone → Change repository visibility**;
chỉ đổi visibility sau khi hiểu tác động và nhóm đã đồng ý.

Phân công 1–2 người phụ trách duy trì repository; quyền thực tế phụ thuộc ownership:

- **Repository cá nhân:** chỉ có owner và collaborators. Collaborators của repo private có quyền
  đọc/ghi; không có role `Maintain`/`Admin` riêng để gán cho maintainer thứ hai.
  Owner quản lý cài đặt và mời thành viên qua **Settings → Collaborators**.
- **Repository của organization:** có thể dùng `Write` cho developers, `Maintain` cho người quản lý
  công việc và `Admin` cho người thực sự cần quản lý quyền/protection. `Maintain` không thay thế mọi quyền
  `Admin`. Kiểm tra trong **Settings → Collaborators and teams** hoặc mục quyền truy cập tương ứng.

GitHub Pro của tài khoản cá nhân không tạo mô hình phân quyền giống organization dùng GitHub Team.
Xem [quyền repo cá nhân](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository)
và [roles của organization](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization).

## Merge

Vào **Settings → General → Pull Requests**:

- [x] Bật **Allow squash merging**.
- [x] Tắt **Allow merge commits** và **Allow rebase merging** khi nhóm thống nhất chỉ dùng squash.
- [x] Bật **Automatically delete head branches** để xóa nhánh feature sau merge.

## Bảo vệ main

Với quyền phù hợp, vào **Settings → Branches → Add branch protection rule**, pattern `main`:

- [x] Bật **Require a pull request before merging**.
- [x] Bật **Require approvals**, đặt ít nhất **1** approval.
- [x] Bật **Require conversation resolution before merging**.
- [x] Bật **Require status checks to pass before merging**, chọn check **Repository quality**
      sau khi check xuất hiện từ lần chạy CI trên GitHub.
- [x] Giữ **Allow force pushes** và **Allow deletions** tắt.
- [x] Lưu và kiểm tra rule có áp dụng đúng `main`.

Nếu dùng **Settings → Rules → Rulesets**, tạo branch ruleset cho `main` với yêu cầu tương đương,
bật enforcement **Active** và kiểm tra quyền bypass. Chọn một cách cấu hình dễ quản lý cho nhóm.
Ngăn xóa `main` khác với tự động xóa nhánh feature sau merge.

Khả năng bảo vệ repo private phụ thuộc gói GitHub, owner cá nhân/organization và tính năng được hỗ trợ.
Không suy ra quyền enforcement chỉ từ tên gói Pro/Team; kiểm tra UI và
[tài liệu protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
Nếu không hỗ trợ, ghi nhận giới hạn và áp dụng review theo quy ước nhóm, không tuyên bố đã enforce.
Hai reviews cho thay đổi quan trọng là chính sách nhóm theo [Git workflow](git-workflow.md), chưa có automation riêng.

## Issues, labels và Projects

1. Kiểm tra **Settings → General → Features → Issues** đã bật.
2. Vào **Issues → Labels**, thêm bộ nhãn nhỏ sau nếu chưa có:

   | Nhóm    | Labels đề xuất                                     |
   | ------- | -------------------------------------------------- |
   | Loại    | `type:feature`, `type:bug`, `type:docs`            |
   | Ưu tiên | `priority:high`, `priority:medium`, `priority:low` |
   | Khu vực | `area:web`, `area:api`, `area:shared`              |

   Dùng nhãn phù hợp với Issue thực tế; chưa cần dùng `area:shared` khi chưa có phần dùng chung.

3. Tạo Project từ trang **Projects** của owner/organization, chọn **New project → Board**.
4. Sửa field **Status** thành `Backlog`, `Ready`, `In Progress`, `In Review`, `Done`;
   đặt Board group theo Status. Ý nghĩa từng trạng thái ở [Git workflow](git-workflow.md).
5. Liên kết Project với repository qua tab **Projects** của repository nếu UI hỗ trợ,
   thêm Issues và chọn một assignee chính cho mỗi Issue. Kiểm tra quyền xem/chỉnh sửa Project riêng.

Tên mục có thể khác theo UI và ownership. Chưa tạo Project, labels hoặc thay đổi quyền từ tài liệu này.

## Ownership và kiểm tra sau setup

Chỉ thêm CODEOWNERS khi nhóm đã thống nhất username/team thật có quyền phù hợp.
Ví dụ cú pháp: `docs/ @<github-username>`; thay placeholder trước khi đưa vào file hoạt động.
Không thêm bot hoặc quy trình approval phức tạp.

Maintainer cần xác nhận visibility/quyền, merge settings, rule cho `main` và kết quả CI trên PR thực tế.
Khi có ứng dụng, bổ sung ESLint, typecheck, test và build vào CI; cập nhật required checks nếu tên job đổi.
