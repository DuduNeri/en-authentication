import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModels from "../models/user.models";
import type { IUserLogin, IUserResponse } from "../interfaces/user.interfaces";

export class AuthService {
  async login(userData: IUserLogin): Promise<{ token: string; user: IUserResponse }> {
    const user = await userModels.findOne({ email: userData.email });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  }
}
