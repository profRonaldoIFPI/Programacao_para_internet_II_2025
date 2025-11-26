import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(400).json({ message: "Faca o login." });
  }

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(400).json({ message: "Tipo de token invalido ou sem token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ message: "Token invalido ou vencido. Faca login novamente." });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Acesso negado. Somente usuarios Administradores." });
  }
  next();
};
