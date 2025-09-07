# Price Tracker

This is a full-stack web application that allows users to track the prices of products from e-commerce websites. It consists of a React frontend and a Node.js backend.

## Features

- User authentication with Google OAuth
- Scrape product information from e-commerce websites
- Track products and receive email notifications on price drops
- View product price history

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** Passport.js, Google OAuth
- **Scraping:** Cheerio, Axios

## Project Structure

- `frontend/`: Contains the React frontend application.
- `backend/`: Contains the Node.js backend application.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v24.0.0 or later)
- npm (v10.0.0 or later)
- MongoDB

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Price_tracker.git
   ```
2. Install NPM packages for the backend
   ```sh
   cd backend
   npm install
   ```
3. Install NPM packages for the frontend
   ```sh
   cd ../frontend
   npm install
   ```
4. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    PORT=3000
    MONGO_URI=your_mongodb_uri
    SESSION_SECRET=your_session_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    JWT_SECRET=your_jwt_secret
    ```

### Usage

1. Start the backend server
    ```sh
    cd backend
    npm start
    ```
2. Start the frontend development server
    ```sh
    cd ../frontend
    npm run dev
    ```
