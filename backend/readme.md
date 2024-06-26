# Expatswap User Management Backend

This is the backend server for the Expatswap User Management Module, responsible for handling user-related operations and authentication.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Watch Demo Video

[![Watch the video](https://cdn.loom.com/sessions/thumbnails/aff71d0fbc8d45859742d5bc26cd9d2e-with-play.gif)](https://www.loom.com/share/aff71d0fbc8d45859742d5bc26cd9d2e)

## Getting Started

To get started with the backend server, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using npm:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory of the project and specify environment variables:

   ```
   MONGODB_URI=mongodb://localhost:27017/expatswap_user_management
   PORT=3000
   ```

4. Start the server:

   ```
   npm start
   ```

5. The server should now be running on http://localhost:3000.

## API Endpoints

### User Routes

- `POST /api/users`: Create a new user.
- `GET /api/users`: Fetch all users (supports pagination).

### Authentication Routes

- `POST /api/auth/login`: User login with email and password.
- `POST /api/auth/register`: User registration.

## Folder Structure

```
backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── config.js
│   └── server.js
│
├── .env
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to fork this repository and submit pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
