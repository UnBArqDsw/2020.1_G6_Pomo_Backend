import * as Yup from "yup";

import Task from "../models/Task";

class TaskController {
  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        time: Yup.string().required(),
        icon: Yup.string().required(),
        color: Yup.string().required(),
        
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Alguns campos incorretos" });
      }
      const taskExists = await Task.findOne({
        where: { name: req.body.name },
      });

      
      if (taskExists) {
        return res.status(400).json({ error: "Task com o mesmo nome já existe" });
      }
      const { id, name, time, icon, color } = await Task.create(req.body);

      return res.json({ id, name, time, icon, color  }); //retornando somente dos dados importantes para o front
    
    } catch (erros) {
      return res.json({
        error: "Houve error interno na aplicação",
        erro: erros,
      });
    }
  }

}

export default new TaskController();
