import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    CommonModule,
    ModulesModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:2718/HieuDatabase')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
