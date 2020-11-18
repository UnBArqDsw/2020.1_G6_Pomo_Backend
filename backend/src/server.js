import app from "./app";
import logger from "./utils/logger";

const port = process.env.PORTA || 3333; //porta que o server esta rodando

//start server NodeJS
app.listen(port, () => {
  logger.info(`server rodando na porta: ${port}`);
});
