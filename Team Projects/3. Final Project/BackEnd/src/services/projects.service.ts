import { Injectable, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TransformService } from "./transform.service";
import { Project } from 'src/models/project.entity';
import { CreateProjectDTO } from "src/dtos/projects/create-project.dto";
import { Workspace } from "src/models/workspace.entity";
import { UpdateProjectDTO } from "src/dtos/projects/update-project.dto";
import { Country } from "src/models/country.entity";
import { UserDTO } from "src/dtos/users/user.dto";
import { User } from "src/models/user.entity";

@Injectable()
export class ProjectsService {
    constructor(
        private readonly transformer: TransformService,
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
        @InjectRepository(Workspace) private readonly workspaceRepository: Repository<Workspace>,

        @InjectRepository(Country) private readonly countryRepository: Repository<Country>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,

    ) { }


    async getAllProjects(): Promise<Project[]> {
        return await this.projectRepository.find({
            where: {
                isDeleted: false
            },
            relations: ['location', 'members']
        });
    }

    async getProjectById(projectId: number): Promise<Project> {
        return await this.projectRepository.findOne({
            where: {
                id: projectId
            },
            relations: ['location', 'members', 'members.country']
        });
    }

    async getProjectByCountry(country: string): Promise<Project> {
        return await this.projectRepository.findOne({
            where: {
                location: country
            },
            relations: ['location', 'members', 'members.country']
        });
    }

    async singleProjectEmployees(projectId: number): Promise<UserDTO[]> {
        const project = await this.getProjectById(projectId);

        return project.members.filter(user => user.isDeleted === false)
            .map(this.transformer.toUserDTO);

    }

    async unassignEmployee(projectId: number, employeeId: number) {
        const projectEmployees = await this.singleProjectEmployees(projectId);
        const employeeToUnassign = projectEmployees.find(empl => empl.id === employeeId);
        if (!employeeToUnassign) {
            throw new BadRequestException(`You can only unassigned employees that have been assigned to this project!`);
        }

        // employeeToUnassign.project = null;
        const user = await this.usersRepository.findOne({
            where: {
                id: employeeToUnassign.id
            },
            relations: ['project']
        });
        user.project = null;
        return this.usersRepository.save(user);
    }


    async createNewProject(project: CreateProjectDTO): Promise<Project> {
        // in Workspaces- find a workspace with countryName=project.location
        const workspaceWithThisCountry = await this.workspaceRepository.findOne({
            where: {
                country: project.location
            },
            relations: ['country']
        });

        if (!workspaceWithThisCountry) {
            //  console.log('In Bad Request');
            throw new BadRequestException(`Projects are only to be created in countries where you have an office workspace!`);
        }

        //console.log('workspace with this country', workspaceWithThisCountry);

        const existingProject = await this.projectRepository.findOne({
            where: {
                name: project.name
            }
        })

        if (existingProject) {
            throw new BadRequestException(`Project with name '${project.name}' already exists`);
        }
        const projectToCreate = await this.projectRepository.create();
        projectToCreate.name = project.name;
        projectToCreate.location = workspaceWithThisCountry.country;
        return await this.projectRepository.save(projectToCreate);
    }

    async deleteProject(projectId: number): Promise<Project> {
        const projectToDelete = await this.projectRepository.findOne({ id: projectId });
        if (!projectToDelete) {
            throw new BadRequestException(`Project with id ${projectId} does not exist!`);
        }

        projectToDelete.isDeleted = true;
        return await this.projectRepository.save(projectToDelete);

    }

    /*
    1. Change Project Name function
    2. Change Project Country function
    3. Change participants from here (or users/assignProject)
    */
    async updateProjectFields(projectId: number, newProject: UpdateProjectDTO): Promise<Project> {

        const projectToUpdate = await this.projectRepository.findOne({
            where: {
                id: projectId,
                isDeleted: false,
            },
            relations: ['location']
        });
        if (!projectToUpdate) {
            throw new BadRequestException(`Project with id ${projectId} does not exist!`);
        }
        if (newProject.name === projectToUpdate.name && newProject.location === projectToUpdate.location.name) {
            throw new BadRequestException('To update the project, please provide different from the current values')
        }

        const country1 = await this.countryRepository.findOne({
            where: {
                name: newProject.location
            },
        })

        // if (!country) {
        //     throw new BadRequestException(`Country with name ${newProject.location} does not exist!`);
        // }

        // const wsCountry:Country={

        // }
        const country = await this.workspaceRepository.findOne({

            where: {
                country: country1
            },
        })

        if (!country) {
            throw new BadRequestException(`Country with name ${newProject.location} does not exist!`);
        }


        projectToUpdate.name = newProject.name;
        projectToUpdate.location.name = newProject.location;
        return await this.projectRepository.save(projectToUpdate);
    }
}
