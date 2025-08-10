import { UserController } from "../controllers/user.controllers";
import type { IUserCreate } from "../interfaces/user.interfaces";
import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const userData: IUserCreate = req.body;
    const userController = new UserController();
    const newUser = await userController.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ Erro ao criar usuário:", error);
    res.status(400).json({ message: (error as Error).message });
  }
})
export default router;