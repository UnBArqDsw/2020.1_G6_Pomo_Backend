import Sequelize, { Model } from "sequelize";

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        time: Sequelize.STRING,
        icon: Sequelize.STRING,
        color: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        
      },
      { sequelize },
    );


    return this;
  }

}

export default User;
