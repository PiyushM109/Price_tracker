# Price Tracker

This is a full-stack web application that allows users to track the prices of products from e-commerce websites. It scrapes product information, stores it, and notifies users of price drops.

## Features

- **User Authentication:** Secure sign-up and login using Google OAuth.
- **Product Scraping:** Scrapes product information from e-commerce websites.
- **Price Tracking:** Track products and receive email notifications on price drops.
- **Price History:** View a history of price changes for tracked products.
- **Responsive Design:** A user-friendly interface that works on both mobile and desktop.

## Tech Stack

### Frontend

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **UI Components:** Radix UI

### Backend

- **Framework:** Node.js, Express
- **Database:** MongoDB (with Mongoose)
- **Authentication:** Passport.js, Google OAuth, JWT
- **Email:** Nodemailer

### Scraper

- **Language:** TypeScript
- **Scraping:** Cheerio, Axios

### Scheduler

- **Runtime:** Node.js
- **Scheduling:** node-cron

## Project Structure

The project is organized into four main directories:

- `frontend/`: Contains the React frontend application.
- `backend/`: Contains the Node.js backend application.
- `scraper/`: Contains a standalone web scraper service.
- `Scheduler/`: Contains a service for scheduling tasks like price updates.

```
/
├── frontend/
├── backend/
├── scraper/
└── Scheduler/
```

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js (v24.0.0 or later)
- npm (v10.0.0 or later)
- MongoDB

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your_username_/Price_tracker.git
    ```

2.  **Backend Setup:**
    ```sh
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    PORT=3000
    MONGO_URI=your_mongodb_uri
    SESSION_SECRET=your_session_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    JWT_SECRET=your_jwt_secret
    ```

3.  **Frontend Setup:**
    ```sh
    cd ../frontend
    npm install
    ```

4.  **Scraper Setup:**
    ```sh
    cd ../scraper
    npm install
    ```

5.  **Scheduler Setup:**
    ```sh
    cd ../Scheduler
    npm install
    ```

### Usage

1.  **Start the backend server:**
    ```sh
    cd backend
    npm start
    ```

2.  **Start the frontend development server:**
    ```sh
    cd ../frontend
    npm run dev
    ```

3.  **Start the scraper service:**
    ```sh
    cd ../scraper
    npm start
    ```

4.  **Start the scheduler service:**
    ```sh
    cd ../Scheduler
    npm start
    ```

## API Endpoints

The backend exposes the following RESTful APIs:

- `POST /auth/google`: Initiate Google OAuth authentication.
- `GET /auth/google/callback`: Google OAuth callback.
- `POST /auth/logout`: Logout a user.
- `GET /auth/user`: Get the authenticated user's information.
- `GET /data/scrape`: Scrape product data from a given URL.
- `GET /data/allProduct`: Get all tracked products.
- `GET /data/product/:id`: Get a specific product by its ID.
- `GET /data/user/products`: Get all products tracked by the authenticated user.
- `POST /data/product/addEmail`: Add an email to a product for notifications.