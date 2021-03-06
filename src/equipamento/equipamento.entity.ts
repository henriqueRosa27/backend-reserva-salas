import { AgendarEntity } from 'src/agendar/agendar.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('equipamento')
export class EquipamentoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome_equipamento' })
  nome: string;

  @Column({ name: 'quantidade' })
  quantidade: number;

  @Column({ name: 'status' })
  status: boolean;

  @ManyToMany(() => AgendarEntity, (agendamentos) => agendamentos.equipamentos)
  @JoinTable({
    name: 'agendamento_equipamento',
    joinColumn: { name: 'equipamento_id' },
    inverseJoinColumn: { name: 'agendamento_id' },
  })
  agendamentos: AgendarEntity[];
}
