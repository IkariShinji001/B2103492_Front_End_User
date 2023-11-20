import api from "./api.service";

class BookService {
  async getBooks(
    limit,
    page,
    sortName,
    sortDate,
    search = null,
    genres = null,
    lowestPrice = null,
    highestPrice = null
  ) {
    const books = await api.get("/books", {
      params: {
        search,
        limit,
        page,
        sortName,
        sortDate,
        genres,
        lowestPrice,
        highestPrice,
      },
    });
    return books.data;
  }

  async getBookById(id) {
    const book = (await api.get(`/books/${id}`)).data;
    return book;
  }

  async getBookCount() {
    const count = (await api.get("/books/count")).data;
    return count;
  }

  async getRating(id) {
    const rating = (await api.get(`/books/${id}/rating`)).data;
    return rating;
  }

  async ratingBook(id) {
    const rating = (await api.get(`/books/${id}/rating`)).data;
    return rating;
  }

  async newRating(star, comment, bookId) {
    const book = (await api.post(`/books/${bookId}/rating/`, { star, comment }))
      .data;
    return book;
  }
}

export default new BookService();
