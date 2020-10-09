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

    async read(req, res) {
        try {
            const allTimers = await Timer.findAll();
            return res.json(allTimers)
        } catch(erros) {
            return res.json({
                error: "Houve um erro interno na aplicação.",
                erro: erros
            });
        }
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                startDate: Yup.startDate().required(),
                currentDate: Yup.date().required(),
                endDate: Yup.date().required()
            });
    
            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: "Data invalida."});
            }
    
            const { id } = await req.params;
            const dateExists = await Timer.findOne({
                where: { id: id }
            });
    
            if(dateExists) {
                const element = await Timer.update(req.body, {
                    where: { id: id}
                });
                return res.status(200).json(req.body);
            }
    
            return res.status(400).json({ error: "Data não existe." });
                
        } catch(erros) {
            return res.json({
                error: "Houve um erro interno na aplicação.",
                erro: erros
            });
        }
        
    }

    
}

export default new TimerController();