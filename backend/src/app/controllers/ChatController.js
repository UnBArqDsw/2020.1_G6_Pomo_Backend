import * as Yup from "yup"; // Importando yup

import Menssage from "../models/Message"; // Model de usuário
import Chat from "../models/Chat"

class UserController {
  async store(req, res) {
    try {
      //criando validações
      const schema = Yup.object().shape({
        id:Yup.number().required(),
        user_id: Yup.number().required(),
        receiver_id: Yup.number().required(),

      });

      //Se nao passar na validação retorna
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "validation fails" });
      }

      //Se passar ... next();

      //verificando se existe chat
      const userExists = await Chat.findOne({
        where: { id: req.body.id },
      });

      //se encontrar algum registro
      if (userExists) {
        return res.status(400).json({ error: "Chat ja criado" });
      }

      //se não encontrou:
      const { id, user_id, receiver_id } = await User.create(req.body);

      return res.json({ id, user_id, receiver_id }); //retornando somente dos dados importantes para o front
    } catch (erros) {
      return res.json({
        error: "Houve error interno na aplicação",
        erro: erros,
      });
    }
  }

async destroy({params}){
  const chat = await Chat.findAll(params.id);
  await chat.delete()
}
}

export default new UserController();
