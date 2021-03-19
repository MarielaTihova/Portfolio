import { UserRole } from './enums/user-role';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToMany, ManyToOne } from "typeorm";
import { Book } from "./book.entity";
import { ReviewReaction } from "./review-reaction.entity";
import { Rating } from "./rating.entity";
import { Review } from "./review.entity";
import { WorkStatus } from './enums/work-status';
import { Project } from './project.entity';
import { Country } from './country.entity';
import { Vacation } from './vacation.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    personalName: string;

    @Column({ nullable: false, type: 'text', /*length: Between(5, 15) */ })
    password: string;

    @Column({ name: 'email' })
    email!: string;

    @ManyToOne(() => Country, country => country.employees)
    country: Country;

    @CreateDateColumn()
    registerDate: Date  // date of registering

    @Column({ type: 'enum', enum: WorkStatus, default: WorkStatus.Home })
    workStatus: WorkStatus;

    @ManyToOne(() => Project, project => project.members, { nullable: true })
    project: Project;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.Basic })

    role: UserRole;

    @Column({ nullable: true })
    banEndDate: Date;

    //@Column({ default: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-kaQX-JRUirM%2FVajwSpRbPEI%2FAAAAAAAAYGU%2F2SINxtyiZrQ%2Fs1600%2FClassDojo%252Bmonster%252B21.png&f=1&nofb=1" })
    @Column()
    avatar: string;

    @OneToMany(() => Vacation, vacation => vacation.user)
    vacations: Vacation[];

    // @OneToMany(() => Book, book => book.borrower)
    // booksBorrowed: Book[]


    // @OneToMany(() => ReviewReaction, reaction => reaction.madeBy)
    // bookVotes: ReviewReaction[];

    // @OneToMany(() => Rating, rating => rating.madeBy)
    // bookRatings: Rating[];

    // @OneToMany(() => Review, review => review.madeBy)
    // bookReviews: Review[];



    // @ManyToMany(() => Book, book => book.wasBorrowedBy)
    // booksBorrowedHistory: Book[];

}