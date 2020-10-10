import { Router } from "express";
//import multer from "multer";

import authMiddleware from "./app/middleware/auth"; //middleware de autenticação
//import multerConfig from "./config/multer"; //config multer

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import TaskController from "./app/controllers/TaskController";

const routes = new Router();
//const upload = multer(multerConfig);

routes.get("/tasks", TaskController.read);
routes.post("/tasks", TaskController.create);
routes.put("/tasks/:id", TaskController.update);
routes.delete("/tasks/:id", TaskController.delete);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware); //Middleware global || valido para rotas abaixo

routes.put("/users", UserController.update);
//routes.post("/files", upload.single("file"), FileController.store);

export default routes;
