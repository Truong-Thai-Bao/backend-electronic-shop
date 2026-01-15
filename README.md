# 🔌 Electric Shop API (Backend)

> **Description:** The RESTful API server for the Electric Shop E-commerce platform.
> **Tech Stack:** Node.js, Express.js, MongoDB.
> **Deployment:** Render.

## 🌐 Live Demo
The server is deployed and running at:
**Base URL:** [https://backend-electronic-shop.onrender.com](https://backend-electronic-shop.onrender.com)

*(Note: This is a JSON API. It is recommended to test endpoints using Postman or by connecting via the Frontend)*

---

## 🛠 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose (MongoDB Atlas)
* **Authentication:** JWT (JSON Web Token)
* **Payment Gateway:** VNPay (Sandbox)
* **Image Storage:** Cloudinary (Product images & User avatars)

---

## 🚀 Key Features

* **Authentication (Auth):** Registration, Login, Refresh Token mechanism, Authorization Middleware (Admin/User).
* **Product Management:** Full CRUD operations, Advanced Filtering (Price range, Star rating, Search), Pagination, and Sorting.
* **Order Management:** Create new orders, Update shipping status, Cancel orders, View purchase history.
* **Payment Integration:** Integrated API for VNPay payment URL generation and PayPal Client ID configuration.
* **Dashboard Statistics:** APIs providing data for the Admin Dashboard (Revenue, User count, Order count).

---

## ⚙️ Local Installation & Setup

### 1. Prerequisites
* Node.js (v14 or higher).
* MongoDB (Connection String).
* Git.

### 2. Installation

#### 1. Clone the repository (if not already cloned)
```bash
git clone https://github.com/Truong-Thai-Bao/backend-electronic-shop.git
cd backend
```
#### 2. Install dependencies
```
npm install
```
#### 3. Create file .env
```
PORT=3001
MONGO_DB=mongodb+srv://thaibao:wC9925TGDouXdWgC@cluster0.zjtg7fy.mongodb.net/test?retryWrites=true&w=majority
ACCESS_TOKEN=access_token
REFRESH_TOKEN=refresh_token
SECURE_SECRET_VNPAY=ISESX55WGLQ6SLOBDBY7CULWK8WQLW6S
TMN_CODE=EG3CSSD9
APP_API_URL=http://localhost:3000
```
#### 4. Run server
```
npm start
```
- Server will be run at (http://localhost:3001)

## 📚 API Documentation

### 1. User Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/user/sign-up` | Register a new user account |
| **POST** | `/api/user/sign-in` | Login (Returns Access Token & Refresh Token) |
| **POST** | `/api/user/log-out` | Logout (Clears cookies) |
| **POST** | `/api/user/refresh-token` | Refresh an expired Access Token |
| **GET** | `/api/user/get-details/:id` | Get user profile details (Requires Auth Token) |
| **PUT** | `/api/user/update-user/:id` | Update user information |
| **DELETE** | `/api/user/delete-user/:id` | Delete a user (Admin only) |

### 2. Product Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/product/get-all` | Get product list. Supports query params: `limit`, `page`, `sort`, `filter`, `minPrice`, `maxPrice`, `rating` |
| **GET** | `/api/product/get-details/:id` | Get details of a single product |
| **GET** | `/api/product/get-all-type` | Get all unique product types/categories |
| **POST** | `/api/product/create` | Create a new product (Admin only) |
| **PUT** | `/api/product/update/:id` | Update an existing product (Admin only) |
| **DELETE** | `/api/product/delete/:id` | Delete a product (Admin only) |
| **POST** | `/api/product/delete-many` | Delete multiple products at once (Admin only) |

### 3. Order Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/order/create` | Create a new order |
| **GET** | `/api/order/get-all-order/:id` | Get purchase history for a specific User |
| **GET** | `/api/order/get-details-order/:id` | Get details of a specific order |
| **DELETE** | `/api/order/cancel-order/:id` | Cancel a pending order |
| **GET** | `/api/order/get-all-order` | Get all orders in the system (Admin Dashboard) |

### 4. Payment
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `api/create_payment_url` | 
---
## Test account
#### Admin account
- Email: admin@gmail.com
- Password : 123456
#### User Account
- Email: test@gmail.com
- Password: 1

#### Payment via VNPay (Sandbox/Test)
- Bank: NCB
- Card Number: 9704198526191432198
- Cardholder Name: NGUYEN VAN A
- Issue Date: 07/15
- OTP Code: 123456

---
## 📂 Folder Structure

The project follows a standard Model-Controller-Service architecture:
```text
Electric-Shop/
├── backend/        
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   └── .env
```
