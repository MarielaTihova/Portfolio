import {
    Controller, Get, HttpStatus, HttpCode, Param, Post, Body, ValidationPipe, UseGuards, Delete, ParseIntPipe,/*, Body, Post, Put, Param, UnauthorizedException, BadRequestException, Get*/
} from "@nestjs/common";
import { UserDTO } from "src/dtos/users/user.dto";
import { Country } from 'src/models/country.entity';
import { CountriesService } from 'src/services/countries.service';


@Controller('countries')
export class CountriesController {
    constructor(
        private readonly countriesService: CountriesService
    ) { }


    @Get()
    async getAllCountries(): Promise<Country[]> {
        return await this.countriesService.getAllCountries();
    }

    @Get(':countryName')
    async getContryById(@Param('countryName') countryName: string): Promise<Country> {
        return await this.countriesService.getCountryByName(countryName);
    }
    @Get(':countryName/employees')
    async getCountryEmployeesNoProject(@Param('countryName') countryName: string): Promise<UserDTO[]> {
        return await this.countriesService.noProjectCountyEmployees(countryName);
    }

}