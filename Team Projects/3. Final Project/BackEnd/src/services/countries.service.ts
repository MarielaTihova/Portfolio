import { Workspace } from './../models/workspace.entity';
import { UserId } from 'src/auth/user-id.decorator';
import { Injectable, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TransformService } from "./transform.service";
import { UserDTO } from "src/dtos/users/user.dto";
import { ReviewDTO } from "src/dtos/reviews/review.dto";
import { RegisterUserDTO } from "src/dtos/users/register-user.dto";
import * as bcrypt from "bcrypt"
import { Country } from 'src/models/country.entity';

@Injectable()
export class CountriesService {
    constructor(
        private readonly transformer: TransformService,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(Country) private readonly countryRepository: Repository<Country>,
        @InjectRepository(Workspace) private readonly workspaceRepository: Repository<Workspace>,
    ) { }


    async getAllCountries(): Promise<Country[]> {
        return await this.countryRepository.find({ relations: ['projects', 'employees', 'workspace'] });
    }

    async getCountryByName(countryName: string): Promise<Country> {
        return await this.countryRepository.findOne({
            where: {
                name: countryName
            },
            relations: ['projects', 'employees', 'employees.project', 'workspace', 'employees.country']
        });
    }


    async getCountryEmployees(countryName: string): Promise<UserDTO[]> {

        const country = await this.getCountryByName(countryName);
        return country.employees.filter(user => user.isDeleted === false)
            .map(this.transformer.toUserDTO);
    }

    async noProjectCountyEmployees(countryName: string): Promise<UserDTO[]> {


        const people = await this.getCountryEmployees(countryName);

        return people.filter((p) => !p.project)
    }



}


