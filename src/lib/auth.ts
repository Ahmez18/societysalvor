// src/lib/auth.ts
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-in-prod";

export const hashPassword = async (password: string): Promise<string> => {
  return bcryptjs.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashed: string
): Promise<boolean> => {
  return bcryptjs.compare(password, hashed);
};

// Updated to accept full payload object
export const signToken = (payload: { userId: string; role: string; schoolId?: string | null }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string; schoolId?: string | null };
  } catch {
    return null;
  }
};