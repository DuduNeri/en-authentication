import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", router);

export default app;