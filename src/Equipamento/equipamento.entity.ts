import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('equipamentos')
export class EquipamentoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nome_equipamentos' })
    nome_equipamentos: string;

    @Column({ name: 'quantidade' })
    quantidade: number;

    @Column({ name: 'status' })
    status: boolean;
}