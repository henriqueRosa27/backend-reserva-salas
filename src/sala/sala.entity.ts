import { AgendarEntity } from 'src/agendar/agendar.entity';
import { PredioEntity } from 'src/predio/predio.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('sala')
export class SalaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'inicio_intervalo' })
  intervalo_inicio: string;

  @Column({ name: 'status' })
  status: boolean;

  @Column({ name: 'predio_id' })
  predio_id: number;

  @Column({ name: 'fim_intervalo' })
  intervalo_fim: string;

  @Column({ name: 'equipamentos' })
  equipamentos: string;

  @Column({ name: 'salas_especiais' })
  salas_especiais: string;

  @Column({ name: 'andar' })
  andar: number;

  @Column({ name: 'capacidade' })
  capacidade: number;

  @Column({ name: 'caracteristicas' })
  caracteristicas: string;

  @OneToMany(() => AgendarEntity, (agendar) => agendar.sala)
  agendas: AgendarEntity[];

  @ManyToOne(() => PredioEntity, (predio) => predio.salas)
  @JoinColumn({ name: 'predio_id' })
  predio: PredioEntity;
}
