import api from "./api.service";

class UserService {
  async createUser(payload) {
    return (await api.post("/users", payload)).data;
  }

  async getUser() {
    return (await api.get("/users/infor")).data;
  }

  async updateUserInfo(payload) {
    return (await api.put(`/users/infor`, payload)).data;
  }

  async loginUser(payload) {
    return (await api.post("/users/login", payload)).data;
  }

  async addToCart(payload) {
    return (await api.post("/users/cart", payload)).data;
  }

  async removeBookFromCart(id) {
    return (await api.delete(`/users/cart/books/${id}`)).data;
  }

  async updateBookQuantityInCart(payload) {
    return (await api.patch(`/users/cart`, payload)).data;
  }

  async getAllCart() {
    return (await api.get("/users/cart")).data;
  }

  async removeBookFromCart(id) {
    return (await api.delete(`/users/cart/books/${id}`)).data;
  }
}

export default new UserService();
