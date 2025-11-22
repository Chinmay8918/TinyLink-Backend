import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

/** Generate a short-lived access token */
export const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

/** Generate a long-lived refresh token */
export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
