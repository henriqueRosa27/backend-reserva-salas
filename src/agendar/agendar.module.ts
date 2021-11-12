import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendarService } from './agendar.service';
import { AgendaController } from './agendar.controller';
import { AgendarEntity } from './agendar.entity';
import {CriarAgendardto} from './agendar.dto';


@Module({
  imports: [TypeOrmModule.forFeature([AgendarEntity])],
  providers: [AgendarService],
  controllers: [AgendaController],
})
export class AgendarModule {}