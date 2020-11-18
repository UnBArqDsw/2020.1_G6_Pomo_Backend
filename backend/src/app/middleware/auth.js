import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth"; //Config do token
import logger from "../../utils/logger"; // logs

export default async (req, res, next) => {
  const authHeader = req.headers.authorization; //pegando token

  //verificando se token foi enviado na requisição
  if (!authHeader) {
    logger.error("Token não informado");
    return res.status(401).json({ error: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");
  try {
    //verificando se o token e valido
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id; //pegando ID do usuário

    return next(); //se deu tudo certo, retorna next
  } catch (error) {
    //se tiver error, captura e retorna no json
    logger.error("Houve erro interno na aplicação");
    return res.status(401).json({ err: "token inválido" });
  }
};
