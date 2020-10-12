import Sequelize, { Model } from "sequelize";

class Notification extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        body: Sequelize.STRING,
      },
      { sequelize },
    );

    return this;
  }
}

export default Notification;
