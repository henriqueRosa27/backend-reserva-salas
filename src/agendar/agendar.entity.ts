import { EquipamentoEntity } from 'src/equipamento/equipamento.entity';
import { SalaEntity } from 'src/sala/sala.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('agendamento')
export class AgendarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'data_inicial' })
  data_inicial: Date;

  @Column({ name: 'data_final' })
  data_final: Date;

  @Column({ name: 'sala_id' })
  sala_id: number;

  @Column({ name: 'responsavel' })
  responsavel: string;

  @Column({ name: 'observacao' })
  observacao: string;

  @Column({ name: 'status' })
  status: boolean;

  @Column({ name: 'nome_evento' })
  nome_evento: string;

  @Column({ name: 'quantidade_pessoas' })
  quantidade_pessoas: number;

  @ManyToMany(
    () => EquipamentoEntity,
    (equipamentos) => equipamentos.agendamentos,
  )
  @JoinTable({
    name: 'agendamento_equipamento',
    joinColumn: { name: 'agendamento_id' },
    inverseJoinColumn: { name: 'equipamento_id' },
  })
  equipamentos: EquipamentoEntity[];

  @ManyToOne(() => SalaEntity, (sala) => sala.agendas)
  @JoinColumn({ name: 'sala_id' })
  sala: SalaEntity;
}
