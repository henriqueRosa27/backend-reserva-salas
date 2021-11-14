import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgendarEntity } from './agendar.entity';
import { CriarAgendardto } from './agendar.dto';
import { EquipamentoEntity } from 'src/equipamento/equipamento.entity';
import { number } from 'yup/lib/locale';

@Injectable()
export class AgendarService {
  constructor(
    @InjectRepository(AgendarEntity)
    private readonly rep: Repository<AgendarEntity>,
  ) {}

  async getAll(): Promise<AgendarEntity[]> {
    const agenda = await this.rep.find({ order: { data_final: 'ASC' } });

    return agenda;
  }

  async findById(id: number): Promise<AgendarEntity> {
    const agenda = await this.rep.findOne({ where: { id } });

    if (agenda) return agenda;

    throw new HttpException(
      { erro: 'Agendamento não existe' },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(dto: CriarAgendardto): Promise<AgendarEntity> {
    const agenda = new AgendarEntity();
    await this.checkId(dto);

    agenda.data_inicial = dto.data_inicial;
    agenda.data_final = dto.data_final;
    agenda.sala_id = dto.sala_id;
    agenda.responsavel = dto.responsavel;
    agenda.observacao = dto.observacao;
    agenda.status = dto.status;
    agenda.nome_evento = dto.nome_evento;
    agenda.quantidade_pessoas = dto.quantidade_pessoas;
    agenda.equipamentos =
      dto.equipamentos?.map((equipamento) => {
        const data = new EquipamentoEntity();
        data.id = equipamento;
        return data;
      }) || [];
    const entity = await this.rep.save(agenda);

    return entity;
  }

  async altera_status(
    agenda: AgendarEntity,
    id: number,
  ): Promise<AgendarEntity> {
    const entitySalva = await this.findById(id);

    entitySalva.status = agenda.status;
    const entity = await this.rep.save(entitySalva);
    return entity;
  }

  async checkId(dto: CriarAgendardto): Promise<void> {
    dto.equipamentos.map((equipamentos) => {
      if (isNaN(equipamentos)) {
        throw new HttpException(
          { erro: `${equipamentos}: Deve ser um número!` },
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}
