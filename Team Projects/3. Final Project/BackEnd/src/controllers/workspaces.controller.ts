import { CoordinatesDTO } from '../dtos/workspace/coordinats.dto';
import { CreateWorkspaceDTO } from '../dtos/workspace/create-workspace.dto';
import {
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    Body,
    Query,
    Param,
    NotFoundException,
    Put,
    Delete,
    UseGuards,
    Patch,
    BadRequestException
} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/roles.guard";
import { BlacklistGuard } from "src/auth/blacklist.guard";
import { WorkspacesService } from "src/services/workspaces.service";
import { Workspace } from "src/models/workspace.entity";
import { User } from 'src/models/user.entity';

@Controller('workspaces')
export class WorkspacesController {
    constructor(
        private readonly workspacesService: WorkspacesService
    ) { }

    @Get()
    async allWorkspaces(): Promise<Workspace[]> {
        return await this.workspacesService.allWorkspaces();
    }



    @Post()
    async createWorkspace(@Body() newWorkspace: CreateWorkspaceDTO): Promise<Workspace> {
        return await this.workspacesService.createWorkspace(newWorkspace);
    }

    // Getting single workspace by COUNTRY variant
    @Get(':countryName')
    async getWorkspaceByCountry(@Param('countryName') workspaceCountry: string): Promise<Workspace> {
        return await this.workspacesService.getWorkspaceByCountry(workspaceCountry);
    }

    @Get(':countryName/matrixNextWeek')
    async getWorkspaceNextWeekMatrix(@Param('countryName') workspaceCountry: string): Promise<User[]> {
        // return await this.workspacesService.getWorkspaceEmployees(workspaceCountry);
        return await this.workspacesService.generateNextWeekPeople(workspaceCountry);
    }

    @Get(':countryName/employees')
    async getWorkspaceEmployees(@Param('countryName') workspaceCountry: string): Promise<User[]> {
        return await this.workspacesService.getWorkspaceEmployees(workspaceCountry);
        //return await this.workspacesService.generateNextWeekPeople(workspaceCountry);
    }

    @Put(':countryName/employeesInOffice')
    async populateCurrWeekMatrix(@Param('countryName') workspaceCountry: string) {
        return await this.workspacesService.populateCurrWeekMatrix(workspaceCountry)
    };

    @Get(':countryName/employeesInOffice')
    async employeesInOffice(@Param('countryName') workspaceCountry: string): Promise<User[]> {
        return await this.workspacesService.employeesInOffice(workspaceCountry);
    }


    @Put(':countryName')
    async assignSingleDesk(/*@Body() coordinates: CoordinatesDTO,/*/ @Param('countryName') workspaceCountry: string): Promise<Workspace> {
        // return await this.workspacesService.assignSingleDesk(coordinates, workspaceCountry);
        return await this.workspacesService.populateNextWeekMatrix(workspaceCountry);
        // return await this.workspacesService.clearNextWeekMatrix(workspaceCountry);
    }

    @Put(':countryName/employeesNextWeek')
    async populateNextWeekMatrix(/*@Body() coordinates: CoordinatesDTO,*/ @Param('countryName') workspaceCountry: string): Promise<Workspace> {
        //  return await this.workspacesService.assignSingleDesk(coordinates,workspaceCountry);
        return await this.workspacesService.swapMatrix(workspaceCountry);
        // return await this.workspacesService.clearNextWeekMatrix(workspaceCountry);
    }

    @Put(':countryName/:userId')
    async placeEmployee(@Body() coordinates: CoordinatesDTO,
        @Param('countryName') workspaceCountry: string, @Param('userId') userId: string): Promise<Workspace> {
        return await this.workspacesService.placeEmployee(coordinates, workspaceCountry, +userId);
    }

    @Delete(':countryName')
    async removeSingleDesk(@Body() coordinates: CoordinatesDTO, @Param('countryName') workspaceCountry: string): Promise<Workspace> {
        return await this.workspacesService.removeSingleDesk(coordinates, workspaceCountry);
    }

    // Getting single workspace by ID variant

    // @Get(':id')
    // async getSingleWorkspace(@Param('id') workspaceId: string): Promise<Workspace> {
    //     return await this.workspacesService.getSingleWorkspace(+workspaceId);
    // }

    // @Put(':id')
    // async assignSingleDesk(@Body() coordinates: CoordinatesDTO, @Param('id') workspaceId: string): Promise<Workspace> {
    //     return await this.workspacesService.assignSingleDesk(coordinates, +workspaceId);
    // }

    // @Delete(':id')
    // async removeSingleDesk(@Body() coordinates: CoordinatesDTO, @Param('id') workspaceId: string): Promise<Workspace> {
    //     return await this.workspacesService.removeSingleDesk(coordinates, +workspaceId);
    // }



}