import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { User } from "./user.entity";
import { Country } from "./country.entity";
import { VacationStatus } from "./enums/vacation-status";

@Entity('vacations')
export class Vacation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    startDate: Date;

    @Column({ nullable: false })
    endDate: Date;

    @ManyToOne(() => User, user => user.vacations)
    user: User;

    @Column({ type: 'enum', enum: VacationStatus, default: VacationStatus.Pending })

    status: VacationStatus;

    @Column({ default: false })
    isDeleted: boolean;
}