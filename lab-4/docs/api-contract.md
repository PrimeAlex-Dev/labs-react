# Orchid REST API Contract

Base URL: `http://localhost:8080`

## Endpoints

| API Name | Method | Path | Request Body | Response Status | Description |
|---|---|---|---|---|---|
| Get Orchids | GET | `/api/orchids` | None | 200 OK | Lấy danh sách tất cả các hoa lan |
| Search Orchids | GET | `/api/orchids?name={name}` | None | 200 OK | Tìm kiếm hoa lan theo tên (chứa từ khóa, không phân biệt hoa thường) |
| Get Orchid By ID | GET | `/api/orchids/{id}` | None | 200 OK / 404 Not Found | Lấy chi tiết hoa lan theo ID |
| Create Orchid | POST | `/api/orchids` | JSON Orchid | 201 Created / 400 Bad Request | Tạo mới một hoa lan kèm categoryId |
| Update Orchid | PUT | `/api/orchids/{id}` | JSON Orchid | 200 OK / 400 Bad Request / 404 Not Found | Cập nhật toàn bộ thông tin hoa lan |
| Delete Orchid | DELETE | `/api/orchids/{id}` | None | 204 No Content / 404 Not Found | Xóa hoa lan theo ID |

### Request Body Mẫu cho POST
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

### Request Body Mẫu cho PUT
```json
{
  "orchidName": "Cattleya Queen Updated",
  "isNatural": false,
  "orchidDescription": "Updated by PUT",
  "orchidCategory": { "categoryId": 2 },
  "isAttractive": true,
  "orchidURL": "https://example.com/orchid-updated.jpg"
}
```
