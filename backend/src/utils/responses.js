export const sendAuthCookie = (res, name, token, days, isProd) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: days * 24 * 60 * 60 * 1000,
    path: "/",
  });
};
