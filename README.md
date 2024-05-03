# Capstone

## Introduction
This project is a web-based application designed to assist users in managing their stock portfolios effectively. It includes features such as portfolio management, stock exploration, news updates, and a rule-based chatbot powered by machine learning models.

## Installation Guide

### Hardware Requirements:
- Since this is a web-based application, no specific hardware installation is required.

### Software Requirements:
1. **Source Code**: Obtain the source code from the GitHub repository [here](https://github.com/AmeelAziz22/capstone).
2. **Node.js and npm**: Download and install Node.js and npm from [here](https://nodejs.org/).
3. **PostgreSQL**: Download and install PostgreSQL from [here](https://www.postgresql.org/download/) and start a server.
4. **Backend Setup**:
    - Update the username, password, host, and port in the `settings.py` file of the backend folder to connect to your PostgreSQL database.
    - Navigate to the backend folder and run the following commands:
        ```
        pip install -r requirements.txt
        python manage.py makemigrations
        python manage.py migrate
        python manage.py runserver
        ```
5. **Frontend Setup**:
    - Navigate to the frontend folder of the repository.
    - Run the following commands:
        ```
        npm install
        npm run start
        ```

## Operation Instructions
1. **Registration/Login**: Navigate to the localhost where the frontend is running. Click "Register" to create a new account or sign in with existing credentials.
2. **Portfolio Management**: Add your current portfolio of stocks when creating a new account. After logging in, you can view your holdings on the main page.
3. **Rule-based Chatbot**: Located at the bottom right, the chatbot allows you to make predictions using machine learning models.
4. **Stock Exploration**: The explore page enables you to search stock tickers and view charts.
5. **News Updates**: Stay informed with current news headlines on the news page, which offers a variety of sections to explore.
6. **FAQ**: The FAQ page answers questions about the models used and defines financial terms.

## Additional Notes
- For any queries or support, refer to the project's GitHub repository or contact the project owner.
