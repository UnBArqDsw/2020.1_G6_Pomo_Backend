import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        message:Sequelize.STRING,
        
      },

      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.User, { foreignKey: "receiver_id", as: "receiver" });
    this.belongsTo(models.File, { foreignKey: "file_id", as: "file" });
  }
}
export default Appointment;