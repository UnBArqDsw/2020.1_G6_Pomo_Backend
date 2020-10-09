import * as Yup from "yup";

import Timer from "../models/Timer";

class TimerController {
    async create(req, res) {
        try {
            const schema = Yup.object().shape({
                startDate: Yup.date().required(),
                currentDate: Yup.date().required(),
                endDate: Yup.date().required()
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: "Data invalida."});
            }

            const dateExists = await Timer.findOne({
                where: { startDate: req.body.startDate }
            });

            if (dateExists) {
                return res.status(400).json({ error: "Timer com mesma data e hora já existe." });
            }

            const { startDate, currentDate, endDate } = await Timer.create(req.body);
            return res.json({ startDate, currentDate, endDate }); 

        } catch(erros) {
            return res.json({
                error: "Houve um erro interno na aplicação.",
                erro: erros
            });
        }
    }

}

export default new TimerController();