import * as Yup from "yup"; // Importando yup
import logger from "../../utils/logger";

import Chat from "../models/Chat";

class ChatController {
  async store(req, res) {
    try {
      //criando validações
      const schema = Yup.object().shape({
        user_id: Yup.number().required(),
        receiver_id: Yup.number().required(),
      });

      //Se nao passar na validação retorna
      if (!(await schema.isValid(req.body))) {
        logger.error("validation fails");
        return res.status(400).json({ error: "validation fails" });
      }

      //Se passar ... next();

      //verificando se existe chat

      const ChatExists = await Chat.findOne({
        where: { user_id: req.body.user_id, receiver_id: req.body.receiver_id },
      });
      logger.info(ChatExists);
      //se encontrar algum registro

      if (ChatExists) {
        return res.json({ create: "true", id: userExists.id });
      }

      //se não encontrou:
      const { id, user_id, receiver_id } = await Chat.create(req.body);

      return res.json({ id, user_id, receiver_id }); //retornando somente dos dados importantes para o front
    } catch (erros) {
      logger.error("Houve um erro interno na aplicação");
      return res.json({
        error: "Houve error interno na aplicação",
        erro: erros,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const element = await Chat.destroy({
        where: { id: id },
      });

      return res.json({ message: "Chat excluído com sucesso!" });
    } catch (erros) {
      logger.error("Houve erro interno na aplicação");
      return res.json({
        error: "Houve erro interno na aplicação",
        erro: erros,
      });
    }
  }

  async index(req, res) {
    try {
      const { id } = req.params;

      const data = await Chat.findByPk(id, { include: ["message"] });

      return res.json({ data });
    } catch (error) {
      logger.error("Houve erro interno na aplicação");
      return res.json({
        err: "Houve erro interno na aplicação",
        error,
      });
    }
  }
}

export default new ChatController();
