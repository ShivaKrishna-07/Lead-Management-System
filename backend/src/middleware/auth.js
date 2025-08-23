import jwt from "jsonwebtoken";
import createError from "http-errors";
import { env } from "../config/env.js";

export const authRequired = (req, _res, next) => {
  try {
    const token = req.cookies?.[env.cookieName];
    if (!token) throw createError(401, "Unauthorized");
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    next(createError(401, "Unauthorized"));
  }
};
