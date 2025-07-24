import User from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";

// cookie options
const cookieOptions = {
  httpOnly: true,
  secure: false,
};

// Register a new user
const registerUser = asyncHandler(async (req, res, next) => {
  // get the user details from the request body
  const { name, username, email, password } = req.body;

  //   validate the user details
  if (!name || !username || !email || !password) {
    throw new ApiError(400, "All fields are required or one field is missing");
  }

  //   check if the user already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  }).select("-password -refreshToken");

  //   if the user already exists, throw an error
  if (existingUser) {
    throw new ApiError(400, "Username or email already exists");
  }

  //   create a new user
  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  //   send the response with the user details
  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    })
  );
});

// Login a user
const loginUser = asyncHandler(async (req, res, next) => {
  // get the user credentials from the request body
  const { username, email, password } = req.body;

  //   if the user credentials are not provided, throw an error
  if ((!email || !username) && !password) {
    throw new ApiError(400, "Username or email and password are required");
  }

  //   get the user from the database
  const user = await User.findOne({
    $or: [{ username: email }, { email }],
  }).select("+password");

  //   if the user is not found, throw an error
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  //   check if the password is valid
  const isPasswordValid = await bcrypt.compare(password, user.password);

  //   if the password is invalid, throw an error
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  //   generate access and refresh tokens
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  //   save the refresh token in the user document
  user.refreshToken = refreshToken;
  await user.save();

  //   send the response with the user details and tokens in the cookies
  res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      })
    );
});

// Logout a user
const logoutUser = asyncHandler(async (req, res, next) => {
  // get the token from the request cookies
  const token = req.cookies.accessToken;

  //   if the token is not present, throw an error
  if (!token) {
    throw new ApiError(401, "No token found");
  }

  //   clear the access and refresh tokens from the cookies
  res
    .status(200)
    .clearCookie("refreshToken", cookieOptions)
    .clearCookie("accessToken", cookieOptions)
    .json(new ApiResponse(200, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
