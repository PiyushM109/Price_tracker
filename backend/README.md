# Backend

This is the backend for the Price Tracker application. It is a Node.js application built with Express.

## Features

- User authentication with Google OAuth
- RESTful APIs for managing tracked products
- Scrapes product information from e-commerce websites
- Cron job to periodically update product prices
- Email notifications for price drops

## Tech Stack

- **Framework:** Express
- **Database:** MongoDB (with Mongoose)
- **Authentication:** Passport.js, Google OAuth, JWT
- **Scraping:** Cheerio, Axios
- **Email:** Nodemailer
- **Scheduling:** node-cron

## API Endpoints

- `POST /auth/google`: Initiate Google OAuth authentication
- `GET /auth/google/callback`: Google OAuth callback
- `POST /auth/logout`: Logout a user
- `GET /auth/user`: Get the authenticated user's information
- `GET /data/scrape`: Scrape product data from a given URL
- `GET /data/allProduct`: Get all tracked products
- `GET /data/product/:id`: Get a specific product by its ID
- `GET /data/user/products`: Get all products tracked by the authenticated user
- `POST /data/product/addEmail`: Add an email to a product for notifications

## Getting Started

### Prerequisites

- Node.js (v24.0.0 or later)
- npm (v10.0.0 or later)
- MongoDB

### Installation

1. Install NPM packages
   ```sh
   npm install
   ```
2. Create a `.env` file and add the required environment variables (see the main `README.md`).

### Usage

1. Start the server
   ```sh
   npm start
   ```
2. Start the development server with nodemon
    ```sh
    npm run dev
    ```
