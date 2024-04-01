class API {
  static async fetchData(url, method, body) {
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

  static async register(first_name, last_name, username, password) {
    const url = `http://127.0.0.1:8000/register/`;
    return this.fetchData(url, "POST", {
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password,
    });
  }

  static async token(username, password) {
    const url = `http://127.0.0.1:8000/token/`;
    return this.fetchData(url, "POST", {
      username: username,
      password: password,
    });
  }

  static async fetchStocks(userID) {
    // temp api endpoint for now, till backend is ready
    // const url = `https://api-generator.retool.com/lLrYii/stocks`;
    const url = `http://127.0.0.1:8000/user/${userID}/stocks/`;
    return this.fetchData(url, "GET");
  }

  static async updateStock(userID, symbol, shares, average_price) {
    const url = `http://127.0.0.1:8000/user/${userID}/stock/update/`;
    return this.fetchData(url, "POST", {
      symbol: symbol,
      shares: shares,
      average_price: average_price,
    });
  }

  static async sellStock(userID, symbol) {
    const url = `http://127.0.0.1:8000/user/${userID}/stock/sell/`;
    return this.fetchData(url, "POST", {
      symbol: symbol,
    });
  }

  static async portfolioHistory(userID) {
    const url = `http://127.0.0.1:8000/user/${userID}/portfolio/`;
    return this.fetchData(url, "GET");
  }

  static async portfolioToday(userID) {
    const url = `http://127.0.0.1:8000/user/${userID}/portfolio_today/`;
    return this.fetchData(url, "GET");
  }

  static async generatePortfolio(userID, body) {
    const url = `http://127.0.0.1:8000/user/${userID}/generate_portfolio/`;
    return this.fetchData(url, "POST", body);
  }

  static async getStockPredictions(days, symbol) {
    const url = `http://127.0.0.1:8000/api/model/${symbol}/prediction/${days}/`;
    return this.fetchData(url, "GET");
  }

  static async getStockIndicator(days, symbol) {
    const url = `http://127.0.0.1:8000/api/model/${symbol}/indicator/${days}/`;
    return this.fetchData(url, "GET");
  }

  static async getAllStocks() {
    try {
      const response = await fetch(
        "https://finnhub.io/api/v1/stock/symbol?token=cncobthr01qkavtmr65gcncobthr01qkavtmr660&exchange=US"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      let stocks = await response.json();
      return stocks;
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }

}

export default API;
