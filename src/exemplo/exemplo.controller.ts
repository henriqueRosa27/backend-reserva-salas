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
import { ExemploEntity } from './exemplo.entity';
import { ExemploService } from './exemplo.service';
import { exemploValidation } from './exemplo.validations';

@Controller('exemplos')
export class ExemploController {
  constructor(private readonly service: ExemploService) {}

  @Get()
  async getAll(): Promise<ExemploEntity[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async finById(
    @Param('id', ValidationNumberPipe) id: number,
  ): Promise<ExemploEntity> {
    return await this.service.findById(id);
  }

  @Post()
  async create(
    @Body(new ValidationPipe(exemploValidation)) exemplo: ExemploEntity,
  ): Promise<ExemploEntity> {
    return await this.service.create(exemplo);
  }

  @Put(':id')
  async update(
    @Body(new ValidationPipe(exemploValidation)) dto: ExemploEntity,
    @Param('id') id: number,
  ): Promise<ExemploEntity> {
    return await this.service.update(dto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<null> {
    return await this.service.delete(id);
  }
}
