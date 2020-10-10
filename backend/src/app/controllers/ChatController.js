import * as Yup from "yup"; // Importando yup

import Chat from "../models/Chat"

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
        return res.status(400).json({ error: "validation fails" });
      }

      //Se passar ... next();

      //verificando se existe chat
      
      const ChatExists = await Chat.findOne({
        where: 
        { user_id: req.body.user_id,
          receiver_id:req.body.receiver_id },
      });
      console.log(ChatExists)
      //se encontrar algum registro
  
      if (ChatExists) {
        return res.json({ create: "true",id:userExists.id });
      }

      //se não encontrou:
       const { id, user_id, receiver_id } = await Chat.create(req.body);

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

export default new ChatController();
