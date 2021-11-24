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
import { date } from 'yup/lib/locale';
import { CriarAgendardto } from './agendar.dto';
import { AgendarEntity } from './agendar.entity';
import { AgendarService } from './agendar.service';
import {
  AgendarValidation,
  altera_statusValidation,
} from './agendar.validation';

@Controller('agendamento')
export class AgendaController {
  constructor(private readonly service: AgendarService) {}

  @Get('/do-dia')
  async getDados(): Promise<AgendarEntity[]> {
    return this.service.getDados();
  }

  @Get()
  async getAll(): Promise<AgendarEntity[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async finById(
    @Param('id', ValidationNumberPipe) id: number,
  ): Promise<AgendarEntity> {
    return await this.service.findById(id);
  }

  @Post()
  async create(
    @Body(new ValidationPipe(AgendarValidation)) dto: CriarAgendardto,
  ): Promise<AgendarEntity> {
    return await this.service.create(dto);
  }

  @Put(':id/altera-status')
  async altera_status(
    @Body(new ValidationPipe(altera_statusValidation)) dto: AgendarEntity,
    @Param('id') id: number,
  ): Promise<AgendarEntity> {
    return await this.service.altera_status(dto, id);
  }
}
