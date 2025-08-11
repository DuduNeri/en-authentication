import type { IUserLogin, IUserResponse } from "../interfaces/user.interfaces";
import { AuthService } from "../services/auth.services";

export class AuthController {
  async login(userData: IUserLogin): Promise<{ token: string; user: IUserResponse }> {
    return new AuthService().login(userData);
  }
}
