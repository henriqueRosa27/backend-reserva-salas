import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ValidationNumberPipe, ValidationPipe } from 'src/validation.pipe';
import { EquipamentoEntity } from './equipamento.entity';
import { EquipamentoService } from './equipamento.service';
import {
  EquipamentoValidation,
  altera_statusValidation,
} from './equipamento.validation';

@Controller('equipamentos')
export class EquipamentoController {
  constructor(private readonly service: EquipamentoService) {}

  @Get()
  async getAll(): Promise<EquipamentoEntity[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async finById(
    @Param('id', ValidationNumberPipe) id: number,
  ): Promise<EquipamentoEntity> {
    return await this.service.findById(id);
  }

  @Post()
  async create(
    @Body(new ValidationPipe(EquipamentoValidation))
    equipamento: EquipamentoEntity,
  ): Promise<EquipamentoEntity> {
    return await this.service.create(equipamento);
  }

  @Put(':id/altera-status')
  async altera_status(
    @Body(new ValidationPipe(altera_statusValidation)) dto: EquipamentoEntity,
    @Param('id') id: number,
  ): Promise<EquipamentoEntity> {
    return await this.service.altera_status(dto, id);
  }

  @Put(':id')
  async update(
    @Body(new ValidationPipe(EquipamentoValidation)) dto: EquipamentoEntity,
    @Param('id') id: number,
  ): Promise<EquipamentoEntity> {
    return await this.service.update(dto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<null> {
    return await this.service.delete(id);
  }
}
