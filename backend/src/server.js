import app from "./app";

const port = process.env.PORTA || 3333; //porta que o server esta rodando

//start server NodeJS
app.listen(port, () => {
  console.log(`server rodando na porta: ${port}`);
});
