import Sequelize, {Model} from "sequelize"

class Timer extends Model {
    static init(sequelize) {
        super.init(
            {
                startDate: Sequelize.DATE,
                endDate: Sequelize.DATE,
                currentDate: Sequelize.DATE
            },
        { sequelize },
        );

        return this;
    }
}

export default Timer;