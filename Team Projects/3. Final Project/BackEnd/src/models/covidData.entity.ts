import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"


@Entity('cases')
export class CovidData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date = new Date();
    @Column({ default: "" })
    country: string;
    @Column({ default: 0 })
    cases: number;
    @Column({ default: 0 })
    todayCases: number;
    @Column({ default: 0 })
    deaths: number;
    @Column({ default: 0 })
    todayDeaths: number;
    @Column({ default: 0 })
    recovered: number;
    @Column({ default: 0 })
    active: number;
    @Column({ default: 0 })
    critical: number;
    @Column({ default: 0 })
    casesPerOneMillion: number;
    @Column({ default: 0 })
    deathsPerOneMillion: number;
    @Column({ default: 0 })
    totalTests: number;
    @Column({ default: 0 })
    testsPerOneMillion: number;

}