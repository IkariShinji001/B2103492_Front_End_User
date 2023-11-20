import api from "./api.service";

class OrderService {
  async isBoughtOrder(id) {
    const res = (await api.get(`/orders/is-bought/books/${id}`)).data;
    return res;
  }

  async getUserOrder(_id = {}) {
     const res = (await api.get(`/orders/user`, { params: { _id } })).data;
    console.log(res);
    return res;
  }

  async cancelOrder(id) {
    const res = (await api.patch(`/orders/cancel/${id}`)).data;
    return res;
  }

  async createOrder(payload) {
    const res = (await api.post(`/orders`, payload)).data;
    return res;
  }

  async updateOrderStatusDilivery(id) {
    const res = (await api.patch(`/orders/status-dilivery/${id}`)).data;
    return res;
  }

  
}

export default new OrderService();

