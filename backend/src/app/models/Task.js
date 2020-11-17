import Sequelize, { Model } from "sequelize";

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        time: Sequelize.STRING,
        icon: Sequelize.STRING,
        color: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      { sequelize },
    );

    return this;
  }
}

export default Task;
