import axios from 'axios';

const commonConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
};

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  ...commonConfig,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gửi yêu cầu để làm mới access token bằng refresh token
        await api.post("/auth/verify/refresh-token", {}, { withCredentials: true });
        // Gửi lại yêu cầu ban đầu với access token mới
        return api(originalRequest);
      } catch (refreshError) {
        router.push("/login");
        console.error(refreshError);
        // Đăng xuất người dùng hoặc chuyển hướng đến trang đăng nhập
      }
    }
    return Promise.reject(error);
  }
);

export default api;