import Sequelize, { Model } from "sequelize";

class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.STRING,
        
      },
      { sequelize },
    );
   

    return this;
  }

  //metodo de ralacionamento
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "file_id", as: "file" });
  }

  
}

export default Message;
