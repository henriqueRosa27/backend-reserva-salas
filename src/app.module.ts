import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredioEntity } from './predio/predio.entity';
import { PredioModule } from './predio/predio.module';
import { SalaEntity } from './sala/sala.entity';
import { SalaModule } from './sala/sala.module';
import { EquipamentoEntity } from './equipamento/equipamento.entity';
import { EquipamentoModule } from './equipamento/equipamento.module';
import { AgendarEntity } from './agendar/agendar.entity';
import { AgendarModule } from './agendar/agendar.module';

const configDatabase: ConnectionOptions = {
  type: 'postgres',
  host: '192.168.2.100',
  database: 'reserva_salas',
  port: 5432,
  username: 'reserva_salas',
  password: 'bKJoH@m&',
  entities: [PredioEntity, SalaEntity, EquipamentoEntity, AgendarEntity],
};

@Module({
  imports: [
    TypeOrmModule.forRoot(configDatabase),
    SalaModule,
    PredioModule,
    EquipamentoModule,
    AgendarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
