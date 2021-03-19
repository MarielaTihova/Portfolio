
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

import { Cron } from "@nestjs/schedule";
import { CountriesService } from "src/services/countries.service";
import { CovidDataService } from "src/services/covid-data.service";
import { CovidData } from "src/models/covidData.entity";


const url = 'https://coronavirus-19-api.herokuapp.com/countries';

@Controller('covidData')
export class CovidDataController {
    constructor(
        private readonly covidDataService: CovidDataService,
    ) { }

    @Get()
    async getData(): Promise<CovidData[]> {
        return await this.covidDataService.getData();
    }

    @Get(':countryName')
    async getDataPerCountry(@Param('countryName') countryName: string): Promise<CovidData[]> {
        return await this.covidDataService.getDataPerCountry(countryName);
    }


    @Get(':countryName/ratio')
    async getRatioPerCountry(@Param('countryName') countryName: string): Promise<number> {
        return await this.covidDataService.getRatioPerCountry(countryName);
        // percentage of people allowed to return to the office for this ratio
        // return await this.covidDataService.percentageOfEmployeesAllowed(countryName);
    }



}