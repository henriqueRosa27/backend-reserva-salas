import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sala')
export class SalasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'andar' })
  andar: string;

  @Column({ name: 'equipamentos' })
  equipamentos: string;

  // @Column({name:'acessibilidade'})
  //acessibilidade: boolean;

  // @Column({name: 'predio'})
  //predio: string;
  @Column({ name: 'predio_id' })
  predio_id: number;

  @Column({ name: 'status' })
  status_sala: boolean;

  @Column({ name: 'intervalo' })
  intervalo: string;

  @Column({ name: 'salas_especiais' })
  salas_especiais: string;

  @Column({ name: 'capacidade' })
  capacidade: number;
}
