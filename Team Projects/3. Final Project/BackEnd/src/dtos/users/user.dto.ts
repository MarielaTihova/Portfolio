import { Book } from '../../models/book.entity';
import { Review } from 'src/models/review.entity';
import { WorkStatus } from 'src/models/enums/work-status';
import { Project } from 'src/models/project.entity';
export class UserDTO {
    id: number;
    username: string;
    personalName: string;
    isDeleted: boolean;
    avatar: string;
    registerDate: Date;

    country: string;

    email: string;
    workStatus: string;
    project: Project;
    // booksBorrowed: Book[];
    // bookReviews: Review[];

}