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

  async deleteUser(data: { id: string }) {
    const userService = new UserService();
    return await userService.deleteUser(data);
  }

  async updateUser(data: { name?: string; email?: string; password?: string }, userId: string) {
    const userService = new UserService();
    return await userService.updateUser(data, userId);
  }
}