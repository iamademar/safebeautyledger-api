# SafeBeautyLedger API

## Tech Stack

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **TypeScript**: Superset of JavaScript that adds static types.
- **Sequelize**: ORM for SQL databases.
- **PostgreSQL**: Relational database.
- **Ethers.js**: Library for interacting with the Ethereum blockchain.
- **dotenv**: Module to load environment variables from a `.env` file.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens (JWT).

## Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/safebeautyledger-api.git
    cd safebeautyledger-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```env
    PORT=3001
    ALCHEMY_API_URL=your_alchemy_api_url
    CONTRACT_ADDRESS=your_contract_address
    CONTRACT_ABI=your_contract_abi
    PRIVATE_KEY=your_private_key
    DB_NAME=safebeautyledger
    DB_HOST=127.0.0.1
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    JWT_SECRET=your_jwt_secret
    ```

4. Run database migrations and seeders:
    ```sh
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```

5. Start the development server:
    ```sh
    npm run dev
    ```
## Environment variables

The .env file is used to store environment variables that your application needs to function correctly. These variables are typically configuration settings that you don't want to hard-code into your application, such as API keys, database credentials, and other sensitive information.

In the project, the .env file should be created in the root directory of your project and should contain the following variables:
```
DB_NAME= CHANGE_TO_YOUR_DB_NAME
DB_HOST= CHANGE_TO_YOUR_DB_HOST
DB_PORT= CHANGE_TO_YOUR_DB_PORT
ALCHEMY_API_URL = ALCHEMY_API_URL_YOU_NEED_FROM_YOU_ALCHEMY_DASHBOARD
CONTRACT_ADDRESS = CONTRACT_ADRESS_FROM_GENERATED_FROM_HARDHAT
PRIVATE_KEY = PRIVATE_KEY_FROM_METAMASK_WALLTE
CONTRACT_ABI= CONTRACT_ABI_FROM_GENERATED_FROM_HARDHAT
```

## API Endpoints

### Login
- Endpoint: POST /login
- Description: Authenticates a user and returns a JWT token.
- Example cURL
```
curl -X POST http://localhost:3001/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "New Item", "description": "This is a new item"}'
```

### Add Beauty Product
- Endpoint: POST /beauty-products
- Description: Adds a new beauty product.
- Example cURL
```
curl -X POST http://localhost:3001/api/beauty-products \
  -H "Content-Type: application/json" \
  -d '{"product_id": "123", "jsonData": "{\"name\": \"Lipstick\"}"}'
```

### Update Product
- Endpoint: PUT /beauty-products/:product_id
- Description: Updates an existing beauty product.
- Example cURL
```
curl -X PUT http://localhost:3001/api/beauty-products/123 \
  -H "Content-Type: application/json" \
  -d '{"jsonData": "{\"name\": \"Updated Lipstick\"}"}'
```

### Get Beauty Product
- Endpoint: GET /beauty-products/:product_id
- Description: Retrieves a specific beauty product by its ID.
- Example cURL
```
curl -X GET http://localhost:3001/api/beauty-products/123
```

### Get Product History
- Endpoint: GET /beauty-products/:product_id/history
- Description: Retrieves the history of a specific beauty product.
- Example cURL
```
curl -X GET http://localhost:3001/api/beauty-products/123/history
```

### Get Beauty Product Count
- Endpoint: GET /beauty-products-count
- Description: Retrieves the count of beauty products.
- Example cURL
```
  curl -X GET http://localhost:3001/api/beauty-products-count
```