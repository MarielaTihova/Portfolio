
// import { UserRole } from './../models/enums/user-role';
// import { RolesGuard } from './../auth/roles.guard';

import {
    Controller, Get, HttpModule, HttpService, HttpStatus, HttpCode, Param, Post, Body, ValidationPipe, UseGuards, Delete, ParseIntPipe, Query,/*, Body, Post, Put, Param, UnauthorizedException, BadRequestException, Get*/
} from "@nestjs/common";
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs'
import { UsersService } from "src/services/users.service";
import { ReviewDTO } from "src/dtos/reviews/review.dto";
import { UserDTO } from "src/dtos/users/user.dto";
import { RegisterUserDTO } from "src/dtos/users/register-user.dto";
import { AuthGuard } from '@nestjs/passport';
import { UserId } from 'src/auth/user-id.decorator';
import { BlacklistGuard } from 'src/auth/blacklist.guard';
import { TableExclusion } from "typeorm";
import { TasksService } from "./repeatingProcess";
import { CovidData } from "./models/covidData.entity";
import { Cron } from "@nestjs/schedule";


const url = 'https://coronavirus-19-api.herokuapp.com/countries';

@Controller('api')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private httpService: HttpService,
    ) { }

    // ADMIN
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    // @Get()
    // async getAllData(): Promise<CovidData[]> {
    //     return await this.tasksService.getAllData();
    // }

    // @Get('country')
    // async getOneCountry(): Promise<CovidData> {
    //     // const url = 'https://coronavirus-19-api.herokuapp.com/countries/Bulgaria';
    //     // const data = fetch(url)
    //     //     .then(r => r.json());
    //     // console.log(data);
    //     // return await data;

    //     try {
    //         const result = await fetch(url);
    //         console.log("result ", result);
    //         const jsonResult = await result.json();
    //         return jsonResult;

    //         // trendingFill(jsonResult);
    //     } catch (er) {
    //         console.log(er.message);
    //     }

    // }
    // @Cron('10 14 19 * * *')
    // ALL DATA FROM API
    @Get()
    async allDailyData() {
        const response = await this.httpService.get(url).toPromise();
        console.log(response.data);
        return response.data;
    }

    /*   @Get('tableData')
       async getData(): Promise<CovidData[]> {
           return await this.tasksService.getData();
       }
   
       @Get('tableData/:countryName')
       async getDataPerCountry(@Param('countryName') countryName: string): Promise<CovidData[]> {
           return await this.tasksService.getDataPerCountry(countryName);
       }
   */
    // DATA FOR A PARTICULAR COUNTRY
    /*@Get(':countryName')
    async singleCountryDailyData(@Param('countryName') country: string) {
        const response = await this.httpService.get(`${url}/${country}`).toPromise();
        console.log(response.data);
        return response.data;
    }*/
    @Post()
    // @Cron('30 12 19 * * *')
    async insertData() {
        const data = await this.allDailyData();
        //console.log(data);
        return await this.tasksService.addData(data);
    }

    // @Get()
    // async findAll(): Promise<Observable<AxiosResponse<any>>> {
    //     const result = await this.httpService.get(url);
    //     console.log("result", result);
    //     return await this.httpService.get(url);

    // }

    // PUBLIC
    // @Post()
    // async registerUser(@Body(new ValidationPipe({ whitelist: true })) userDto: RegisterUserDTO): Promise<UserDTO> {
    //     return await this.tasksService.registerUser(userDto);
    // }

    // ADMIN
    // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    // @UseGuards(AuthGuard('jwt'))
    // @Get(':id')
    // async getUserById(@Param('id') id: string): Promise<UserDTO> {
    //     return this.usersService.getUserById(+id);
    // }

    // // ADMIN
    // // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    // @Get(':id/reviews')
    // @HttpCode(HttpStatus.FOUND)
    // async readUserReviews(@Param('id') id: string): Promise<ReviewDTO[]> {
    //     return await this.usersService.readUserReviews(+id)
    // }


    // // ADMIN
    // // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    // @Get(':id/reviews/:reviewsId')  // I think that should be :id/userreviews/rreviewsID
    // @HttpCode(HttpStatus.FOUND)
    // async getBookReviewById(@Param('id') bookId: string,
    //     @Param('reviewId') reviewId: string): Promise<ReviewDTO> {
    //     return await this.usersService.getUserReviewById(+bookId, +reviewId);
    // }


    // // ADMIN 
    // // @UseGuards(AuthGuard('jwt'), new RolesGuard(UserRole.Admin))
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    // @Delete(':id')
    // public async deleteUser(@Param('id') userId: string) {
    //     return await this.usersService.deleteUserById(+userId);
    // }

    // @Post(':id/ban')
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    // async banUser(@Param('id', ParseIntPipe) userId: number, @Body(new ValidationPipe({ whitelist: true })) banDTO: any) {
    //     return await this.usersService.banUser(userId, banDTO.period)
    // }

}