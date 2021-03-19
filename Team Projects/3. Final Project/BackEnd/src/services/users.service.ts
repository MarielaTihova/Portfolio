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
import { WorkspacesService } from './workspaces.service';
import { Vacation } from 'src/models/vacation.entity';
import { CreateVacationDTO } from 'src/dtos/vacations/create-vacation.dto';
import * as moment from 'moment';
import { ProjectIdDTO } from 'src/dtos/projects/project-id.dto';
import { Project } from 'src/models/project.entity';

@Injectable()
export class UsersService {
    constructor(
        private readonly transformer: TransformService,
        private readonly workspaceService: WorkspacesService,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(Country) private readonly countryRepository: Repository<Country>,
        @InjectRepository(Workspace) private readonly workspaceRepository: Repository<Workspace>,
        @InjectRepository(Vacation) private readonly vacationRepository: Repository<Vacation>,
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>

    ) { }

    async getAllUsers(): Promise<UserDTO[]> {

        const workspace = await this.workspaceRepository.findOne({ where: { id: 2 } });
        // workspace.matrix.split('],[');
        /* let array = [];
         let matrix1 = workspace.matrix.split(',');
         for (let i = 0; i < matrix1.length; i++) {
             array.push(matrix1[i]);
         }
         //  console.log("array ", array);
         //  console.log("workspace ", workspace.matrix);
         //  console.log("workspace splitted ", workspace.matrix.split(', '));
         const matrix2 = workspace.matrix.split(', ');
 
         let workspaceMat = [];
 
         for (let i = 0; i < matrix2.length; i++) {
             console.log(matrix2[i], i);
             workspaceMat.push(matrix2[i]);
             // workspaceMat.push(matrix2[i]);
         }
         console.log("MATRIX ", workspaceMat);*/

        // Вариант 2- [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0]
        /*
        От горния формат от базата:
        -> JSON.parse на всеки масив- oт '[1,0,1,1]' в [1,0,1,1]
        -> матрица- записваме я в базата --> [[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,1,0,0]]
        */
        /* const dbMatrix = workspace.matrix;
         const matrix2 = dbMatrix.split(', ');
         let mat = [];
 
         for (let i = 0; i < matrix2.length; i++) {
             console.log(matrix2[i], i);
             let row = JSON.parse(matrix2[i]);
             mat.push(row);
             //workspaceMat.push(matrix2[i]);
             // workspaceMat.push(matrix2[i]);
         }
 
         console.log(matrix2);
         console.log("MAT ", mat);
         console.log("MAT el", mat[0]);
 
 
         const record3 = await this.workspaceRepository.findOne({ where: { id: 3 } });
 
         record3.matrix = JSON.stringify(mat);
         this.workspaceRepository.save(record3);*/



        //  console.log(matrix2[0]);
        // console.log("workspace", JSON.stringify(JSON.parse(workspace.planningMatrix)));

        //DB string-> real matrix (array of arrays)
        // parsed- the matrix we can operate on
        const parsed = JSON.parse(workspace.matrix);
        //console.log(parsed);
        //  console.log("typeof ", typeof (parsed));

        // From real matrix to stringified matrix in DB (storing matrix in DB as string)
        const record3 = await this.workspaceRepository.findOne({ where: { id: 3 } });
        parsed[0][0] = 5;
        //changedEl=5;
        const record3Mat = parsed;
        record3.matrix = JSON.stringify(record3Mat);
        this.workspaceRepository.save(record3);

        // for (let i = 0; i < parsed.length; i++) {
        //     console.log(parsed[i]);
        //     console.log("el ", parsed[i][1]);
        // }

        //const width = 10;
        //const height = 20;

        // let matrix = [];
        // let rows = 4;
        // let cols = 5;

        // for (let row = 0; row < rows; row += 1) {
        //     matrix[row] = [];



        //     for (let col = 0; col < cols; col += 1) {
        //         matrix[row][col] = 0;
        //     }
        // }

        // console.log(matrix);
        // const record1 = await this.workspaceRepository.findOne({ where: { id: 2 } });
        // record1.matrix = JSON.stringify(matrix);
        // this.workspaceRepository.save(record1);




        const users = await this.usersRepository.find({
            where: { isDeleted: false },
            order: {
                //name: "ASC",
                id: "ASC"
            },
            relations: ['country', 'project', 'vacations']
        });

        return users.filter(user => user.isDeleted === false)
            .map(this.transformer.toUserDTO);
    }

    async getUserById(id: number): Promise<UserDTO> {
        const user = await this.usersRepository.findOne(id, {
            where: { isDeleted: false },
            relations: ['country', 'project', 'vacations']

        });
        if (!user) {
            throw new BadRequestException(`User with id ${id} does not exist!`);
        }
        return this.transformer.toUserDTO(user);
    }

    async assignProjectToUser(userId: number, projectId: ProjectIdDTO): Promise<User> {
        const user = await this.getUserEntityById(userId);
        const projectToAssign = await this.projectRepository.findOne({
            where: {
                id: projectId.id
            }
        })
        console.log(user)
        user.project = projectToAssign;

        return await this.usersRepository.save(user);

    }


    async userVacations(userId: number): Promise<Vacation[]> {
        const userFound = await this.getUserById(userId);
        const userVacations = await this.vacationRepository.find({
            where: {
                user: userFound,
                isDeleted: false
            },
            relations: ['user']
        });

        return userVacations;
    }


    async createNewVacation(userId: number, vacationInfo: CreateVacationDTO): Promise<Vacation> {
        const userFound = await this.usersRepository.findOne({
            where: {
                id: userId
            }
        });
        const userVacations = await this.userVacations(userId);

        if (!this.isVacationValid(vacationInfo, userVacations)) {
            throw new BadRequestException('The date is not valid')
        }


        const vacationToCreate = this.vacationRepository.create();

        const valideStartDate = new Date(vacationInfo.startDate)
        valideStartDate.setHours(1, 0, 0, 0)
        vacationToCreate.startDate = valideStartDate;

        const validateEndDate = new Date(vacationInfo.endDate);

        validateEndDate.setHours(1, 0, 0, 0)
        vacationToCreate.endDate = validateEndDate
        vacationToCreate.user = userFound;

        return await this.vacationRepository.save(vacationToCreate);
    }


    async deleteVacation(vacationId: number, userId: number): Promise<Vacation> {
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            },
            relations: ['vacations']
        });



        const vacationFound = await this.vacationRepository.findOne({
            where: {
                id: vacationId
            }
        })

        if (!user.vacations.find(v => v.id == vacationFound.id)) {
            throw new BadRequestException(`Vacation with id ${vacationId} does not belong to user with username ${user.username}`);
        }
        vacationFound.isDeleted = true;
        return await this.vacationRepository.save(vacationFound);
    }
    async registerUser(userDto: RegisterUserDTO): Promise<UserDTO> {
        const countryFound = await this.countryRepository.findOne({ where: { name: userDto.country } });
        if (!countryFound) {
            throw new BadRequestException(`Non-existing country!`);
        }

        // const userToInsert: User = { ...userDto };


        const existingUsername = await this.usersRepository.findOne({ where: { username: userDto.username } });
        if (existingUsername !== undefined) {
            throw new BadRequestException(`Username ${userDto.username} is already taken!`);
        }
        // add validation for password 

        //const user = this.usersRepository.create(userDto);
        const { country, ...newUser } = userDto;
        const user = this.usersRepository.create(newUser);
        user.country = countryFound;

        user.password = await bcrypt.hash(user.password, 10)

        const created = await this.usersRepository.save(user);

        return this.transformer.toUserDTO(created);
    }



    // public async readUserReviews(id: number): Promise<ReviewDTO[]> {
    //     if (!this.usersRepository.find({ where: { id: id, isDeleted: false } })) {
    //         throw new BadRequestException(`User with id ${id} does not exist!`);
    //     }

    //     const foundUser = await this.usersRepository.findOne({ id: id, isDeleted: false }, {
    //         relations: ['booksBorrowed', 'bookVotes', 'bookRatings',
    //             'bookVotes.reviewVotedFor', 'bookRatings.bookName',
    //             'bookReviews', 'bookReviews.bookName', 'bookReviews.votes', 'bookReviews.votes.madeBy']
    //     });
    //     return foundUser.bookReviews.filter(rev => rev.isDeleted === false);
    // }

    // public async getUserReviewById(userId: number,
    //     reviewId: number): Promise<ReviewDTO> {
    //     if (!this.usersRepository.find({ where: { id: userId, isDeleted: false } })) {
    //         throw new BadRequestException(`User with id ${userId} does not exist!`);
    //     }
    //     const userFound = await this.usersRepository.findOne({ id: userId, isDeleted: false }, {
    //         relations: ['booksBorrowed', 'bookVotes', 'bookRatings',
    //             'bookVotes.reviewVotedFor', 'bookRatings.bookName',
    //             'bookReviews', 'bookReviews.votes', 'bookReviews.votes.madeBy', 'bookReviews.bookName']
    //     });

    //     if (userFound.bookReviews.length == 0) {
    //         throw new BadRequestException(`The user with id: ${userFound.id} and username: ${userFound.username} has no reviews`);
    //     }
    //     if (!userFound.bookReviews.find(rev => rev.id === reviewId)) {
    //         throw new BadRequestException(`No review with id: ${reviewId} for user with id: ${userId}`);
    //     }

    //     const reviewWanted = userFound.bookReviews.find(rev => rev.id === reviewId && rev.isDeleted === false);
    //     return reviewWanted;
    // }

    public async deleteUserById(
        userId: number): Promise<UserDTO> {
        const user = await this.getUserEntityById(userId);
        user.isDeleted = true;
        this.usersRepository.save(user);
        return this.transformer.toUserDTO(user);
    }

    public async banUser(userId: number, period: number) {
        const user = await this.getUserEntityById(userId);
        user.banEndDate = new Date(Date.now() + period);
        return await this.usersRepository.save(user)
    }

    public async nextWeekStatus(userId: number) {
        // const user = await this.usersRepository.findOne(personalName, {
        //     where: { isDeleted: false },
        //     relations: ['country', 'project', 'vacations']

        // });
        // if (!user) {
        //     throw new BadRequestException(`User with id ${personalName} does not exist!`);
        // }
        // return this.transformer.toUserDTO(user);
        const user = await this.getUserById(userId);
        const userName = user.personalName;
        const userCountry = user.country;
        const userWorkspace = await this.workspaceService.getWorkspaceByCountry(userCountry);

        const wsNextWeekMatrix = userWorkspace.nextWeekPlanningMatrix;
        const nextWeekMatrixParsed = JSON.parse(wsNextWeekMatrix);

        for (let i = 0; i < nextWeekMatrixParsed.length; i++) {
            for (let j = 0; j < nextWeekMatrixParsed[i].length; j++) {
                if (nextWeekMatrixParsed[i][j] === userName) {
                    return true;
                }
            }

        }
        return false;
        // Work correct with both
    }
    // async banUser(userId: number, period: number) {
    //     const user = await this.findOneOrFail(userId);

    //     user.banEndDate = new Date(Date.now() + period);

    //     return await this.usersRepository.save(user);
    // }



    // private async findOneOrFail(userId: number): Promise<User> {
    //     const user = await this.usersRepository.findOne(userId);
    //     if (!user) {
    //         throw new Error('No user!')
    //     }

    //     return user;
    // }
    private isVacationValid(vacationRequest: CreateVacationDTO, userVacations: Vacation[]) {
        const vacationReqStart = moment(vacationRequest.startDate, 'YYYY-MM-DD').hour(0).minute(0).second(0);
        const vacationRequestEnd = moment(vacationRequest.endDate, 'YYYY-MM-DD').hour(0).minute(0).second(0);
        const startIsValid = !userVacations.some((v) => vacationReqStart.isBetween(moment(v.startDate), moment(v.endDate)));
        const endIsValid = !userVacations.some((v) => vacationRequestEnd.isBetween(moment(v.startDate), moment(v.endDate)));



        return startIsValid && endIsValid && vacationReqStart.isAfter() && vacationRequestEnd.isAfter(vacationReqStart);
    }
    private async getUserEntityById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne(id, {
            where: { isDeleted: false },
            relations: ['country', 'project', 'vacations']

        });
        if (!user) {
            throw new BadRequestException(`User with id ${id} does not exist!`);
        }
        return user;
    }
}
