import {
    Controller, Get, HttpStatus, HttpCode, Param, Post, Body, ValidationPipe, UseGuards, Delete, ParseIntPipe, Put,/*, Body, Post, Put, Param, UnauthorizedException, BadRequestException, Get*/
} from "@nestjs/common";
import { Country } from 'src/models/country.entity';
import { CountriesService } from 'src/services/countries.service';
import { ProjectsService } from "src/services/projects.service";
import { Project } from "src/models/project.entity";
import { CreateProjectDTO } from "src/dtos/projects/create-project.dto";
import { UpdateProjectDTO } from "src/dtos/projects/update-project.dto";
import { UserDTO } from "src/dtos/users/user.dto";
import { VacationsService } from "src/services/vacations-service";
import { Vacation } from "src/models/vacation.entity";


@Controller('vacations')
export class VacationsController {
    constructor(
        private readonly vacationsService: VacationsService
    ) { }


    @Get()
    async getAllVacations(): Promise<Vacation[]> {
        return await this.vacationsService.getAllVacations();
    }


    @Get(':id')
    async getVacationById(@Param('id') vacationId: string): Promise<Vacation> {
        return await this.vacationsService.getVacationById(+vacationId);
    }

    @Put(':id')
    async approveVacation(@Param('id') vacationId: string): Promise<Vacation> {
        return await this.vacationsService.approveVacation(+vacationId);
    }

    @Delete(':id')
    async rejectVacation(@Param('id') vacationId: string): Promise<Vacation> {
        return await this.vacationsService.rejectVacation(+vacationId);
    }
}