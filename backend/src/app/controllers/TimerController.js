import * as Yup from "yup";
import logger from "../../utils/logger";
import Timer from "../models/Timer";

class TimerController {
  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        startDate: Yup.date().required(),
        currentDate: Yup.date().required(),
        endDate: Yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) {
        logger.error("Data invalida.");
        return res.status(400).json({ error: "Data invalida." });
      }

      const dateExists = await Timer.findOne({
        where: { startDate: req.body.startDate },
      });

      if (dateExists) {
        logger.error("Timer com mesma data e hora já existe.");
        return res
          .status(400)
          .json({ error: "Timer com mesma data e hora já existe." });
      }

      const { startDate, currentDate, endDate } = await Timer.create(req.body);
      return res.json({ startDate, currentDate, endDate });
    } catch (erros) {
      logger.error("Houve erro interno na aplicação");
      return res.json({
        error: "Houve erro interno na aplicação.",
        erro: erros,
      });
    }
  }

  async read(req, res) {
    try {
      const allTimers = await Timer.findAll();
      return res.json(allTimers);
    } catch (erros) {
      logger.error("Houve erro interno na aplicação");
      return res.json({
        error: "Houve erro interno na aplicação.",
        erro: erros,
      });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        startDate: Yup.startDate().required(),
        currentDate: Yup.date().required(),
        endDate: Yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Data invalida." });
      }

      const { id } = await req.params;
      const dateExists = await Timer.findOne({
        where: { id: id },
      });

      if (dateExists) {
        const element = await Timer.update(req.body, {
          where: { id: id },
        });
        return res.status(200).json(req.body);
      }

      return res.status(400).json({ error: "Data não existe." });
    } catch (erros) {
      logger.error("Houve erro interno na aplicação");
      return res.json({
        error: "Houve erro interno na aplicação.",
        erro: erros,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const element = await Timer.destroy({
        where: { id: id },
      });
      return res.json({ message: "Elemento excluído com sucesso!" });
    } catch (erros) {
      logger.error("Houve erro interno na aplicação");
      return res.json({
        error: "Houve erro interno na aplicação",
        erro: erros,
      });
    }
  }
}

export default new TimerController();
