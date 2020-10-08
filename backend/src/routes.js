import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middleware/auth"; //middleware de autenticação

const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware); //Middleware global || valido para rotas abaixo

routes.put("/users", UserController.update);

export default routes;
