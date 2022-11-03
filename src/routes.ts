import { Application, Request, Response } from "express";
import { balanceHandler } from "./controllers/balance.controller";

export const routes = (app: Application) => {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.get("/api/balance/:address", balanceHandler);
  app.all("*", (req: Request, res: Response) => res.status(404).json({ error: "Endpoint doesn't exist" }));
};
