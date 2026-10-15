# Repository Overview

Hệ thống là ý tưởng ứng dụng web quản lý thực phẩm thông minh, giúp người dùng theo dõi thực phẩm đang có trong tủ lạnh, lên kế hoạch bữa ăn và tận dụng nguyên liệu hiệu quả hơn thông qua các tính năng hỗ trợ bởi AI.

Đồ án được phát triển bởi Nhóm 07 - IntroSE 24C02 trong khuôn khổ môn học **Nhập môn Công nghệ phần mềm (CSC13002)**.

> **Trạng thái dự án:** Đang trong giai đoạn phân tích yêu cầu, thiết kế hệ thống và chuẩn bị môi trường phát triển. Các tính năng được mô tả dưới đây là định hướng sản phẩm, chưa phải các chức năng đã triển khai.

## 1. Giới thiệu

### Bối cảnh

Trong sinh hoạt hằng ngày, việc quản lý thực phẩm tại nhà thường gặp những khó khăn như:

- Không nhớ chính xác những nguyên liệu đang có trong tủ lạnh.
- Thực phẩm hết hạn hoặc hư hỏng do không được sử dụng kịp thời.
- Khó quyết định nấu món gì dựa trên nguyên liệu sẵn có.
- Mất thời gian nhập và theo dõi thực phẩm sau khi mua sắm.
- Các thành viên trong gia đình thiếu một nơi chung để quản lý thực phẩm và kế hoạch bữa ăn.

Hệ thống hướng đến việc giải quyết những vấn đề trên bằng cách kết hợp quản lý thực phẩm, lập kế hoạch bữa ăn và ứng dụng AI trong một nền tảng web.

### Mục tiêu sản phẩm

- **Quản lý thực phẩm:** Theo dõi thực phẩm, số lượng, vị trí lưu trữ và hạn sử dụng dự kiến.
- **Giảm lãng phí:** Hỗ trợ nhận biết các nguyên liệu cần được ưu tiên sử dụng.
- **Gợi ý món ăn:** Đề xuất công thức nấu ăn dựa trên những nguyên liệu hiện có.
- **Lập kế hoạch:** Hỗ trợ xây dựng thực đơn và kế hoạch sử dụng thực phẩm.
- **Cộng tác gia đình:** Cho phép các thành viên cùng quản lý không gian lưu trữ chung.
- **Mở rộng kết nối:** Khám phá khả năng tích hợp cộng đồng và các chương trình ưu đãi từ doanh nghiệp, đối tác.

## 2. Các nhóm tính năng dự kiến

### 2.1. Quản lý tủ lạnh và kho thực phẩm (Fridge & Inventory Management)

Đây là nhóm chức năng nền tảng của ứng dụng.

- Thêm, cập nhật và xóa thực phẩm.
- Quản lý tên, danh mục, số lượng, đơn vị và vị trí lưu trữ.
- Ghi nhận ngày mua, ngày nhập kho và hạn sử dụng dự kiến.
- Theo dõi những thực phẩm sắp hết hạn.
- Hỗ trợ nhập thực phẩm thủ công.
- Định hướng hỗ trợ nhận diện thực phẩm từ hóa đơn mua hàng (OCR).

### 2.2. Gợi ý công thức nấu ăn (AI Recipe Recommendation)

Hỗ trợ người dùng tìm kiếm và lựa chọn món ăn từ những nguyên liệu hiện có.

- Gợi ý món ăn dựa trên nguyên liệu trong tủ lạnh.
- Ưu tiên sử dụng thực phẩm sắp hết hạn.
- Hiển thị những nguyên liệu còn thiếu để hoàn thành công thức.
- Hỗ trợ khám phá các công thức phù hợp với nhu cầu của người dùng.

AI đóng vai trò hỗ trợ đề xuất; người dùng vẫn là người quyết định lựa chọn món ăn và nguyên liệu.

### 2.3. Trợ lý lập kế hoạch bữa ăn (AI Meal Planning Assistant)

Định hướng xây dựng trợ lý hội thoại sử dụng mô hình ngôn ngữ lớn (LLM) để hỗ trợ người dùng:

- Lên ý tưởng cho bữa ăn hằng ngày.
- Xây dựng thực đơn theo khoảng thời gian.
- Điều chỉnh gợi ý theo sở thích và nguyên liệu sẵn có.
- Lập danh sách nguyên liệu cần mua bổ sung.
- Giải đáp các câu hỏi liên quan đến việc sử dụng thực phẩm.

### 2.4. Quản lý thực phẩm theo hộ gia đình (Household Collaboration)

Cho phép nhiều thành viên phối hợp quản lý thực phẩm trong cùng một không gian.

- Tạo và tham gia nhóm hộ gia đình.
- Chia sẻ danh sách thực phẩm chung.
- Đồng bộ thay đổi giữa các thành viên.
- Phối hợp cập nhật kho thực phẩm và kế hoạch bữa ăn.

### 2.5. Tài khoản và phân quyền (Authentication & Authorization)

Hệ thống dự kiến hỗ trợ đăng ký, đăng nhập, quản lý tài khoản và phân quyền theo vai trò.

Các vai trò đang được xem xét:

| Vai trò                                 | Mô tả                                                                                         |
| --------------------------------------- | --------------------------------------------------------------------------------------------- |
| Người dùng (User)                       | Quản lý thực phẩm, sử dụng gợi ý món ăn, lập kế hoạch và tham gia nhóm hộ gia đình            |
| Quản trị viên (Admin)                   | Quản lý hệ thống, tài khoản và các nội dung thuộc phạm vi quản trị                            |
| Đối tác doanh nghiệp (Business Partner) | Vai trò tiềm năng dành cho doanh nghiệp tham gia cung cấp ưu đãi hoặc chương trình khuyến mãi |

**Lưu ý:** Vai trò Business Partner vẫn đang được nhóm phân tích và chưa được xác nhận là một actor chính thức trong phạm vi triển khai.

## 3. Các tính năng mở rộng đang nghiên cứu

Những tính năng sau thuộc định hướng phát triển và **chưa được cam kết triển khai trong phiên bản đầu tiên**.

| Tính năng            | Ý tưởng                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------- |
| OCR hóa đơn          | Nhận diện danh sách hàng hóa từ ảnh hóa đơn và hỗ trợ thêm vào kho thực phẩm             |
| AI Expiry Estimation | Ước tính thời gian bảo quản của thực phẩm dựa trên thông tin có sẵn và điều kiện lưu trữ |
| Community            | Cho phép chia sẻ công thức, bài viết và tương tác giữa người dùng                        |
| Business Promotions  | Kết nối các ưu đãi, chương trình khuyến mãi phù hợp với nhu cầu mua sắm                  |
| Shopping Insights    | Phân tích xu hướng tiêu dùng ở mức tổng hợp phục vụ nghiên cứu và cải thiện dịch vụ      |

**Định hướng về quyền riêng tư:** Mọi chức năng phân tích hoặc chia sẻ dữ liệu với đối tác phải được đánh giá về tính cần thiết, sự đồng ý của người dùng và khả năng bảo vệ dữ liệu cá nhân. Nhóm không mặc định thu thập, chia sẻ hoặc thương mại hóa dữ liệu người dùng.

**Lưu ý về AI:** Hạn sử dụng do AI ước tính chỉ mang tính tham khảo, không thay thế nhãn sản phẩm, hướng dẫn bảo quản hay đánh giá an toàn thực phẩm.

## 4. Phạm vi phát triển

Để phù hợp với thời lượng môn học, nhóm dự kiến ưu tiên những luồng nghiệp vụ có giá trị cốt lõi.

**Phạm vi ưu tiên đề xuất:**

1. Quản lý tài khoản người dùng.
2. Quản lý tủ lạnh và danh sách thực phẩm.
3. Theo dõi hạn sử dụng và thực phẩm cần ưu tiên.
4. Gợi ý công thức nấu ăn từ nguyên liệu sẵn có.
5. Hỗ trợ lập kế hoạch bữa ăn cơ bản.

Các chức năng về cộng tác hộ gia đình, OCR, AI nâng cao, cộng đồng và đối tác doanh nghiệp sẽ được đánh giá thêm dựa trên yêu cầu môn học, mức độ ưu tiên và khả năng thực hiện.

Phạm vi MVP chính thức sẽ được cập nhật sau khi nhóm hoàn tất phân tích yêu cầu.

## 5. Công nghệ và kiến trúc

### Hiện trạng repository

Repository hiện được thiết lập ở mức nền tảng, chưa có mã nguồn ứng dụng frontend/backend.

Các công cụ đang được sử dụng:

| Thành phần             | Công nghệ           |
| ---------------------- | ------------------- |
| Runtime cho công cụ    | Node.js 24 LTS      |
| Package Manager        | pnpm 10.32.1        |
| Code Formatter         | Prettier            |
| Git Hooks              | Husky + lint-staged |
| Continuous Integration | GitHub Actions      |

### Công nghệ dự kiến

Nhóm đang định hướng phát triển ứng dụng theo kiến trúc fullstack monorepo.

| Thành phần     | Công nghệ dự kiến                        |
| -------------- | ---------------------------------------- |
| Frontend       | React + Vite + TypeScript                |
| Backend        | Node.js + Express + TypeScript           |
| Workspace      | pnpm Workspaces                          |
| Linting        | ESLint với TypeScript type-aware rules   |
| Testing        | Vitest, React Testing Library, Supertest |
| AI Integration | Dịch vụ LLM/API, chưa chọn nhà cung cấp  |
| Database       | Chưa quyết định                          |
| Deployment     | Chưa quyết định                          |

Cấu trúc ứng dụng dự kiến:

```text
apps/
├── web/         # Frontend React
└── api/         # Backend Express

packages/
└── shared/      # Types và schemas dùng chung khi cần
```

Các quyết định kiến trúc sẽ tiếp tục được cập nhật tại [tài liệu kiến trúc](docs/architecture/overview.md).

## 6. Hướng dẫn thiết lập môi trường

### Yêu cầu

- Git.
- Node.js **24 LTS**.
- pnpm **10.32.1**.

Nếu sử dụng nvm:

```bash
nvm install 24
nvm use 24
```

Cài đặt pnpm:

```bash
npm install --global pnpm@10.32.1
```

### Clone và cài đặt

```bash
git clone https://github.com/nightshade94/CSC13002-IntroToSE-Project.git
cd CSC13002-IntroToSE-Project

pnpm install
pnpm format:check
```

`pnpm install` sẽ cấu hình Git hook thông qua script `prepare`. Nếu hook chưa được kích hoạt, chạy:

```bash
pnpm run prepare
```

Hiện tại repository mới có công cụ hỗ trợ phát triển, chưa có ứng dụng để chạy bằng `pnpm dev`.

### Các lệnh hiện có

| Lệnh                | Mô tả                                      |
| ------------------- | ------------------------------------------ |
| `pnpm install`      | Cài đặt dependencies và thiết lập Git hook |
| `pnpm format`       | Định dạng các file được hỗ trợ             |
| `pnpm format:check` | Kiểm tra định dạng mã nguồn và tài liệu    |

Các lệnh `dev`, `lint`, `typecheck`, `test` và `build` sẽ được bổ sung khi các ứng dụng tương ứng được khởi tạo.

### Biến môi trường

Hiện tại repository chưa yêu cầu `.env` hoặc tài khoản dịch vụ bên ngoài.

Khi cần cấu hình API, database hoặc dịch vụ AI, nhóm sẽ bổ sung `.env.example` với giá trị mẫu an toàn.

Không commit API keys, mật khẩu hoặc các secrets lên repository.

## 7. Cấu trúc repository hiện tại

```text
.github/              # GitHub Actions, Issue và PR templates
.husky/               # Git hooks
docs/
├── architecture/     # Tài liệu kiến trúc
└── development/      # Quy trình cộng tác, coding và testing

package.json          # Scripts và công cụ dùng chung
pnpm-workspace.yaml   # Cấu hình workspace
pnpm-lock.yaml        # Dependency lockfile
README.md             # Giới thiệu dự án
CONTRIBUTING.md       # Hướng dẫn đóng góp
```

Cấu trúc sẽ được mở rộng khi nhóm bắt đầu phát triển ứng dụng.

## 8. Quy trình phát triển và cộng tác

Nhóm sử dụng **GitHub Flow** kết hợp GitHub Issues và Pull Requests để quản lý công việc.

Quy trình cơ bản:

```text
Create Issue
    ↓
Create Feature Branch
    ↓
Implement & Test
    ↓
Open Pull Request
    ↓
CI Checks & Code Review
    ↓
Squash Merge into main
```

Quy ước đặt tên nhánh:

```text
feat/12-fridge-inventory
fix/18-expiry-date-validation
docs/25-update-requirements
```

Commit message sử dụng Conventional Commits:

```text
feat(web): add fridge inventory page
feat(api): implement ingredient endpoint
fix(api): handle invalid expiry date
docs(repo): update project overview
```

Nhóm hướng đến việc có ít nhất một thành viên khác review trước khi merge và kiểm tra chất lượng tự động thông qua GitHub Actions.

Chi tiết xem tại [CONTRIBUTING.md](CONTRIBUTING.md).

## 9. Mục tiêu học tập

Bên cạnh việc xây dựng sản phẩm, dự án hướng đến việc thực hành các hoạt động trong vòng đời phát triển phần mềm:

- Khảo sát và phân tích yêu cầu.
- Xác định actors, use cases và phạm vi hệ thống.
- Thiết kế kiến trúc và mô hình dữ liệu.
- Quản lý công việc bằng GitHub Issues/Projects.
- Làm việc nhóm thông qua Git và Pull Requests.
- Xây dựng và kiểm thử phần mềm.
- Tích hợp kiểm tra tự động bằng CI.
- Viết tài liệu và quản lý thay đổi.

Nhóm ưu tiên **chất lượng quy trình, khả năng cộng tác và tính hoàn thiện của chức năng cốt lõi** thay vì triển khai quá nhiều tính năng trong thời gian ngắn.

## 10. Nhóm phát triển

Dự án được phát triển bởi Nhóm 07 - IntroSE 24C02 trong khuôn khổ môn học **Nhập môn Công nghệ phần mềm (CSC13002)**.

Thông tin chi tiết về thành viên và vai trò sẽ được cập nhật sau khi nhóm thống nhất phân công.

## 11. Tài liệu tham khảo nội bộ

- [Hướng dẫn đóng góp — CONTRIBUTING.md](CONTRIBUTING.md)
- [Tổng quan kiến trúc](docs/architecture/overview.md)
- [Thiết lập GitHub](docs/development/github-setup.md)

---

_Quản lý thực phẩm thông minh, lên kế hoạch bữa ăn hiệu quả và hướng đến giảm lãng phí thực phẩm._

_Project — CSC13002: Introduction to Software Engineering._
_Information Technology Faculty, University Of Science._
