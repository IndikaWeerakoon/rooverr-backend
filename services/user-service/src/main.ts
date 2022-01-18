import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logConfig, swaggerConfig } from './config/global.config';

const logger: Logger = new Logger('MAIN');
const port = process.env.PORT;
const appName = process.env.APP_NAME;
const contextPath = process.env.CONTEXT_PATH || '/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logConfig,
  });

  //set application context path. this prefix applied to all the end points.
  app.setGlobalPrefix(contextPath);

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
  const config = swaggerConfig(appName);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`Application (${appName}) Started on port: ${port}`);
}

bootstrap();
