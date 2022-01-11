import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AppConfigModule } from './config/app-config.module';

@Module({
  imports: [AppConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
