import { Router } from "express";
//import multer from "multer";

import authMiddleware from "./app/middleware/auth"; //middleware de autenticação
//import multerConfig from "./config/multer"; //config multer

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import TaskController from "./app/controllers/TaskController";
import ChatController from './app/controllers/ChatController';
import MessageController from './app/controllers/MessageController';
import NotificationController from './app/controllers/NotificationController';

const routes = new Router();
//const upload = multer(multerConfig);

routes.get("/tasks", TaskController.read);
routes.post("/tasks", TaskController.create);
routes.put("/tasks/:id", TaskController.update);
routes.delete("/tasks/:id", TaskController.delete);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.post("/chat", ChatController.store); // chat
routes.get("/chat/:id", ChatController.index); // chat
routes.delete("/chat/:id", ChatController.delete); // chat
routes.post("/message", MessageController.store); // mensagem

routes.use(authMiddleware); //Middleware global || valido para rotas abaixo

routes.put("/users", UserController.update);
//routes.post("/files", upload.single("file"), FileController.store);

routes.get("/notification", NotificationController.read);
routes.put("/notification", NotificationController.update);
routes.delete("/notification", NotificationController.delete);



export default routes;
