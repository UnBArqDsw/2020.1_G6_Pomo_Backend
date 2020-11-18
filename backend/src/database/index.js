import Sequelize from "sequelize";
import mongoose from "mongoose";

import databaseConfig from "../config/database"; //model de config

import User from "../app/models/User"; //Model de user
import File from "../app/models/File"; //Model de Arquivos
import Task from "../app/models/Task"; //Model de user
import Timer from "../app/models/Timer"; //Model de timer
import Chat from "../app/models/Chat"; // Model de chat
import Menssage from "../app/models/Message";
import Notification from "../app/models/Notifications"; // Model da notificação

const models = [User, File, Task, Timer, Chat, Menssage, Notification]; //Array com todos os models

class Database {
  constructor() {
    this.init();
    //this.mongo();
  }
  //iniciando Sequelize e MongoDB
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
