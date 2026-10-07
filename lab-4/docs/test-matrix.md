# Test Matrix - Orchid REST API & JPA Integration Kit

| Test ID | Method & URL | Precondition | Request Body / Param | Expected Status & Body | Actual Result | Pass/Fail |
|---|---|---|---|---|---|---|
| T01 | GET `/api/orchids` | DB có dữ liệu | None | 200 OK + JSON array | 200 OK + JSON array | PASS |
| T02 | GET `/api/orchids?name=cat` | Có bản ghi chứa 'cat' | Query param `name=cat` | 200 OK + filtered array | 200 OK + filtered array | PASS |
| T03 | GET `/api/orchids/1` | Orchid id=1 tồn tại | None | 200 OK + JSON orchid object | 200 OK + JSON orchid object | PASS |
| T04 | GET `/api/orchids/999999` | Orchid id=999999 không tồn tại | None | 404 Not Found | 404 Not Found | PASS |
| T05 | POST `/api/orchids` | Category id=1 tồn tại | Orchid JSON với `categoryId: 1` | 201 Created + orchidID sinh tự động | 201 Created + orchidID sinh tự động | PASS |
| T06 | POST `/api/orchids` | Category id=999 không tồn tại | Orchid JSON với `categoryId: 999` | 400 Bad Request ("Category not found: 999") | 400 Bad Request | PASS |
| T07 | PUT `/api/orchids/1` | Orchid id=1 và Category id=2 tồn tại | Orchid JSON mới với `categoryId: 2` | 200 OK + updated object state | 200 OK + updated object state | PASS |
| T08 | PUT `/api/orchids/999999` | Orchid id=999999 không tồn tại | Orchid JSON hợp lệ | 404 Not Found | 404 Not Found | PASS |
| T09 | DELETE `/api/orchids/1` | Orchid id=1 tồn tại | None | 204 No Content; GET lại id=1 -> 404 | 204 No Content; GET lại -> 404 | PASS |
| T10 | DELETE `/api/orchids/999999` | Orchid id=999999 không tồn tại | None | 404 Not Found | 404 Not Found | PASS |
| T11 | DB verify FK | Sau khi POST orchid thành công | Query SQL Server bảng `orchids` | Cột `category_id` trỏ đúng sang `orchid_categories` | category_id FK khớp | PASS |
| T12 | App Restart verify | Orchid đã tạo trong DB | Restart Spring Boot application rồi GET `/api/orchids` | Dữ liệu vẫn còn trong SQL Server | Dữ liệu lưu bền vững | PASS |
