import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipamentoService } from './equipamento.service';
import { EquipamentoController } from './equipamento.controller';
import { EquipamentoEntity } from './equipamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipamentoEntity])],
  providers: [EquipamentoService],
  controllers: [EquipamentoController],
})
export class EquipamentoModule {}
