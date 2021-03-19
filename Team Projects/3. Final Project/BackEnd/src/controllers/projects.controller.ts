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


@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService
    ) { }


    @Get()
    async getAllProjects(): Promise<Project[]> {
        return await this.projectsService.getAllProjects();
    }

    @Get(':id')
    async getProjectById(@Param('id') projectId: string): Promise<Project> {
        return await this.projectsService.getProjectById(+projectId);
    }

    @Get(':id/employees')
    async singleProjectEmployees(@Param('id') projectId: string): Promise<UserDTO[]> {
        return await this.projectsService.singleProjectEmployees(+projectId);
    }

    @Delete(':id/employees/:employeeId')
    async unassignEmployee(@Param('id') projectId: string, @Param('employeeId') employeeId: string) {
        return await this.projectsService.unassignEmployee(+projectId, +employeeId);
    }

    @Post()
    async createNewProject(@Body() project: CreateProjectDTO): Promise<Project> {
        return await this.projectsService.createNewProject(project);
    }

    @Delete(':id')
    async deleteProject(@Param('id') projectId: string): Promise<Project> {
        return await this.projectsService.deleteProject(+projectId);
    }

    @Put(':id')
    async updateProjectFields(@Param('id') projectId: string, @Body() newProject: UpdateProjectDTO): Promise<Project> {
        return await this.projectsService.updateProjectFields(+projectId, newProject);
    }
}