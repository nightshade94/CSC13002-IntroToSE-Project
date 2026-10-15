# GitHub Flow

Nhóm sử dụng quy trình:

```text
Issue → Branch → Development → Pull Request → CI + Review → Squash Merge
```

Sau merge, đóng Issue và xóa nhánh feature. Xem [CONTRIBUTING](../../CONTRIBUTING.md)
để bắt đầu đóng góp; [thiết lập GitHub](github-setup.md) dành cho maintainer.

## Issue và GitHub Projects

Mỗi Issue có một assignee chính, mô tả rõ mục tiêu và tiêu chí chấp nhận có thể kiểm tra.
Dùng mẫu Feature, Bug hoặc Task; gắn labels loại, độ ưu tiên và khu vực khi phù hợp.
PR cần liên kết Issue tương ứng, ví dụ `Closes #25`.

Nếu dùng GitHub Projects, thống nhất các trạng thái:

| Trạng thái  | Ý nghĩa                                   |
| ----------- | ----------------------------------------- |
| Backlog     | Ý tưởng hoặc công việc chưa sẵn sàng      |
| Ready       | Đã rõ phạm vi, tiêu chí và có thể bắt đầu |
| In Progress | Assignee đang thực hiện                   |
| In Review   | PR sẵn sàng để review                     |
| Done        | Đáp ứng tiêu chí và đã merge nếu có PR    |

## Nhánh và commit

Tạo nhánh từ `main` mới nhất, dùng `<type>/<issue-id>-<description>` với mô tả lowercase kebab-case:

```text
feat/12-fridge-inventory
fix/18-expiry-validation
docs/25-update-readme
test/31-recipe-service
chore/40-update-dependencies
```

Commit dùng Conventional Commits có scope, tập trung vào một thay đổi có ý nghĩa:

```text
feat(web): add inventory page
feat(api): implement ingredient endpoint
fix(api): handle invalid expiry date
docs(repo): update project documentation
```

Các ví dụ ứng dụng mô tả công việc tương lai, không khẳng định tính năng đã tồn tại.
Không có commitlint hoặc kiểm tra tự động tên nhánh/commit.

## Ví dụ làm một thay đổi tài liệu

```bash
git switch main
git pull --ff-only origin main
git switch -c docs/25-update-readme
# Chỉnh sửa file và đọc lại diff.
pnpm format:check
git diff
git add README.md
git commit -m "docs(repo): clarify project scope"
git push -u origin docs/25-update-readme
```

Pre-commit hiện chỉ định dạng các file staged được Prettier hỗ trợ.
Nếu format check báo lỗi, định dạng đúng file liên quan bằng `pnpm exec prettier README.md --write`
rồi kiểm tra lại. Hiện chưa có lệnh lint/typecheck/test/build; bổ sung kiểm tra phù hợp khi ứng dụng tồn tại.

## Pull Request và review

Mở PR nhỏ, tập trung vào một mục đích, đính kèm Issue, mô tả và kết quả kiểm chứng.
Dùng Draft PR khi chưa hoàn thành; chuyển Ready for review và yêu cầu người khác review khi sẵn sàng.
Sửa góp ý trên cùng nhánh rồi commit/push tiếp.

PR thông thường nên có ít nhất một approval từ đồng đội, CI pass và các trao đổi đã giải quyết.
Reviewer chú ý tính đúng đắn, dễ đọc, xử lý lỗi, test và sự nhất quán với kiến trúc.
Thay đổi authentication/authorization, schema database, API contract dùng chung, CI hoặc cấu hình
bảo mật nên có hai người review khi khả thi. Review thứ hai là quy ước nhóm, chưa được tự động bắt buộc.

CI hiện được cấu hình kiểm tra cài dependency bằng lockfile và định dạng;
CI pass chưa chứng minh hành vi ứng dụng đã đúng. Kết quả chạy trên GitHub cần xem ở từng PR.

## Merge và cập nhật nhánh

Tác giả có thể chọn **Squash and merge** khi đủ review và các kiểm tra liên quan pass;
đặt tên squash commit theo Conventional Commits có scope. Không push trực tiếp vào `main`.
Xóa nhánh remote sau merge. `Closes #25` tự đóng Issue khi merge vào nhánh mặc định;
nếu chưa đóng, kiểm tra tiêu chí hoàn thành rồi đóng thủ công.

```bash
git switch main
git pull --ff-only origin main
git branch -d docs/25-update-readme
git fetch --prune
```

Squash merge có thể khiến `-d` từ chối xóa nhánh local. Chỉ dùng
`git branch -D docs/25-update-readme` sau khi kiểm tra PR đã merge và không còn thay đổi riêng cần giữ.

Nếu có conflict, commit hoặc cất thay đổi đang làm trước; chạy `git fetch origin`,
`git merge origin/main` trên nhánh làm việc, xử lý từng file rồi kiểm tra, commit và push.
Nhờ đồng đội hỗ trợ khi chưa hiểu conflict; không force push lên `main`.
