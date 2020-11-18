import * as Yup from "yup"; // Importando yup
import logger from "../../utils/logger";
import Menssage from "../models/Message";
import Chat from "../models/Chat";

class MenssageController {
  async store(req, res) {
    try {
      //criando validações
      const schema = Yup.object().shape({
        chat_id: Yup.number().required(),
        content: Yup.string().required(),
      });

      //Se nao passar na validação retorna
      if (!(await schema.isValid(req.body))) {
        logger.error("validation fails");
        return res.status(400).json({ error: "validation fails" });
      }

      //Se passar ... next();

      //verificando se existe chat
      const ChatExists = await Chat.findOne({
        where: { id: req.body.chat_id },
      });

      //se não encontrou:
      if (!ChatExists) {
        return res.status(400).json({ error: "Chat não criado" });
      }

      //se  encontrou:
      const { id, content, chat_id } = await Menssage.create(req.body);

      return res.json({ id, content, chat_id }); //retornando somente dos dados importantes para o front
    } catch (erros) {
      logger.error("Houve erro interno na aplicação");
      return res.json({
        error: "Houve erro interno na aplicação",
        erro: erros,
      });
    }
  }
}

export default new MenssageController();
