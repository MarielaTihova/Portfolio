
import { CreateWorkspaceDTO } from '../dtos/workspace/create-workspace.dto';
import { Workspace } from '../models/workspace.entity';
import { Injectable, BadRequestException } from "@nestjs/common";
import { TransformService } from "./transform.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoordinatesDTO } from 'src/dtos/workspace/coordinats.dto';
import { User } from 'src/models/user.entity';
import { WorkStatus } from 'src/models/enums/work-status';
import { PHASE_1_PERCENTAGE, PHASE_2_PERCENTAGE } from 'src/constant/phases-percentages';
import { CovidDataService } from './covid-data.service';
import { main } from '../common/planning-combination';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
@Injectable()
export class WorkspacesService {
    constructor(
        private readonly transformer: TransformService,
        private readonly covidDataService: CovidDataService,

        @InjectRepository(Workspace) private readonly workspaceRepository: Repository<Workspace>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,

    ) { }

    // async allReviews() {
    //     return await this.reviewReactionRepositoy.find({
    //         relations: ['madeBy',
    //             'reviewVotedFor', 'reviewVotedFor.bookName', 'reviewVotedFor.votes']
    //     });
    // }

    async allWorkspaces(): Promise<Workspace[]> {
        return await this.workspaceRepository.find({
            relations: ['country']
        });
    }


    async getSingleWorkspace(workspaceId: number): Promise<Workspace> {
        return await this.workspaceRepository.findOne({
            where: { id: workspaceId },
            relations: ['country']
        });
    }

    async getWorkspaceByCountry(workspaceCountry: string): Promise<Workspace> {
        const workspace = await this.workspaceRepository.findOne({
            where: { country: workspaceCountry },
            relations: ['country', 'country.employees', 'country.employees.project']
        });

        if (!workspace) {
            throw new BadRequestException(`No workspace for country with name ${workspaceCountry}!`);
        }

        return workspace;
    }



    // CREATE
    public async createWorkspace(newWorkspace: CreateWorkspaceDTO): Promise<Workspace> {
        // add field Country to CreateWorkspaceDTO
        // Check if:
        // newWorkspace.country is found in Countries table (repository) 
        // (so that we are able to fetch data about this country/workspace)


        // newWorkspace.matrix = JSON.stringify([[5,5,5,5],[5,5,5,5],[5,5,5,5]]);
        const matrix = this.generateEmptyWorkspace(newWorkspace.width, newWorkspace.height);
        newWorkspace.matrix = JSON.stringify(matrix);
        newWorkspace.nextWeekPlanningMatrix = JSON.stringify(matrix);
        const workspaceToCreate = this.workspaceRepository.create(newWorkspace);
        const savedWorkspace = await this.workspaceRepository.save(workspaceToCreate);
        // return this.transformer.toTodoDTO(savedTodo);
        return savedWorkspace;
    }

    public async assignSingleDesk(coordinates: CoordinatesDTO, workspaceCountry: string/*workspaceId: number*/): Promise<Workspace> {

        // finding workspace by ID

        // const ws = await this.workspaceRepository.findOne({ id: workspaceId });

        // finding workspace by COUNTRY
        const ws = await this.getWorkspaceByCountry(workspaceCountry);
        const newMatrix6 = JSON.parse(ws.matrix);
        newMatrix6[coordinates.coord1][coordinates.coord2] = -1;
        ws.matrix = JSON.stringify(newMatrix6);

        const newMatrixNext = JSON.parse(ws.nextWeekPlanningMatrix);
        newMatrixNext[coordinates.coord1][coordinates.coord2] = -1;
        ws.nextWeekPlanningMatrix = JSON.stringify(newMatrixNext);

        return await this.workspaceRepository.save(ws);
    }

    public async placeEmployee(coordinates: CoordinatesDTO,
        workspaceCountry: string, userId: number): Promise<Workspace> {
        const ws = await this.getWorkspaceByCountry(workspaceCountry);
        const newMatrix2 = JSON.parse(ws.nextWeekPlanningMatrix);
        newMatrix2[coordinates.coord1][coordinates.coord2] = userId;
        ws.nextWeekPlanningMatrix = JSON.stringify(newMatrix2);

        return await this.workspaceRepository.save(ws);
    }
    public async removeSingleDesk(coordinates: CoordinatesDTO, workspaceCountry: string): Promise<Workspace> {

        // finding workspace by ID

        // const ws = await this.workspaceRepository.findOne({ id: workspaceId });

        // finding workspace by COUNTRY
        const ws = await this.getWorkspaceByCountry(workspaceCountry);
        const newMatrix3 = JSON.parse(ws.matrix);
        newMatrix3[coordinates.coord1][coordinates.coord2] = 0;
        ws.matrix = JSON.stringify(newMatrix3);
        return await this.workspaceRepository.save(ws);


    }

    async getWorkspaceEmployees(workspaceCountry: string): Promise<User[]> {
        const workspace = await this.getWorkspaceByCountry(workspaceCountry);
        const employees = workspace.country.employees;
        return employees;
    }


    async employeesInOffice(workspaceCountry: string): Promise<User[]> {
        const employees = await this.getWorkspaceEmployees(workspaceCountry);
        const inOfficeNow = [];
        employees.map(empl => {
            if (
                empl.workStatus === WorkStatus.Office) {
                inOfficeNow.push(empl);
            }
        });

        return inOfficeNow;
    }
    async populateCurrWeekMatrix(workspaceCountry: string) {
        const employees = await this.getWorkspaceEmployees(workspaceCountry);
        const inOfficeNow = [];
        employees.map(empl => {
            if (
                empl.workStatus === WorkStatus.Office) {
                inOfficeNow.push(empl.personalName);
            }
        });

        //  return inOfficeNow;

        const ws = await this.clearCurrWeekMatrix(workspaceCountry);
        const newCurrMatrix = JSON.parse(ws.matrix);
        let peopleCount = 0;

        for (let i = 0; i < newCurrMatrix.length; i++) {
            for (let j = 0; j < newCurrMatrix[i].length; j++) {
                const coordinates: CoordinatesDTO = {
                    coord1: i,
                    coord2: j
                }

                if (this.isSafeSpot(coordinates, newCurrMatrix)) {
                    if (newCurrMatrix[coordinates.coord1][coordinates.coord2] === -1) {

                        if (peopleCount < inOfficeNow.length) {
                            newCurrMatrix[coordinates.coord1][coordinates.coord2] = inOfficeNow[peopleCount];
                            peopleCount++;
                        }


                        //   ws.matrix = JSON.stringify(newCurrMatrix);
                    }


                    //  return await this.workspaceRepository.save(ws);
                    //  return await this.placeEmployee(coordinates, workspaceCountry, 2);
                }
            }
        }

        ws.matrix = JSON.stringify(newCurrMatrix);
        return await this.workspaceRepository.save(ws);
        // return await this.workspaceRepository.save(ws);

        // newMatrix[coordinates.coord1][coordinates.coord2] = 0;
        // ws.matrix = JSON.stringify(newMatrix);
        // return await this.workspaceRepository.save(ws);
    }
    async sortEmployeesByProjectId(workspaceCountry: string): Promise<User[]> {
        const wsEmployees = await this.getWorkspaceEmployees(workspaceCountry);
        let sortedByProjectIdEmployes = wsEmployees.sort(this.compareByProjectId);

        return sortedByProjectIdEmployes;
    }


    async generatePeopleForNextWeekParamPerc(workspaceCountry: string, percentage: number): Promise<User[]> {
        const wsEmployees = await this.sortEmployeesByProjectId(workspaceCountry);

        const fiftyPercent = wsEmployees.length * percentage * 0.01; //50 perc
        let nextWeekPeople = [];
        // 1. Take all employees that don't have a vacation planned for next week
        // 2. For now let's say everybody is available next week (no vacations)
        // 3. See who is in the OFFICE now

        // 4. Everybody is home at the beginning
        const existsNotAtHome = wsEmployees.find(emp => emp.workStatus != WorkStatus.Home);
        // if all are at home
        if (!existsNotAtHome) {
            nextWeekPeople = wsEmployees.slice(0, fiftyPercent);
            console.log(nextWeekPeople);
        }
        // if there are people who have already worked at the OFFICE 
        // (are in the OFFICE this current week)
        // people who are currently NOT at the OFFICE
        else if (existsNotAtHome) {
            const notInOfficeNow = [];
            const inOfficeNow = [];
            wsEmployees.forEach(emp => {
                if (emp.workStatus !== WorkStatus.Office) {
                    notInOfficeNow.push(emp);
                }
                if (emp.workStatus === WorkStatus.Office) {
                    inOfficeNow.push(emp);
                }
            });

            console.log("Not in office now", notInOfficeNow);
            nextWeekPeople = notInOfficeNow.slice(0, fiftyPercent);
            // if there are enough (50% people for the next week), not repeating people
            if (nextWeekPeople.length === fiftyPercent) {
                const placesLeft = fiftyPercent - nextWeekPeople.length;
                nextWeekPeople = notInOfficeNow.slice(0, fiftyPercent);
            }

            // if not enough people for next week- repeat people
            if (nextWeekPeople.length < fiftyPercent) {
                const placesLeft = fiftyPercent - nextWeekPeople.length;
                let extraPeopleArr = [];
                extraPeopleArr = inOfficeNow.slice(0, placesLeft);

                extraPeopleArr.forEach(empl => {
                    nextWeekPeople.push(empl);
                })
            }
        }
        // else if (existsNotAtHome) {
        // let peopleCounter = 0;
        // let i = 0;
        // while (peopleCounter <= fiftyPercent && i < wsEmployees.length) {
        //     if (wsEmployees[i].workStatus != WorkStatus.Office) {
        //         nextWeekPeople.push(wsEmployees[i]);
        //         peopleCounter++;
        //         i++;
        //     }

        // }
        // }
        // 5. Take first half of people then

        // 6. Take all who are !(OFFICE) now (workStatus!=Workstatus.Office)
        // 7. 
        return nextWeekPeople;


    }


    // const finalTouch = () => {
    //     const wsEmployees = await this.sortEmployeesByProjectId(workspaceCountry);
    //     const projectIds = [];
    //     wsEmployees.forEach(empl => {
    //         projectIds.push(empl.project.id);
    //     })

    //     const groups = main(projectIds, FIFTY_PERC);
    //     const firstCombination = groups[0]; // [4,8]

    //     const nextWeekPeople = [];
    //     firstCombination.forEach(projectId => {
    //         wsEmployees.forEach(empl => {
    //             if (empl.project.id === projectId) {
    //                 nextWeekPeople.push(empl);
    //             }
    //         })
    //     })}


    async generatePeopleForNextWeekParamPerc2(workspaceCountry: string, percentage: number): Promise<User[]> {
        const wsEmployees = await this.sortEmployeesByProjectId(workspaceCountry);
        const projectIds = [];
        wsEmployees.forEach(empl => {
            projectIds.push(empl.project.id);
        })

        const groups = main(projectIds, wsEmployees.length * percentage * 0.01);
        const firstCombination = groups[0]; // [4,8]

        let nextWeekPeople = [];


        const percPeopleAtOffice = wsEmployees.length * percentage * 0.01;
        const existsNotAtHomePeople = wsEmployees.find(emp => emp.workStatus != WorkStatus.Home);
        // if all are at home
        if (!existsNotAtHomePeople) {
            // nextWeekPeople = wsEmployees.slice(0, percPeopleAtOffice);
            // console.log(nextWeekPeople);
            firstCombination.forEach(projectId => {
                wsEmployees.forEach(empl => {
                    if (empl.project.id === projectId) {
                        nextWeekPeople.push(empl);
                    }
                })
            })
        }



        else if (existsNotAtHomePeople) {
            firstCombination.forEach(projectId => {
                wsEmployees.forEach(empl => {
                    if (empl.project.id === projectId && empl.workStatus != WorkStatus.Office) {
                        nextWeekPeople.push(empl);
                    }
                })
            })

            const notInOfficeNow = [];
            const inOfficeNow = [];
            wsEmployees.forEach(emp => {
                if (emp.workStatus !== WorkStatus.Office) {
                    notInOfficeNow.push(emp);
                }
                if (emp.workStatus === WorkStatus.Office) {
                    inOfficeNow.push(emp);
                }
            });
            if (nextWeekPeople.length < percPeopleAtOffice) {
                const placesLeft = percPeopleAtOffice - nextWeekPeople.length;
                let extraPeopleArr = [];


                const inOfficeOptimalProjectFirst = [];
                const inOfficeOthers = [];
                inOfficeNow.forEach(empl => {
                    if (nextWeekPeople.some(p => p.project.id === empl.project.id)) {
                        console.log("Optimal filler", empl);
                        inOfficeOptimalProjectFirst.push(empl);
                    }
                    else {
                        inOfficeOthers.push(empl);
                    }
                })

                const peopleToFillRemainingSpace = inOfficeOptimalProjectFirst.concat(inOfficeOthers);
                extraPeopleArr = peopleToFillRemainingSpace.slice(0, placesLeft);

                extraPeopleArr.forEach(empl => {
                    nextWeekPeople.push(empl);
                })
            }
        }
        // firstCombination.forEach(projectId => {
        //     wsEmployees.forEach(empl => {
        //         if (empl.project.id === projectId) {
        //             nextWeekPeople.push(empl);
        //         }
        //     })
        // })

        console.log("NEXT WEEK PEOPLE", nextWeekPeople);

        return nextWeekPeople;

    }

    async generateNextWeekPeople(workspaceCountry: string): Promise<User[]> {

        // const ratio = await this.covidDataService.getRatioPerCountry(workspaceCountry);
        const percentageEmployees = await this.covidDataService.percentageOfEmployeesAllowed(workspaceCountry);

        // const nextWeekPeople = await this.generatePeopleForNextWeekParamPerc(workspaceCountry, percentageEmployees);

        const nextWeekPeople = await this.generatePeopleForNextWeekParamPerc2(workspaceCountry, percentageEmployees);

        return nextWeekPeople;
    }

    // Clear next week matrix
    async clearNextWeekMatrix(workspaceCountry: string) {
        const ws = await this.getWorkspaceByCountry(workspaceCountry);
        let clearedMatrix = JSON.parse(ws.nextWeekPlanningMatrix);

        for (let i = 0; i < clearedMatrix.length; i++) {
            for (let j = 0; j < clearedMatrix[i].length; j++) {
                if (clearedMatrix[i][j] !== 0 && clearedMatrix[i][j] !== -1) {
                    clearedMatrix[i][j] = -1;
                }
            }
        }
        ws.nextWeekPlanningMatrix = JSON.stringify(clearedMatrix);
        return await this.workspaceRepository.save(ws);
    }

    // Clear current week matrix
    async clearCurrWeekMatrix(workspaceCountry: string) {
        const ws = await this.getWorkspaceByCountry(workspaceCountry);
        let clearedMatrix = JSON.parse(ws.matrix);

        for (let i = 0; i < clearedMatrix.length; i++) {
            for (let j = 0; j < clearedMatrix[i].length; j++) {
                if (clearedMatrix[i][j] !== 0 && clearedMatrix[i][j] !== -1) {
                    clearedMatrix[i][j] = -1;
                }
            }
        }
        ws.matrix = JSON.stringify(clearedMatrix);
        return await this.workspaceRepository.save(ws);
    }

    async populateNextWeekMatrix(workspaceCountry: string) {
        // const ws = await this.getWorkspaceByCountry(workspaceCountry);
        const clearedWs = await this.clearNextWeekMatrix(workspaceCountry);
        //placeEmployee(coordinates: CoordinatesDTO,
        //  workspaceCountry: string, userId: number)

        let newMatrix4 = JSON.parse(clearedWs.nextWeekPlanningMatrix);
        const nextWeekPeople = await this.generateNextWeekPeople(workspaceCountry);
        const nextWeekPeopleIDs = nextWeekPeople.map(person => person.id);
        const nextWeekPeopleNames = nextWeekPeople.map(person => person.personalName);
        let peopleCount = 0;
        // const coordinates: CoordinatesDTO = {
        //     coord1,
        //     coord2
        // }
        // newMatrix.forEach(row => {
        //     row.forEach(async col => {
        //         const coordinates: CoordinatesDTO = {
        //             coord1: row,
        //             coord2: col
        //         }

        //         // coordinates.coord1 = row;
        //         // coordinates.coord2 = col;
        //         //if (this.isSafeSpot(coordinates, newMatrix)) {
        //         return await this.placeEmployee(coordinates, workspaceCountry, 2);
        //         // }

        //     })
        // })



        for (let i = 0; i < newMatrix4.length; i++) {
            for (let j = 0; j < newMatrix4[i].length; j++) {
                const coordinates: CoordinatesDTO = {
                    coord1: i,
                    coord2: j
                }

                if (this.isSafeSpot(coordinates, newMatrix4)) {
                    if (newMatrix4[coordinates.coord1][coordinates.coord2] === -1) {

                        if (peopleCount < nextWeekPeopleIDs.length) {
                            newMatrix4[coordinates.coord1][coordinates.coord2] = nextWeekPeopleNames[peopleCount];
                            peopleCount++;
                        }


                        clearedWs.nextWeekPlanningMatrix = JSON.stringify(newMatrix4);
                    }


                    //  return await this.workspaceRepository.save(ws);
                    //  return await this.placeEmployee(coordinates, workspaceCountry, 2);
                }
            }
        }
        return await this.workspaceRepository.save(clearedWs);
        // newMatrix[coordinates.coord1][coordinates.coord2] = -1;
        // ws.nextWeekPlanningMatrix = JSON.stringify(newMatrix);
        // return await this.workspaceRepository.save(ws);
    }

    async peopleFromMatrix(matrix: string): Promise<User[]> {
        const mat = JSON.parse(matrix);

        const peopleNames = [];

        for (let i = 0; i < mat.length; i++) {
            for (let j = 0; j < mat[i].length; j++) {
                if (mat[i][j] !== 0 && mat[i][j] !== -1) {
                    peopleNames.push(mat[i][j]);
                }
            }
        }

        const users = [];

        for (let i = 0; i < peopleNames.length; i++) {
            const user = await this.usersRepository.findOne({ personalName: peopleNames[i] });
            users.push(user);
        }

        return users;
    }


    async swapMatrix(workspaceCountry: string) {
        let ws = await this.getWorkspaceByCountry(workspaceCountry);
        const wsEmployees = ws.country.employees;

        const peopleToBeAtOffice = await this.peopleFromMatrix(ws.nextWeekPlanningMatrix);
        const peopleAtOfficeNow = await this.peopleFromMatrix(ws.matrix);

        const peopleAtOfficeNotPlannedForNextWeek = [];

        for (let i = 0; i < peopleAtOfficeNow.length; i++) {
            const foundInBoth = peopleToBeAtOffice.find(p => p.id === peopleAtOfficeNow[i].id);
            if (!foundInBoth) {
                peopleAtOfficeNotPlannedForNextWeek.push(peopleAtOfficeNow[0]);
            }
        }

        const nextWeekMat = ws.nextWeekPlanningMatrix;
        const currMat = ws.matrix;
        ws.matrix = nextWeekMat;
        ws.nextWeekPlanningMatrix = currMat;
        return await this.workspaceRepository.save(ws);

        // Дотук разменя винаги двете матрици, но само това





        const ws1Swap = await this.workspaceRepository.save(ws);
        const clearedNext = await this.clearNextWeekMatrix(workspaceCountry);

        return await this.workspaceRepository.save(clearedNext);
        // return ws1Swap;

        // const wsCountry = ws1Swap.country.name;
        // return this.populateNextWeekMatrix(wsCountry);
        // const peopleChangedWorkStatus=[];
        for (let i = 0; i < peopleToBeAtOffice.length; i++) {

            for (let j = 0; j < wsEmployees.length; j++) {
                if (peopleToBeAtOffice[i].id === wsEmployees[j].id) {
                    // peopleToBeAtOffice[i].workStatus = WorkStatus.Office;
                    this.assignOffice(wsEmployees[j]);
                }
            }
            //await this.usersRepository.save(peopleToBeAtOffice[i]);

        }

        return;

        console.log("work status change", peopleAtOfficeNow);

        for (let i = 0; i < peopleAtOfficeNotPlannedForNextWeek.length; i++) {
            // peopleAtOfficeNotPlannedForNextWeek[i].workStatus = WorkStatus.Home;
            // await this.usersRepository.save(peopleAtOfficeNotPlannedForNextWeek[i]);
            this.assignHome(peopleAtOfficeNotPlannedForNextWeek[i]);
        }


        // const clearedCurrMatrix = await this.clearCurrWeekMatrix(workspaceCountry);
        const clearedNextWeekMatrix = await this.clearNextWeekMatrix(workspaceCountry);
        ws = clearedNextWeekMatrix;
        await this.workspaceRepository.save(ws);
        return await this.populateNextWeekMatrix(workspaceCountry);

        // const currWeekEmployees = await this.employeesInOffice(workspaceCountry);
        // const nextWeekPeople = await this.generateNextWeekPeople(workspaceCountry);

    }

    async assignHome(user: User) {
        const userFound = await this.usersRepository.findOne({ id: user.id });
        userFound.workStatus = WorkStatus.Home;

        return await this.usersRepository.save(user);
    }

    async assignOffice(user: User) {
        const userFound = await this.usersRepository.findOne({ id: user.id });
        userFound.workStatus = WorkStatus.Office;

        return await this.usersRepository.save(user);
    }

    private isSafeSpot(coordinates: CoordinatesDTO, matrix: number[][]): boolean {
        const row = coordinates.coord1;
        const col = coordinates.coord2;

        const row0 = row === 0;
        const col0 = col === 0;
        const lastRow = row === matrix.length - 1;
        const lastCol = col === matrix[0].length - 1;

        const safeLeft = () => {
            if (matrix[row][col - 1] !== 0
                && matrix[row][col - 1] !== -1) {
                return false; // NOT Safe!
            }
            return true;
        }

        const safeRight = () => {
            if (matrix[row][col + 1] !== 0
                && matrix[row][col + 1] !== -1) {
                return false; // NOT Safe!
            }
            return true;
        }


        const safeUp = () => {
            if (matrix[row - 1][col] !== 0
                && matrix[row - 1][col] !== -1) {
                return false; // NOT Safe!
            }
            return true;
        }

        const safeDown = () => {
            if (matrix[row + 1][col] !== 0
                && matrix[row + 1][col] !== -1) {
                return false; // NOT Safe!
            }
            return true;
        }


        // INSIDE CELLS
        if (!row0
            && !lastRow
            && !col0
            && !lastCol) {
            return safeLeft() && safeRight() && safeUp() && safeDown();
        }




        // FIRST ROW

        // cell[0][0]
        if (row0 && col0) {
            return safeRight() && safeDown();
        }

        // cell[0][last]
        if (row0 && lastCol) {
            return safeLeft() && safeDown();
        }

        // cell[0][inside]
        if (row0 && !col0 && !lastCol) {
            // return safeDown();
            // return safeDown();//&& safeLeft();
            return safeLeft() && safeRight() && safeDown();
        }

        // LAST ROW

        // cell[last][0]
        if (lastRow && col0) {
            return safeUp() && safeRight();
        }
        // cell[last][last]
        if (lastRow && lastCol) {
            return safeUp() && safeLeft();
        }
        // cell[last][inside]
        if (lastRow && !col0 && !lastCol) {
            return safeLeft() && safeRight() && safeUp();
        }


        // FIRST COL

        // cell[inside][0]
        if (col0 && !row0 && !lastRow) {
            return safeUp() && safeDown() && safeRight();
        }

        // LAST COL

        // cell[inside][last]
        if (lastCol && !row0 && !lastRow) {
            return safeUp() && safeDown() && safeLeft();
        }


    }
    private compareByProjectId(a: User, b: User) {
        if (a.project.id > b.project.id) {
            return 1;
        }
        if (a.project.id < b.project.id) {
            return -1;
        }
        return 0;
    }



    private generateEmptyWorkspace = (rows: number, cols: number) => {
        let matrix = [];

        for (let row = 0; row < rows; row += 1) {
            matrix[row] = [];



            for (let col = 0; col < cols; col += 1) {
                matrix[row][col] = 0;
            }
        }
        return matrix;
    }
}