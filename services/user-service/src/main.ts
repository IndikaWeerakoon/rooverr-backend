import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'process';
import * as winston from 'winston';
import { AppModule } from './app.module';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

const logger: Logger = new Logger('MAIN');
const port = process.env.PORT;
const appName = process.env.APP_NAME;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
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
            // winston.format.timestamp(),
            // winston.format.ms(),
            // nestWinstonModuleUtilities.format.nestLike(appName, { prettyPrint: true }),
          ),
        }),
      ],
    }),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  /**
   * Below configuration is invoked swagger-ui api documentation.
   * call '/api end' point for html dashboard
   * call '/api-json' for swagger json file.
   */
  const config = new DocumentBuilder()
    .setTitle(`${appName} apis`)
    .setDescription('Here will provide all the api details')
    .setVersion('1.0')
    .addTag('seed')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`Application (${appName}) Started on port: ${port}`);
}
bootstrap();
