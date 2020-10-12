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

}

export default new TaskController();