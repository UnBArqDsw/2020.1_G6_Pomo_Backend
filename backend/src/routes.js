import { Router } from "express";

import UserController from "./app/controllers/UserController";
import TaskController from "./app/controllers/TaskController";

const routes = new Router();

routes.get('/tasks', TaskController.read);
routes.post('/tasks', TaskController.create);
routes.put('/tasks/:id', TaskController.update);
routes.delete('/tasks/:id', TaskController.delete)

routes.post("/users", UserController.store);

export default routes;