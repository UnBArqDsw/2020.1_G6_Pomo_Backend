import Sequelize, { Model } from 'sequelize';

class Chat extends Model {
  static init(sequelize) {
    super.init(
      {},
       { sequelize },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.User, { foreignKey: "receiver_id", as: "receiver" });
    this.hasMany(models.Message, {  as: "message" });
  }
}
export default Chat;