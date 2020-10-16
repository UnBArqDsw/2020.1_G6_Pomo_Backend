import * as Yup from "yup";

import Notification from "../models/Notifications";

class NotificationController {

  async read(req, res) {
      try {
          const allNotifications = await Notification.findAll();
          return res.json(allNotifications)

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
            title: Yup.string().required(),
            body: Yup.string().required(),            
        });
        
        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Alguns campos incorretos" });
        }
        const { id } = await req.params;
        const notificationExists = await Notification.findOne({
            where: { id: id },
        });    
          
        if(notificationExists) {
            const element = await Notification.update(req.body, {
                where: {id: id}
        });
            
            return res.status(200).json(req.body);
            
        }

        return res.status(400).json({ error: "Notificação não existe" });


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

        const element = await Notification.destroy({
            where: {id: id}
        });

        return res.json({message: 'Notificação excluída com sucesso!'});

    } catch (erros) {
        return res.json({
        error: "Houve um erro interno na aplicação",
        erro: erros,
        });
    }
  }

}

export default new NotificationController();