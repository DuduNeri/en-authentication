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
});

router.get("/:id", async (req: Request, res: Response) => {
   try {
    const { id } = req.params;
    const userController = new UserController();
    const user = await userController.getUserById({ id });
    res.status(200).json(user);
   } catch (error) {
    console.error("❌ Erro ao buscar usuário:", error);
    res.status(400).json({ message: (error as Error).message });
   }
})

router.get("/", async (req: Request, res: Response) => {
  try {
    const userController = new UserController();
    const users = await userController.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Erro ao buscar usuários:", error);
    res.status(400).json({ message: (error as Error).message });
  }
});
export default router;