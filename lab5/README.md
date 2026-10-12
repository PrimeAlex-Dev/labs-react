# SBA301 – LAB 05: CREATE SINGLE PAGE APPLICATION WITH SPRING BOOT RESTFUL API

**Course baseline**: JDK 21 • Spring Boot 3.x • Maven • ReactJS • Vite • Axios • MS SQL Server  
**Case study**: Orchid Management

---

## 1. Cấu Trúc Thư Mục (Project Structure)

```
d:/SBA301/lab5/
├── backend/
│   └── chapter15api/                      # Spring Boot REST API
│       ├── pom.xml
│       └── src/
│           ├── main/
│           │   ├── java/fu/se/chapter15api/
│           │   │   ├── Chapter15apiApplication.java
│           │   │   ├── configs/
│           │   │   │   └── CorsConfig.java
│           │   │   ├── controllers/
│           │   │   │   └── OrchidController.java
│           │   │   ├── pojos/
│           │   │   │   └── Orchid.java
│           │   │   ├── repositories/
│           │   │   │   └── IOrchidRepository.java
│           │   │   └── services/
│           │   │       ├── IOrchidService.java
│           │   │       └── OrchidService.java
│           │   └── resources/
│           │       └── application.properties
│           └── test/
│               └── java/fu/se/chapter15api/
│                   └── Chapter15apiApplicationTests.java
└── fontend/
    └── chapter15reactjs/                  # React + Vite Frontend
        ├── .env
        ├── package.json
        ├── vite.config.js
        ├── index.html
        └── src/
            ├── main.jsx
            ├── App.jsx
            ├── services/
            │   └── orchidApi.js
            └── components/
                ├── NavBar.jsx
                ├── ListOfOrchids.jsx
                └── EditOrchid.jsx
```

---

## 2. Hướng Dẫn Cài Đặt Và Chạy Hệ Thống (Quick Run Card)

### Bước 1: Khởi động SQL Server và Database
1. Đảm bảo service `MSSQLSERVER` đang chạy.
2. Database sử dụng: `SBA301_OrchidDB`
3. Cấu hình kết nối trong [application.properties](file:///d:/SBA301/lab5/backend/chapter15api/src/main/resources/application.properties):
   ```properties
   spring.application.name=chapter15api
   server.port=8080
   spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=SBA301_OrchidDB;encrypt=true;trustServerCertificate=true
   spring.datasource.username=sa
   spring.datasource.password=123456
   spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.format_sql=true
   ```

### Bước 2: Chạy Backend (Spring Boot)
Mở terminal tại thư mục backend:
```bash
cd d:\SBA301\lab5\backend\chapter15api
mvn spring-boot:run
```
- Kiểm tra API tại: `http://localhost:8080/orchids/`
- Trạng thái mong đợi: HTTP 200 OK trả về danh sách Orchid dạng JSON.

### Bước 3: Chạy Frontend (React + Vite)
Mở terminal thứ hai tại thư mục frontend:
```bash
cd d:\SBA301\lab5\fontend\chapter15reactjs
npm install
npm run dev
```
- Truy cập ứng dụng tại: `http://localhost:5173`

---

## 3. Test Matrix & Kết Quả Kiểm Thử (Verification Evidence)

| Test ID | Method | Endpoint / URL | Request Payload | Kết quả mong đợi | Kết quả thực tế |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **T01** | `GET` | `http://localhost:8080/orchids/` | None | `200 OK`, JSON array | `200 OK` + danh sách hoa lan |
| **T02** | `POST` | `http://localhost:8080/orchids/` | `{ "orchidName": "Taichung Beauty", "natural": true, ... }` | `201 Created`, có `orchidId` | `201 Created`, `orchidId` tự sinh |
| **T03** | `GET` | `http://localhost:8080/orchids/{id}` | None | `200 OK` (nếu có) / `404 Not Found` | `200 OK` trả đúng item |
| **T04** | `PUT` | `http://localhost:8080/orchids/{id}` | Update Name, Category | `200 OK`, DB cập nhật | `200 OK`, dữ liệu trong DB đổi |
| **T05** | `DELETE`| `http://localhost:8080/orchids/{id}` | None | `204 No Content`, GET lại 404 | `204 No Content`, DB xóa record |

---

## 4. Tracing End-To-End Request Flow

Ví dụ luồng một thao tác tải danh sách (GET):
```
React: ListOfOrchids (useEffect -> loadData)
  -> orchidApi.js: getOrchids()
  -> Axios GET http://localhost:8080/orchids/
  -> Browser CORS preflight check (CorsConfig: origin 5173 allowed)
  -> Spring Boot: OrchidController.fetchAll()
  -> OrchidService.getAllOrchids()
  -> IOrchidRepository.findAll()
  -> Hibernate/JDBC: SELECT ... FROM orchid
  -> SQL Server: Table Orchid
  <- Hibernate/JDBC: List of records
  <- OrchidService -> OrchidController
  <- HTTP 200 OK JSON response
  <- Axios response.data
  -> ListOfOrchids: setOrchids(data)
  -> React UI re-render danh sách bảng
```
