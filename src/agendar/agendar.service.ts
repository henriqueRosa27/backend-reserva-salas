import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  createQueryBuilder,
  getRepository,
  LessThanOrEqual,
  MoreThanOrEqual,
  Raw,
  Repository,
  RepositoryNotFoundError,
} from 'typeorm';
import { AgendarEntity } from './agendar.entity';
import { CriarAgendardto } from './agendar.dto';
import { EquipamentoEntity } from 'src/equipamento/equipamento.entity';
import * as moment from 'moment';

@Injectable()
export class AgendarService {
  constructor(
    @InjectRepository(AgendarEntity)
    private readonly rep: Repository<AgendarEntity>,
  ) {}

  async getDados(): Promise<AgendarEntity[]> {
    const dataAtual = moment(new Date());

    return await this.rep
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.sala', 's')
      .innerJoinAndSelect('s.predio', 'p')
      .innerJoinAndSelect('a.equipamentos', 'e')
      .where(
        ':DATA BETWEEN cast(a.data_inicial as DATE) AND cast(a.data_final as DATE)',
        { DATA: dataAtual.format('YYYY-MM-DD') },
      )
      .getMany();
  }
  async getData(data: Date): Promise<AgendarEntity[]> {
    const dataConvertida = moment(data);

    if (!dataConvertida.isValid()) {
      throw new HttpException(
        { erro: 'Data inválida' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.rep
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.equipamentos', 'e')
      .innerJoinAndSelect('a.sala', 's')
      .innerJoinAndSelect('s.predio', 'p')
      .where(
        ':DATA BETWEEN cast(a.data_inicial as DATE) AND cast(a.data_final as DATE)',
        { DATA: dataConvertida.format('YYYY-MM-DD') },
      )
      .getMany();
  }

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
    dto.data_inicial = this.setDataHora(dto.data_inicial);
    dto.data_final = this.setDataHora(dto.data_final);
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

  async checkDate(dto: CriarAgendardto): Promise<void> {
    if (moment(dto.data_inicial).isAfter(dto.data_final)) {
      throw new HttpException(
        {
          erro: 'Data inválida: data final deverá ser maior que à data inicial!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkAgenda(dto: CriarAgendardto, Id?: number): Promise<void> {
    const betweenDataInicial =
      ':DATA_INICIAL BETWEEN agendamento.data_inicial AND  agendamento.data_final';
    const betweenDataFianl =
      ':DATA_fINAL BETWEEN agendamento.data_inicial AND  agendamento.data_final';
    let query = this.rep
      .createQueryBuilder('agendamento')
      .where(`(${betweenDataInicial} OR ${betweenDataFianl})`, {
        DATA_INICIAL: moment(dto.data_inicial).format(),
        DATA_fINAL: moment(dto.data_final).format(),
      })
      .andWhere('agendamento.sala_id=:SALAID', { SALAID: dto.sala_id });

    if (Id) {
      query = query.andWhere('agendamento.id<>:ID', { ID: Id });
    }
    const result = await query.getOne();
    if (result) {
      throw new HttpException(
        { erro: 'Sala já esta agendada!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private setDataHora(dataHora: Date): Date {
    const novaDataHora = new Date(dataHora);
    //novaDataHora.setHours(novaDataHora.getHours() - 3);
    return novaDataHora;
  }

  private converteHoraParaConsulta(dataHora: Date): string {
    dataHora.setHours(dataHora.getHours() - 3);
    return '';
  }
}
