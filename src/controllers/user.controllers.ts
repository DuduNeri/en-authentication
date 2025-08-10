import type { IUserCreate } from "../interfaces/user.interfaces";
import { UserService } from "../services/user.services";

export class UserController {
  async createUser(data: IUserCreate) {
    const userService = new UserService();
    return await userService.createUser(data);
  }

  async getUserById(data: { id: string }) {
    const userService = new UserService();
    return await userService.getUserById(data);
  }
  
  async getAllUsers() {
    const userService = new UserService();
    return await userService.getAllUsers();
  }
}