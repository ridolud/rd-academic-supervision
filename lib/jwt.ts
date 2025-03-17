import jwt from "jsonwebtoken";

export interface EmailTokenPayload {
  id_user: string;
  email: string;
}

export function verifyToken(token: string, secret: string) {
  return jwt.verify(token, secret) as EmailTokenPayload;
}

export function generateEmailToken(payload: EmailTokenPayload, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}
