class API {
  static async fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  static async register() {
    const url = `http://127.0.0.1/api/register`;
    return this.fetchData(url);
  }

  static async token() {
    const url = `http://127.0.0.1/api/token`;
    return this.fetchData(url);
  }

  static async fetchStocks(userID) {
    // temp api endpoint for now, till backend is ready
    const url = `https://api-generator.retool.com/lLrYii/stocks`;
    // const url = `http://127.0.0.1/api/${userID}/stocks`;
    return this.fetchData(url);
  }

  static async purchaseStock(userID) {
    const url = `http://127.0.0.1/api/user/${userID}/stock/purchase`;
    return this.fetchData(url);
  }

  static async sellStock(userID) {
    const url = `http://127.0.0.1/api/user/${userID}/stock/sell`;
    return this.fetchData(url);
  }

  static async portfolioHistory(userID) {
    const url = `http://127.0.0.1/api/user/${userID}/portfolio?days=X`;
    return this.fetchData(url);
  }

  static async portfolioToday(userID) {
    const url = `http://127.0.0.1/api/user/${userID}/portfolio_today`;
    return this.fetchData(url);
  }
}

export default API;
