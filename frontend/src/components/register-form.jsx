import React, { useState, useEffect } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "../assets/auth.module.css";

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    stocks: [],
  });
  const [stockOptions, setStockOptions] = useState([]);
  const [currentStockSel, setCurrentStockSel] = useState(null);

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 500,
  });

  const addStockPortfolio = (e) => {
    e.preventDefault();
    const stockPrice = e.target.elements.stockPrice.value;
    const numberOfShares = e.target.elements.numberOfShares.value;
    const newStock = {
      ticker: currentStockSel,
      price: stockPrice,
      quantity: numberOfShares,
    };
    setFormData((prevState) => ({
      ...prevState,
      stocks: [...prevState.stocks, newStock],
    }));

    e.target.elements.stockPrice.value = "";
    e.target.elements.numberOfShares.value = "";
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          "https://finnhub.io/api/v1/stock/symbol?token=cncobthr01qkavtmr65gcncobthr01qkavtmr660&exchange=US"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch stock data");
        }
        const data = await response.json();
        const updatedStockOptions = data.map((stock) => ({
          value: stock.displaySymbol,
          label: `${stock.displaySymbol} - ${stock.description}`,
        }));
        setStockOptions(updatedStockOptions);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setFormData({
        ...formData,
        firstName: e.target.elements.fname.value,
        lastName: e.target.elements.lname.value,
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
      });
      setStep(2);
    } else {
      // Handle final form submission, e.g., send data to server
      console.log(formData);
    }
  };

  return (
    <div className={styles.authbox}>
      <div className={styles.content}>
        <header>
          <h1 className={styles.authtitle}>
            {step === 1 ? "Create Account" : "Current Portfolio"}
          </h1>
        </header>
        <div className={styles.loginForm}>
          {formData.stocks.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Stock Ticker</th>
                  <th>Average Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {formData.stocks.map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.ticker}</td>
                    <td>{stock.price}</td>
                    <td>{stock.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <section>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {step === 1 && (
              <>
                <div className={styles.inputGroup}>
                  <label className={styles.labelstyle} htmlFor="fname">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    id="fname"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.labelstyle} htmlFor="lname">
                    Last Name
                  </label>
                  <input type="text" placeholder="Enter Last Name" id="lname" />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.labelstyle} htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    id="username"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.labelstyle} htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    id="password"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <button className={styles.buttonstyle} type="submit">
                    Next
                  </button>
                </div>
              </>
            )}
          </form>
        </section>
        <section>
          <div className={styles.loginForm}>
            {step === 2 && (
              <>
                <form className={styles.loginForm} onSubmit={addStockPortfolio}>
                  <div className={styles.searchStockDiv}>
                    <label className={styles.labelstyle}>Search Stock</label>
                    <Autocomplete
                      className="text-white autocomplete"
                      onChange={(event, value) =>
                        setCurrentStockSel(value ? value.value : null)
                      }
                      disablePortal
                      options={stockOptions}
                      filterOptions={filterOptions}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ input: { color: "white" } }}
                        />
                      )}
                    />
                  </div>
                  <div className={styles.stockPriceWrap}>
                    <div className={styles.inputGroupStock}>
                      <label className={styles.labelstyle} htmlFor="stockPrice">
                        Price
                      </label>
                      <input
                        pattern="\d+(\.\d+)?"
                        required
                        placeholder="Enter stock price"
                        id="stockPrice"
                      />
                    </div>
                    <div className={styles.inputGroupStock}>
                      <label
                        className={styles.labelstyle}
                        htmlFor="numberOfShares"
                      >
                        Number of Shares
                      </label>
                      <input
                        required
                        type="number"
                        min="1"
                        placeholder="Enter # shares"
                        id="numberOfShares"
                      />
                    </div>
                    <div className={styles.buttonDiv}>
                      <button className={styles.plusButton}>+</button>
                    </div>
                  </div>
                </form>
                <div className={styles.inputGroup}>
                  <button
                    onClick={handleSubmit}
                    className={styles.buttonstyle}
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
        <footer>
          <span>
            {step === 1 ? "Already have an account? " : "Back to "}
            <a
              href={step === 1 ? "/login" : "/register"}
              title={step === 1 ? "Forgot Password" : "Create Account"}
            >
              {step === 1 ? "Login." : "Create Account."}
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default RegisterForm;
