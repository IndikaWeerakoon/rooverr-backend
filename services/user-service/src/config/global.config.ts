import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { DocumentBuilder } from '@nestjs/swagger';

export const logConfig = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      // format: winston.format.simple(),
      format: winston.format.combine(
        winston.format.simple(),
        // winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf((info) => {
          const { timestamp, level, message, ...extra } = info;
          const { context, ...args } = extra;

          return `${timestamp} [${level}]: ${context}: ${message.trim()} ${
            Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
          }`;
        }),
      ),
    }),
  ],
});

export const swaggerConfig = (appName: string) => {
  return new DocumentBuilder()
    .setTitle(`${appName} apis`)
    .setDescription('Here will provide all the api details')
    .setVersion('1.0')
    .addTag('seed')
    .build();
};
