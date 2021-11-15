import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AfterInsert, Between, Repository } from 'typeorm';
import { AgendarEntity } from './agendar.entity';
import { CriarAgendardto } from './agendar.dto';
import { EquipamentoEntity } from 'src/equipamento/equipamento.entity';
import *as moment from 'moment';

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
    await this.checkDate(dto);
    await this.checkAgenda(dto);

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
  async checkDate(dto: CriarAgendardto): Promise<void> {
   if (moment(dto.data_inicial).isAfter(dto.data_final)){
      throw new HttpException(
        { erro: 'Data inválida: data deverá ser maior que à data inicial!' },
          HttpStatus.BAD_REQUEST,
        );
      }
  }
  async checkAgenda(dto:CriarAgendardto, Id?:number): Promise<void> {
    let query = this.rep.createQueryBuilder("agendamento")
    .where(":data_inicial BETWEEN agendamento.data_inicial AND  agendamento.data_final", {DATA_INICIAL : dto.data_inicial.toISOString()})
    .andWhere("agendamento.sala_id=:SALAID", {SALAID: dto.sala_id})
    
    if(Id) {
      query = query.andWhere("agendamento.id<>:ID", {ID:Id});
    }
    const result = await query.getOne()
    if(result) {

      throw new HttpException(
        { erro: 'Sala já esta agendada!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}