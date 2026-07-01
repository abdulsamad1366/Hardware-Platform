# SecureLink B2B API Specifications - Authentication Module

This document outlines the API endpoints, validation rules, JSON response payloads, and frontend integration details for the Authentication module.

## Base URL
`/api/v1/auth`

---

## 1. API Endpoints

### 1.1 Register User
- **Route**: `POST /register`
- **Access**: Public
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@company.com",
    "phone": "+919876543210",
    "company": "Doe Architectural Systems",
    "gst": "22AAAAA1111A1Z1",
    "password": "SecurePassword123",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India"
  }
  ```
- **Responses**:
  - **`201 Created`**:
    ```json
    {
      "success": true,
      "message": "Registration successful. Welcome to SecureLink.",
      "data": {
        "user": {
          "id": "60d0fe4f53112b33a0000001",
          "name": "John Doe",
          "email": "johndoe@company.com",
          "company": "Doe Architectural Systems",
          "phone": "+919876543210",
          "gst": "22AAAAA1111A1Z1",
          "city": "Mumbai",
          "state": "Maharashtra",
          "country": "India",
          "role": "user"
        },
        "accessToken": "eyJhbGciOi..."
      }
    }
    ```
  - **`400 Bad Request`** (Unique constraint or validation fail):
    ```json
    {
      "success": false,
      "message": "A business account with this email address already exists.",
      "data": null
    }
    ```

---

### 1.2 Login User
- **Route**: `POST /login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "johndoe@company.com",
    "password": "SecurePassword123"
  }
  ```
- **Responses**:
  - **`200 OK`**: (Includes setting `accessToken` and `refreshToken` as secure, HttpOnly cookies)
    ```json
    {
      "success": true,
      "message": "Login successful.",
      "data": {
        "user": {
          "id": "60d0fe4f53112b33a0000001",
          "name": "John Doe",
          "email": "johndoe@company.com",
          "company": "Doe Architectural Systems",
          "phone": "+919876543210",
          "gst": "22AAAAA1111A1Z1",
          "city": "Mumbai",
          "state": "Maharashtra",
          "country": "India",
          "role": "user"
        },
        "accessToken": "eyJhbGciOi..."
      }
    }
    ```
  - **`401 Unauthorized`**:
    ```json
    {
      "success": false,
      "message": "Invalid email or password credentials.",
      "data": null
    }
    ```

---

### 1.3 Logout User
- **Route**: `POST /logout`
- **Access**: Private (Authenticated)
- **Responses**:
  - **`200 OK`**: (Clears `accessToken` and `refreshToken` cookies)
    ```json
    {
      "success": true,
      "message": "Session ended. Logout successful.",
      "data": null
    }
    ```

---

### 1.4 Refresh Token
- **Route**: `POST /refresh-token`
- **Access**: Public
- **Request Body**:
  - Optional body field `refreshToken` (fallback if cookies are not used).
- **Responses**:
  - **`200 OK`**: (Issues updated cookies and new accessToken)
    ```json
    {
      "success": true,
      "message": "Session token refreshed.",
      "data": {
        "accessToken": "eyJhbGciOi..."
      }
    }
    ```
  - **`401 Unauthorized`**:
    ```json
    {
      "success": false,
      "message": "Invalid or expired session. Please sign in again.",
      "data": null
    }
    ```

---

### 1.5 Forgot Password
- **Route**: `POST /forgot-password`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "johndoe@company.com"
  }
  ```
- **Responses**:
  - **`200 OK`**:
    ```json
    {
      "success": true,
      "message": "If account exists, recovery link has been generated.",
      "data": {
        "resetToken": "eyJhbGciOi..."
      }
    }
    ```

---

### 1.6 Reset Password
- **Route**: `POST /reset-password`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "token": "eyJhbGciOi...",
    "password": "NewSecurePassword123"
  }
  ```
- **Responses**:
  - **`200 OK`**:
    ```json
    {
      "success": true,
      "message": "Password updated successfully. Please login with your new credentials.",
      "data": null
    }
    ```
  - **`400 Bad Request`**:
    ```json
    {
      "success": false,
      "message": "Expired or invalid password reset token.",
      "data": null
    }
    ```

---

### 1.7 Current User Profile
- **Route**: `GET /me`
- **Access**: Private (Authenticated)
- **Responses**:
  - **`200 OK`**:
    ```json
    {
      "success": true,
      "message": "User session active.",
      "data": {
        "user": {
          "id": "60d0fe4f53112b33a0000001",
          "name": "John Doe",
          "email": "johndoe@company.com",
          "role": "user"
        }
      }
    }
    ```
  - **`401 Unauthorized`**:
    ```json
    {
      "success": false,
      "message": "Not authorized to access this route",
      "data": null
    }
    ```

---

## 2. Frontend Integration Points

### 2.1 Cookies and CORS Setup
Ensure that the frontend Axios client is configured to send cookies (`credentials: "include"` or `withCredentials: true`) to support HttpOnly session tokens:
```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // Crucial for receiving/sending secure HttpOnly cookies
});
```

### 2.2 Token Interceptor & Silent Refresh Loop
Implement an Axios response interceptor that catches `401 Unauthorized` errors, triggers a token refresh silently, and retries the original request. If the refresh fails, clear client state and redirect to `/login`:
```typescript
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Trigger silent refresh if access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const { accessToken } = res.data.data;
        
        // Update header and retry original query
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token expired - force user logout
        window.location.href = "/login?session_expired=true";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
```
