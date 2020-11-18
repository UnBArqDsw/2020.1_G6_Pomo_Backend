import { createLogger, format, transports } from "winston";
import moment from "moment-timezone";
const { combine, timestamp, label, printf, simple, prettyPrint } = format;
import pt from "date-fns/locale/pt";

const appendTimestamp = format((info, opts) => {
  if (opts.tz) {
    info.timestamp = moment().tz(opts.tz).format("DD-MM-YYYY HH:mm:ss");
  }

  return info;
});

const logFormatConsole = printf(
  info => `[${info.label}] ${info.level}: ${info.message}`,
);
const logFormatFile = printf(
  info => `${info.timestamp} ${info.level}: ${info.message}`,
);

const logger = createLogger({
  /*format: format.combine(
    format.simple(),
    format.timestamp("'dia' dd 'de' MMMM', às' H:mm'h'", { locale: pt }),
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`),
  ),*/
  format: combine(appendTimestamp({ tz: "America/Sao_Paulo" }), logFormatFile),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 10,
      filename: `${__dirname}/../logs/log-api.log`,
    }),
    new transports.Console({
      level: "debug",
    }),
  ],
});

export default logger;
