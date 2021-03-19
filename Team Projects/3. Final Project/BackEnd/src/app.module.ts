import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
// import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ControllersModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'covid19',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true
    })]
})
export class AppModule { }





// @Module({
//   imports: [ScheduleModule.forRoot(), TasksModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }
