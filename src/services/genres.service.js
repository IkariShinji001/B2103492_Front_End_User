import api from "./api.service";

class GenresService {
  async getAllGenres() {
    const genres = (await api.get("/genres")).data;
    return genres;
  }
}

export default new GenresService();
