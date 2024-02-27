class API {
  static async fetchData(url, method, body = {}) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  static async register() {
    const url = `http://127.0.0.1/api/register`;
    return this.fetchData(url, "POST", {
      username: "user1",
      password: "password",
    });
  }

  static async token() {
    const url = `http://127.0.0.1/api/token`;
    return this.fetchData(url, "POST", {
      username: "user1",
      password: "password",
    });
  }

  static async fetchStocks(userID) {
    // temp api endpoint for now, till backend is ready
    const url = `https://api-generator.retool.com/lLrYii/stocks`;
    // const url = `http://127.0.0.1/api/${userID}/stocks`;
    return this.fetchData(url, "GET");
  }

  static async purchaseStock(userID) {
    const url = `http://127.0.0.1/api/user/${userID}/stock/purchase`;
    return this.fetchData(url, "POST", {
      stock_symbol: "AAPL",
      shares: 1,
      purchase_price: 150.25,
      purchase_date: "2021-09-01"
    });
  }

  static async sellStock(userID) {
    const url = `http://127.0.0.1/api/user/${userID}/stock/sell`;
    return this.fetchData(url, "POST", {
      stock_symbol: "AAPL",
      shares: 1,
      sell_price: 150.25,
      sell_date: "2021-09-01"
    });
  }

  static async portfolioHistory(userID) {
    const url = `http://127.0.0.1/api/user/${userID}/portfolio?days=X`;
    return this.fetchData(url, "GET", {
      days: 30
    });
  }

  static async portfolioToday(userID) {
    const url = `http://127.0.0.1/api/user/${userID}/portfolio_today`;
    return this.fetchData(url, "GET");
  }
}

export default API;
