# Concept Trace - Request to Database Trace

## 1. Relationship Mapping (Slot 18 - Step 8)
- **Owning side**: `Orchid` là owning side vì chứa `@ManyToOne` và `@JoinColumn(name = "category_id")`. Thực thể này trực tiếp nắm giữ và quản lý khóa ngoại `category_id` trong cơ sở dữ liệu.
- **Foreign key**: Khóa ngoại `category_id` nằm ở bảng `orchids` tham chiếu tới khóa chính `category_id` của bảng `orchid_categories`.
- **Ý nghĩa mappedBy**: `mappedBy = "orchidCategory"` được đặt ở phía `@OneToMany` trong `OrchidCategory`. Nó chỉ định rằng quan hệ được quản lý bởi trường Java `orchidCategory` bên phía `Orchid` (không phải tên cột trong DB), biến `OrchidCategory` thành inverse side để tránh việc Hibernate tạo thêm bảng trung gian không cần thiết.

---

## 2. POST /api/orchids End-to-End Trace

1. **HTTP Request**:
   - Method: `POST`
   - URL: `http://localhost:8080/api/orchids`
   - Header: `Content-Type: application/json`
   - Body:
     ```json
     {
       "orchidName": "Cattleya Queen",
       "isNatural": true,
       "orchidDescription": "Demo orchid for Slot 18",
       "orchidCategory": { "categoryId": 1 },
       "isAttractive": true,
       "orchidURL": "https://example.com/orchid.jpg"
     }
     ```

2. **Controller (`OrchidController.create`)**:
   - Nhận request body thông qua annotation `@RequestBody Orchid orchid`.
   - Gọi `orchidService.create(orchid)`.

3. **Service (`OrchidService.create`)**:
   - Bắt đầu Transaction boundary (`@Transactional`).
   - Kiểm tra business rule / validation quan hệ qua `resolveCategory(orchid)`:
     - Trích xuất `categoryId` từ request. Nếu thiếu ném `IllegalArgumentException("categoryId is required")`.
     - Gọi `categoryRepository.findById(categoryId)`. Nếu không tìm thấy ném `IllegalArgumentException("Category not found: " + categoryId)`.
   - Gán `orchid.setOrchidID(null)` để đảm bảo thực hiện INSERT thay vì UPDATE.
   - Gán thực thể category đã quản lý (`managed entity`) vào orchid: `orchid.setOrchidCategory(managedCategory)`.
   - Gọi `orchidRepository.save(orchid)`.

4. **Repository (`IOrchidRepository`)**:
   - Kế thừa `JpaRepository<Orchid, Long>`, cung cấp hàm `save()`.

5. **Hibernate / JPA Provider**:
   - Quản lý persistence context, chuyển thực thể `Orchid` vào trạng thái persistent.
   - Chuẩn bị câu lệnh SQL INSERT kèm khóa ngoại `category_id`.

6. **SQL Server**:
   - Nhận câu lệnh:
     ```sql
     INSERT INTO orchids (is_attractive, is_natural, orchid_description, orchid_name, orchidurl, category_id)
     VALUES (?, ?, ?, ?, ?, ?);
     ```
   - Sinh identity PK cho `orchidid`.

7. **Database State**:
   - Bảng `orchids` xuất hiện 1 row mới với `orchidid` tự tăng và `category_id = 1`.

8. **HTTP Response**:
   - Controller bắt kết quả, trả về `HttpStatus.CREATED` (201) kèm JSON thực thể `Orchid` vừa được tạo.

---

## 3. GET /api/orchids/{id} End-to-End Trace

1. **HTTP Request**:
   - Method: `GET`
   - URL: `http://localhost:8080/api/orchids/1`

2. **Controller (`OrchidController.getById`)**:
   - Trích xuất ID từ URL qua `@PathVariable Long id`.
   - Gọi `orchidService.getById(id)`.

3. **Service (`OrchidService.getById`)**:
   - Chạy trong transaction đọc (`@Transactional(readOnly = true)`).
   - Gọi `orchidRepository.findById(id)`.

4. **Repository & Hibernate**:
   - Hibernate sinh câu lệnh SQL `SELECT` từ bảng `orchids` theo `orchidid = ?`.

5. **SQL Server**:
   - Trả về dòng dữ liệu nếu tồn tại, hoặc rỗng nếu không tìm thấy.

6. **HTTP Response**:
   - Nếu tìm thấy: Controller bọc kết quả vào `ResponseEntity.ok(orchid)` -> Status **200 OK**.
   - Nếu không tìm thấy: Controller trả về `ResponseEntity.notFound().build()` -> Status **404 Not Found**.
