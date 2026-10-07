# SBA301 - Lab 04: Orchid REST API & JPA Integration Kit

Dự án triển khai RESTful API quản lý hoa lan (Orchids) tích hợp lưu trữ trong Microsoft SQL Server sử dụng Spring Boot 3.x và Spring Data JPA.

## 1. Yêu cầu môi trường (Prerequisites)
- **JDK 21**
- **Apache Maven 3.9+**
- **Microsoft SQL Server** (chạy trên port 1433)
- **Postman** (kiểm thử API)

## 2. Chuẩn bị Cơ sở dữ liệu (DB Setup)
Mở SSMS hoặc `sqlcmd` và tạo cơ sở dữ liệu:
```sql
CREATE DATABASE OrchidDB;
GO
```

Chèn dữ liệu danh mục mẫu (`orchid_categories`):
```sql
USE OrchidDB;
GO

INSERT INTO orchid_categories (category_name)
VALUES ('Cattleya'), ('Dendrobium');
GO
```

## 3. Cấu hình (Configuration)
Cấu hình trong file `src/main/resources/application.properties`:
```properties
spring.application.name=slot18-orchid-lab
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=OrchidDB;encrypt=true;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=123456
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
server.port=8080
```
*(Lưu ý: Thay đổi username và password phù hợp với môi trường SQL Server cá nhân nếu khác)*

## 4. Chạy ứng dụng (Run)
Sử dụng Maven để build và chạy ứng dụng:
```bash
mvn clean package
mvn spring-boot:run
```
Ứng dụng sẽ khởi chạy tại cổng `http://localhost:8080`.

## 5. Danh sách Endpoints (API Endpoints)
- `GET /api/orchids` : Lấy danh sách tất cả hoa lan.
- `GET /api/orchids?name={keyword}` : Tìm kiếm hoa lan theo tên.
- `GET /api/orchids/{id}` : Lấy chi tiết hoa lan theo ID (200 hoặc 404).
- `POST /api/orchids` : Tạo mới hoa lan (201 Created hoặc 400 Bad Request).
- `PUT /api/orchids/{id}` : Cập nhật toàn bộ thông tin hoa lan (200 OK, 400 hoặc 404).
- `DELETE /api/orchids/{id}` : Xóa hoa lan (204 No Content hoặc 404).

## 6. Kiểm thử (Test)
Chạy bộ test của dự án:
```bash
mvn clean test
```
Tham khảo thêm tài liệu chi tiết:
- [API Contract](docs/api-contract.md)
- [Test Matrix](docs/test-matrix.md)
- [Concept Trace](docs/concept-trace.md)
