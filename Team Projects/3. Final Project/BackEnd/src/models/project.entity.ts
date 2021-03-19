import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { User } from "./user.entity";
import { Country } from "./country.entity";

@Entity('projects')
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ default: false })
    isDeleted: boolean;

    @OneToMany(() => User, user => user.project)
    members: User[];

    @ManyToOne(() => Country, country => country.projects)
    location: Country;
}