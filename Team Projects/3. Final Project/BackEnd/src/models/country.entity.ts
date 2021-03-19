import { Workspace } from './workspace.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, ManyToMany, JoinTable, PrimaryColumn, OneToOne } from "typeorm"
import { Project } from "./project.entity";
import { User } from "./user.entity";


@Entity('countries')
export class Country {

    @PrimaryColumn()
    name: string;
    @OneToMany(() => Project, project => project.location)
    projects: Project[];

    @OneToMany(() => User, user => user.country)

    employees: User[];

    @OneToOne(() => Workspace, workspace => workspace.country)

    workspace: Workspace;
}
