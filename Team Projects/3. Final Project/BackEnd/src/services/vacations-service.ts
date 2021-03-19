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
import { Vacation } from "src/models/vacation.entity";
import { VacationStatus } from "src/models/enums/vacation-status";

@Injectable()
export class VacationsService {
    constructor(
        private readonly transformer: TransformService,
        @InjectRepository(Vacation) private readonly vacationsRepository: Repository<Vacation>

    ) { }


    async getAllVacations(): Promise<Vacation[]> {
        return await this.vacationsRepository.find({
            where: {
                isDeleted: false
            },
            relations: ['user']
        });
    }

    async getVacationById(vacationId: number): Promise<Vacation> {
        return await this.vacationsRepository.findOne({
            where: {
                id: vacationId,
                isDeleted: false
            },
            relations: ['user']
        });
    }

    async approveVacation(vacationId: number): Promise<Vacation> {
        const vacation = await this.getVacationById(vacationId);
        vacation.status = VacationStatus.Approved;

        return await this.vacationsRepository.save(vacation);
    }

    async rejectVacation(vacationId: number): Promise<Vacation> {
        const vacation = await this.getVacationById(vacationId);
        vacation.status = VacationStatus.Rejected;

        return await this.vacationsRepository.save(vacation);
    }
}
