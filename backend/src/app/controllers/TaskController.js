import * as Yup from "yup";
import logger from "../../utils/logger";
import Task from "../models/Task";
import User from "../models/User";

class TaskController {
  async create(req, res) {
    const { user_id } = req.params;
    const { name, time, icon, color, description } = req.body;
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        time: Yup.string().required(),
        icon: Yup.string().required(),
        color: Yup.string().required(),
        description: Yup.string().max(25),
      });
      if (!(await schema.isValid(req.body))) {
        logger.error("Alguns campos incorretos");
        return res.status(400).json({ error: "Alguns campos incorretos" });
      }

      const user = await User.findByPk(user_id, {
        include: { association: "tasks" },
      });
      let taskExists = false;
      for (let task of user.tasks) {
        if (task.name === name) taskExists = true;
      }
      if (taskExists) {
        return res
          .status(400)
          .json({ error: "Task com o mesmo nome já existe" });
      }
      const task = await Task.create({
        name,
        time,
        icon,
        color,
        description,
        user_id,
      });

      return res.json({ task }); //retornando somente dos dados importantes para o front
    } catch (erros) {
      logger.error("Houve erro interno na aplicação");
      return res.json({
        error: "Houve error interno na aplicação",
        erro: erros,
      });
    }
  }

  async read(req, res) {
    try {
      const { user_id } = req.params;

      const user = await User.findByPk(user_id, {
        include: { association: "tasks" },
      });
      return res.json(user.tasks);
    } catch (erros) {
      logger.error("Houve erro interno na aplicação");
      return res.json({
        error: "Houve um erro interno1 na aplicação",
        erro: erros,
      });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        time: Yup.string().required(),
        icon: Yup.string().required(),
        color: Yup.string().required(),
        description: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Alguns campos incorretos" });
      }
      const { id } = await req.params;
      const taskExists = await Task.findOne({
        where: { id: id },
      });

      console.log(taskExists);

      if (taskExists) {
        const element = await Task.update(req.body, {
          where: { id: id },
        });

        return res.status(200).json(req.body);
      }

      return res.status(400).json({ error: "Task não existe" });
    } catch (erros) {
      return res.json({
        error: "Houve um erro interno na aplicação",
        erro: erros,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const element = await Task.destroy({
        where: { id: id },
      });

      return res.json({ message: "Elemento excluído com sucesso!" });
    } catch (erros) {
      return res.json({
        error: "Houve um erro interno na aplicação",
        erro: erros,
      });
    }
  }
}

export default new TaskController();
