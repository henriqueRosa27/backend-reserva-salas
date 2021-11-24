import { AgendarEntity } from 'src/agendar/agendar.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('equipamentos')
export class EquipamentoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome_equipamentos' })
  nome_equipamentos: string;

  @Column({ name: 'quantidade' })
  quantidade: number;

  @Column({ name: 'status' })
  status: boolean;

  @ManyToMany(() => AgendarEntity, (agendamentos) => agendamentos.equipamentos)
  @JoinTable({
    name: 'agendamento_equipamento',
    joinColumn: { name: 'agendamento_id' },
    inverseJoinColumn: { name: 'equipamento_id' },
  })
  agendamentos: AgendarEntity[];
}
