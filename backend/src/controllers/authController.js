import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/User.js";
import { env } from "../config/env.js";
import { sendAuthCookie } from "../utils/responses.js";
import { registerSchema, loginSchema } from "../validators/authSchemas.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);
    const exists = await User.findOne({ email });
    if (exists) throw createError(409, "Email already registered");

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, name });

    const token = jwt.sign({ sub: user.id, email: user.email }, env.jwtSecret, {
      expiresIn: `${env.jwtDays}d`,
    });
    sendAuthCookie(
      res,
      env.cookieName,
      token,
      env.jwtDays,
      env.nodeEnv === "production"
    );

    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) throw createError(401, "Invalid credentials");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw createError(401, "Invalid credentials");

    const token = jwt.sign({ sub: user.id, email: user.email }, env.jwtSecret, {
      expiresIn: `${env.jwtDays}d`,
    });
    sendAuthCookie(
      res,
      env.cookieName,
      token,
      env.jwtDays,
      env.nodeEnv === "production"
    );

    res.status(200).json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res) => {
  res.status(200).json({ id: req.user.id, email: req.user.email });
};

export const logout = async (_req, res) => {
  res.clearCookie(env.cookieName, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.nodeEnv === "production" ? "none" : "lax",
    path: "/",
  });
  res.status(200).json({ message: "Logged out" });
};
