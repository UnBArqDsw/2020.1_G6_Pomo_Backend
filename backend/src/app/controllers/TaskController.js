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

    async read(req, res) {
        try {
            const allTasks = await Task.findAll();
            return res.json(allTasks)

        } catch (erros) {
            return res.json({
            error: "Houve um erro interno na aplicação",
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
                
            });
            
            if(!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: "Alguns campos incorretos" });
            }
            const { id } = await req.params;
            const taskExists = await Task.findOne({
                where: { id: id },
            });
            
            console.log(taskExists);
        
              
            if(taskExists) {
                const element = await Task.update(req.body, {
                    where: {id: id}
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
                where: {id: id}
            });

            return res.json({message: 'Elemento excluído com sucesso!'});

        } catch (erros) {
            return res.json({
            error: "Houve um erro interno na aplicação",
            erro: erros,
            });
        }
    }

}

export default new TaskController();