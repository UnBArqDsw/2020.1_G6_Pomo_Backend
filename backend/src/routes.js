import { Router } from "express";

import UserController from "./app/controllers/UserController";
import Task from './app/models/Task';

const routes = new Router();

routes.get('/', async (req, res) => { // exemplo para testar se esta funcionando
    const user = await Task.create({
        name: 'Estudar calculo',
        time: '2 horas',
        icon: 'calculo',
        color: 'red',
    });

    return res.json(user);
});

routes.post("/users", UserController.store);

export default routes;