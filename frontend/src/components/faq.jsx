import React from "react";
import Faq from "react-faq-component";

const data = {
    title: "FAQ",
    rows: [
        {
            title: "How many types of models do we use?",
            content: `Our stock AI web application utilizes two main types of models to enhance predictive capabilities. The first, a Simple Highly Accurate Model, is built with TensorFlow and Keras Python libraries. It predicts whether a stock's value will increase or decrease over a given period with impressive accuracy. Our second model, the Medium Accurate Model, also utilizes TensorFlow and Keras. It forecasts the percentage change in stock values, providing valuable insights into potential fluctuations. We often integrate these models into a cohesive ML pipeline after rigorous backtesting. This integration aims to improve predictive accuracy and provide more reliable forecasts for our users.`,
        },
        {
            title: "What do we predict?",
            content:
                "We predict whether a stock will rise or fall, as well as the percentage change. Additionally, we can estimate when the stock will reach its highest and lowest points within a given timeframe.",
        },
        {
            title: "What features or data do we use for our models?",
            content: <ul>
            <li><strong>1. Stock History:</strong> Our models analyze stock data dating back to 2010, including low, high, open, close, and volume.</li>
            <li><strong>2. Sector Index Funds:</strong> We incorporate sector index funds to identify the most popular stocks within a sector, which are then used to train the model.</li>
            <li><strong>3. Economic Indicators:</strong> To capture broader economic trends, we utilize index funds tracking inflation and GDP to train the model.</li>
            <li><strong>4. Monthly Investor Ratings:</strong> We consider monthly investor ratings of stocks as an additional input for our models.</li>
            <li><strong>5. Movement Indicators:</strong> Short-term signals are generated using movement indicators such as RSI (Relative Strength Index) and MACD (Moving Average Convergence Divergence).</li>
            <li><strong>6. Yahoo Weekly Stock Rankings:</strong> We incorporate Yahoo's weekly stock rankings to assess a stock's standing relative to others in the market.</li>
            <li><strong>7. Yahoo Weekly Stock Rankings (Sector Filtered):</strong> Similarly, we leverage sector-filtered Yahoo weekly stock rankings to evaluate a stock's performance within its sector.</li>
          </ul>,
        },
        {
            title: "Why Long Short-term memory model?",
            content: 'We utilize Long Short-Term Memory (LSTM) models for stock prediction due to their proficiency in capturing sequential data patterns over time. Stocks exhibit dynamic behaviors influenced by various factors, and LSTM models excel at retaining information over longer periods, allowing them to discern subtle trends in historical data that may affect future price movements. Their ability to handle time series data, accommodate nonlinear relationships, and offer architectural flexibility makes them well-suited for modeling the complexities of financial markets, ultimately aiding in accurate and informed stock predictions.',
        },
        {
            title: "Why did we max out at 1 year for predictions?",
            content: 'We chose to limit our predictions to one year because stocks become increasingly unpredictable beyond this timeframe. While it\'s relatively easy to predict whether a stock will increase or decrease over a year, forecasting the exact amount becomes very difficult due to the heightened uncertainty caused by various factors such as market volatility and economic changes. By focusing on a one-year horizon, we aim to provide more reliable and actionable insights for our users, helping them make informed decisions in their stock trading and investment activities.',
        },
        {
            title: "What happens if we dont have model in db?",
            content: 'If a requested model is not found in our database, we immediately initiate the training process to create it. This ensures that users can access the required model later on. Our system proactively prepares for future requests, ensuring timely availability of predictive capabilities to support users in their stock trading and investment decisions.',
        },
        {
            title: "How long does it take to train a model?",
            content: 'Training a single model for a specific timeframe typically takes around 7-8 minutes at most.',
        },
        {
            title: "When do we train our models?",
            content: 'We train our models daily, typically after the market closes. During this time, we gradually retrain all of the top 100 stocks. This ensures that our users have access to updated and accurate predictions when the market opens the next day.',
        },
        {
            title: "What do the accuracies mean in predictions? How do we get them?",
            content: 'The accuracies in predictions represent how well our models\' forecasts match actual outcomes, determined through backtesting. Backtesting involves applying models to historical data, comparing their predictions to known outcomes, and refining algorithms based on the analysis. This process helps enhance the accuracy and reliability of our predictions.',
        },
        {
            title: "What is RSI?",
            content: 'The Relative Strength Index (RSI) is a widely used technical indicator in financial analysis, assessing the momentum of a stock\'s price movements on a scale from 0 to 100. Readings above 70 indicate that a stock may be overbought, signaling a potential opportunity to sell, while readings below 30 suggest that a stock may be oversold, indicating a potential opportunity to buy. Traders often use RSI levels to gauge the strength and direction of price movements, helping inform their buying and selling decisions.',
        },
        {
            title: "What is MACD?",
            content: 'The Moving Average Convergence Divergence (MACD) is a key technical indicator used in financial analysis to assess changes in a stock\'s price trend. It consists of two lines, the MACD line and the signal line, which track short-term and long-term moving averages. Traders typically interpret the MACD line crossing above the signal line as a bullish signal to buy, while a crossing below suggests a bearish signal to sell. In essence, the MACD helps traders identify potential shifts in momentum and trend direction, guiding their buying and selling decisions in the stock market.',
        },
        {
            title: "What do bearish/bullish signals mean?",
            content: 'Bearish signals in financial markets indicate an expectation of declining asset prices, prompting traders to sell or short-sell assets in anticipation of downward movement. Conversely, bullish signals suggest an expectation of rising prices, leading traders to buy or hold assets in anticipation of upward movement.',
        },
        {
            title: "What is a sector",
            content: 'In finance, a sector refers to a group of companies operating in the same industry or sharing similar characteristics. It allows investors to analyze industry-specific trends and make informed investment decisions based on their understanding of each sector\'s dynamics.',
        },
        {
            title: "What is volatility and how does this affect risk and investment plans?",
            content: 'Volatility, the fluctuation in asset prices, impacts risk and investment decisions significantly. High volatility (above 0.2) signals increased risk, appealing to some investors but requiring careful risk management. Medium volatility (0.1 to below 0.2) offers a more balanced investment landscape. Understanding volatility helps investors adjust their portfolios to align with their risk tolerance and investment goals, maximizing potential returns while managing risk effectively.',
        },
        {
            title: "How serious should you take our predictions?",
            content: 'The seriousness with which you take our predictions should depend on various factors, including your risk tolerance, investment goals, and the context in which the predictions are made. While our models strive to provide accurate insights based on historical data and statistical analysis, it\'s essential to recognize that no prediction system is foolproof, and there are inherent uncertainties in financial markets. Therefore, it\'s advisable to use our predictions as one of several factors in your decision-making process rather than relying solely on them. Additionally, consider diversifying your investment portfolio, staying informed about market trends, and consulting with financial advisors to make well-informed decisions aligned with your individual circumstances and objectives. Ultimately, the seriousness with which you take our predictions should be balanced with prudent risk management and a comprehensive understanding of the limitations and uncertainties involved in financial forecasting.',
        },
    ],
};

const styles = {
    bgColor: "none",
    titleTextColor: "white",
    rowTitleColor: "white",
    rowContentColor: '#86c5da',
     arrowColor: "grey",
    rowContentPaddingLeft: '50px',

};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

export default function FAQ() {

    return (
        <div>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    );
}