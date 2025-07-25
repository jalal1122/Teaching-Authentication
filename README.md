# Teaching Authentication

A comprehensive Node.js authentication system built with Express.js, MongoDB, and JWT tokens for educational purposes. This project demonstrates secure user authentication with access and refresh tokens, password hashing, and protected routes.

## 🚀 Features

- **User Registration**: Secure user registration with password hashing
- **User Login**: JWT-based authentication system
- **Access & Refresh Tokens**: Dual token system for enhanced security
- **Password Hashing**: Bcrypt implementation for secure password storage
- **Protected Routes**: Middleware for route protection
- **Cookie-based Authentication**: Secure cookie handling
- **MongoDB Integration**: Mongoose ODM for database operations
- **Input Validation**: Comprehensive error handling

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment Management**: dotenv
- **Development**: nodemon

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or MongoDB Atlas)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jalal1122/Teaching-Authentication.git
   cd Teaching-Authentication
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=8008
   MONGO_URI=mongodb://localhost:27017/myteachingDB
   ORIGIN=*
   ACCESS_TOKEN_SECRET=your_access_token_secret_here
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=10d
   ```

4. **Start MongoDB**

   Make sure MongoDB is running on your system:

   ```bash
   # For Windows (if MongoDB is installed as a service)
   net start MongoDB

   # For macOS/Linux
   sudo systemctl start mongod
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:8008`

## 📁 Project Structure

```
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js             # Server entry point
│   ├── config/
│   │   └── db.js             # Database connection
│   ├── controller/
│   │   └── user.controller.js # User-related controllers
│   ├── middleware/
│   │   └── auth.middleware.js # Authentication middleware
│   ├── model/
│   │   └── user.model.js     # User data model
│   ├── routes/
│   │   └── user.route.js     # User routes
│   └── utils/
│       ├── ApiError.js       # Custom error handling
│       ├── ApiResponse.js    # Standardized API responses
│       └── asyncHandler.js   # Async error handling wrapper
├── .env                      # Environment variables
├── package.json             # Project dependencies and scripts
└── README.md               # Project documentation
```

## 🔗 API Endpoints

### Authentication Routes

| Method | Endpoint             | Description         | Authentication Required |
| ------ | -------------------- | ------------------- | ----------------------- |
| POST   | `/api/user/register` | Register a new user | No                      |
| POST   | `/api/user/login`    | Login user          | No                      |
| GET    | `/api/user/logout`   | Logout user         | Yes                     |

### API Usage Examples

#### Register User

```bash
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login User

```bash
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Logout User

```bash
GET /api/user/logout
Authorization: Bearer <access_token>
```

## 🔐 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Refresh Token Rotation**: Enhanced security with refresh token mechanism
- **Cookie Security**: HTTP-only cookies for token storage
- **Input Validation**: Server-side validation for all inputs
- **Environment Variables**: Sensitive data stored in environment variables

## 🧪 Testing the API

You can test the API endpoints using tools like:

- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)
- [Insomnia](https://insomnia.rest/)
- cURL commands

### Example cURL Commands

**Register:**

```bash
curl -X POST http://localhost:8008/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:8008/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

## 🤝 Contributing

This is an educational project. Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 Learning Objectives

This project demonstrates:

- Setting up a Node.js backend with Express
- Implementing secure authentication with JWT
- Password hashing and validation
- Database modeling with Mongoose
- Error handling and API responses
- Middleware implementation
- Environment configuration
- RESTful API design

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check the `MONGO_URI` in your `.env` file
   - Verify database permissions

2. **JWT Token Errors**

   - Check if `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` are set
   - Ensure tokens are properly formatted

3. **Port Already in Use**
   - Change the `PORT` in your `.env` file
   - Kill any processes using the current port

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Jalal Ahmad**

- GitHub: [@jalal1122](https://github.com/jalal1122)

---

**Happy Learning! 🎓**

_This project is designed for educational purposes to teach authentication concepts in Node.js applications._
