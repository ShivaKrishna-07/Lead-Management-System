export const sendAuthCookie = (res, name, token, days, isProd) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "None",
    domain: ".lead-management-system-psi.vercel.app",
    maxAge: days * 24 * 60 * 60 * 1000,
    path: "/",
  });
};
