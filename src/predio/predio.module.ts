import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredioService } from './predio.service';
import { PredioController } from './predio.controller';
import { PredioEntity } from './predio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PredioEntity])],
  providers: [PredioService],
  controllers: [PredioController],
})
export class PredioModule {}

