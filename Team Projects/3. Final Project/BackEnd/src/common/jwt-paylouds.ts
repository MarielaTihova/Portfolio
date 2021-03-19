import { Book } from '../models/book.entity';
import { Review } from 'src/models/review.entity';
import { WorkStatus } from 'src/models/enums/work-status';
import { Vacation } from 'src/models/vacation.entity';
import { Country } from 'src/models/country.entity';
import { Project } from 'src/models/project.entity';
export class JWTPayload {
  id: number;
  username: string;
  personalName: string;

  role: string;

  avatar: string;

  registerDate: Date;

  email: string;
  country: Country;
  workStatus: WorkStatus;
  vacations: Vacation[];
  project: Project
  // booksBorrowed: Book[];
  // bookReviews: Review[];
}