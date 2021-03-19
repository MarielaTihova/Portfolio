import { AdminService } from './admin.service';
import { Workspace } from './../models/workspace.entity';
import { Token } from './../models/token.entity';
import { JwtStrategy } from './strategy/jwt-strategy';
import { Module, HttpService, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransformService } from './transform.service';
import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';
import { Book } from 'src/models/book.entity';
import { Review } from 'src/models/review.entity';
import { Rating } from 'src/models/rating.entity';
import { ReviewReaction } from 'src/models/review-reaction.entity';
// import { BooksService } from './books.service';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'src/constant/secret';
import { AuthService } from './auth.service';
// import { ReviewReactionsService } from './review-reactions.service';
import { CovidData } from 'src/models/covidData.entity';
import { TasksService } from 'src/repeatingProcess';
import { Country } from 'src/models/country.entity';
import { WorkspacesService } from './workspaces.service';
import { CountriesService } from './countries.service';
import { CovidDataService } from './covid-data.service';
import { ProjectsService } from './projects.service';
import { Project } from 'src/models/project.entity';
import { Vacation } from 'src/models/vacation.entity';
import { VacationsService } from './vacations-service';




@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Review,
    Rating, ReviewReaction, Token,
    CovidData, Country, Workspace,
    Project, Vacation],
  ),
    PassportModule,
    HttpModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: '7d',
    }
  })],
  providers: [UsersService, TransformService, AuthService,
    JwtStrategy, TasksService, AdminService,
    WorkspacesService, CountriesService,
    CovidDataService, ProjectsService,
    VacationsService],

  exports: [UsersService, TransformService, AuthService,
    TasksService, AdminService, WorkspacesService,
    CountriesService, CovidDataService, ProjectsService,
    VacationsService] // AuthService
})
export class ServicesModule { }
