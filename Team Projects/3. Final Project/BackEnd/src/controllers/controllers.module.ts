import { WorkspacesController } from './workspaces.controller';
import { Module, HttpModule } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { UsersController } from './users.controller';
// import { BooksController } from './books.controller';
import { AuthController } from './auth.controller';
// import { ReviewReactionsController } from './review-reactions.controller';
import { TasksController } from 'src/repeatingProces.controller';
import { AdminController } from './admin.controller';
import { CountriesController } from './countries.controller';
import { CovidDataController } from './covid-data.controller';
import { ProjectsController } from './projects.controller';
import { VacationsController } from './vacations.controller';


@Module({
  imports: [ServicesModule, HttpModule],
  controllers: [UsersController, AuthController,
    TasksController, AdminController,
    WorkspacesController, CountriesController,
    CovidDataController, ProjectsController,
    VacationsController]
})
export class ControllersModule { }
