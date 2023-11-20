import api from "./api.service";

class SeriesService {
  async getSeriesById(id){
    return (await api.get(`/series/${id}`)).data;
  }
}

export default new SeriesService();
