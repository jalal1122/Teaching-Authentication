import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  // get the token from the request headers or cookies
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;

  // if the token is not present, throw an error
  if (!token) {
    throw new ApiError(401, "token not found");
  }

  // verify the token and decode it
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  // if token is invalid or expired, throw an error
  if (!decoded) {
    throw new ApiError(401, "invalid token");
  }

  const user = await User.findById(decoded.id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  req.user = user;

  next();
});

export default authMiddleware;
