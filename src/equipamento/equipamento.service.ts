import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipamentoEntity } from './equipamento.entity';

@Injectable()
export class EquipamentoService {
  constructor(
    @InjectRepository(EquipamentoEntity)
    private readonly rep: Repository<EquipamentoEntity>,
  ) {}

  async getAll(): Promise<EquipamentoEntity[]> {
    const equipamentos = await this.rep.find({
      order: { nome: 'ASC' },
    });
    return equipamentos;
  }

  async findById(id: number): Promise<EquipamentoEntity> {
    const equipamento = await this.rep.findOne({ where: { id } });

    if (equipamento) return equipamento;

    throw new HttpException(
      { erro: 'Equipamento não existe' },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(equipamento: EquipamentoEntity): Promise<EquipamentoEntity> {
    await this.checkName(equipamento.nome);
    const entity = await this.rep.save(equipamento);

    return entity;
  }

  async altera_status(
    equipamento: EquipamentoEntity,
    id: number,
  ): Promise<EquipamentoEntity> {
    const entitySalva = await this.findById(id);

    entitySalva.status = equipamento.status;
    const entity = await this.rep.save(entitySalva);
    return entity;
  }

  async update(
    equipamento: EquipamentoEntity,
    id: number,
  ): Promise<EquipamentoEntity> {
    const entitySalva = await this.findById(id);

    entitySalva.nome = equipamento.nome;
    entitySalva.quantidade = equipamento.quantidade;
    entitySalva.status = equipamento.status;
    const entity = await this.rep.save(entitySalva);
    return entity;
  }

  async delete(id: number): Promise<null> {
    const entitySalva = await this.findById(id);

    await this.rep.remove(entitySalva);

    return null;
  }
  async checkName(nome_equi: string, id?: number): Promise<void> {
    let query = this.rep
      .createQueryBuilder('equipamento')
      .where('equipamento.nome_equipamento=:NOME', { NOME: nome_equi });
    if (id) {
      query = query.andWhere('equipamento.id<>:ID', { ID: id });
    }
    const result = await query.getOne();

    if (result) {
      throw new HttpException(
        { erro: 'Equipamento já existe!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
