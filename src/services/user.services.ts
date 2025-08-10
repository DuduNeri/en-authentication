import {
  IUser,
  IUserCreate,
  IUserUpdate,
  IUserDelete,
  IUserLogin,
  IUserResponse,
  IUserGetById
} from "../interfaces/user.interfaces";
import UserModel from "../models/user.models";
import bcrypt from "bcrypt";

export class UserService {
  async createUser(userData: IUserCreate): Promise<IUserResponse> {
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error("Nome, email, e senha são obrigatórios");
    }

    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new UserModel({
      ...userData,
      password: hashedPassword
    });

    await newUser.save();

    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword as IUserResponse;
  }

  async getUserById(userData: IUserGetById): Promise<IUserResponse>{
    if (!userData.id) {
      throw new Error("ID do usuário é obrigatório");
    }

    const user = await UserModel.findById(userData.id).select("-password");
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user as IUserResponse;
  }

  async getAllUsers(): Promise<IUserResponse[]> {
    const users = await UserModel.find().select("-password");
    return users.map(user => user.toObject() as IUserResponse);
  }
}