import express, { Application } from "express";
import * as dotenv from "dotenv";
import { routes } from "./routes";
dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string) || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  routes(app);
});
