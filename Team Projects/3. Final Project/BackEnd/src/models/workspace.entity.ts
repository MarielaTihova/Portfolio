import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, Column, OneToMany, ManyToMany, JoinTable, PrimaryColumn, JoinColumn } from "typeorm"
import { Country } from "./country.entity";


@Entity('workspaces')
export class Workspace {

    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @OneToOne(() => Country, country => country.workspace)
    country: Country;

    @Column()
    numberOfDesks: number;

    @Column({ type: 'text' })
    matrix: string;

    @Column({ type: 'text' })
    nextWeekPlanningMatrix: string;

    @Column()
    width: number;

    @Column()
    height: number;

}
