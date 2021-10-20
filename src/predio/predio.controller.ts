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
import { PredioEntity } from './predio.entity';
import { PredioService } from './predio.service';
import { predioValidation } from './predio.validation';

@Controller('predios')
export class PredioController {
  constructor(private readonly service: PredioService) {}

  @Get()
  async getAll(): Promise<PredioEntity[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async finById(
    @Param('id', ValidationNumberPipe) id: number,
  ): Promise<PredioEntity> {
    return await this.service.findById(id);
  }

  @Post()
  async create(
    @Body(new ValidationPipe(predioValidation)) predio: PredioEntity,
  ): Promise<PredioEntity> {
    return await this.service.create(predio);
  }

  @Put(':id')
  async update(
    @Body(new ValidationPipe(predioValidation)) dto: PredioEntity,
    @Param('id') id: number,
  ): Promise<PredioEntity> {
    return await this.service.update(dto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<null> {
    return await this.service.delete(id);
  }
}
