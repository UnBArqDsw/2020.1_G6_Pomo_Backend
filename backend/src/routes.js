import { Router } from "express";

import UserController from "./app/controllers/UserController";
import TaskController from "./app/controllers/TaskController";

const routes = new Router();

routes.post("/tasks", TaskController.create);

routes.post("/users", UserController.store);

export default routes;