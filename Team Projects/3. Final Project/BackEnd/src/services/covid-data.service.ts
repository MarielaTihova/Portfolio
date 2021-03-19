import { Injectable, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TransformService } from "./transform.service";
import { CovidData } from 'src/models/covidData.entity';
import { TRESHOLD_LOWER_BOUND, TRESHOLD_UPPER_BOUND } from "src/constant/treshold-values";
import { PHASE_1_PERCENTAGE, PHASE_2_PERCENTAGE } from "src/constant/phases-percentages";

@Injectable()
export class CovidDataService {
    constructor(
        private readonly transformer: TransformService,
        @InjectRepository(CovidData) private readonly covidRepository: Repository<CovidData>,
    ) { }
    async getData(): Promise<CovidData[]> {
        return await this.covidRepository.find();
    }

    async getDataPerCountry(countryName: string): Promise<CovidData[]> {
        // sort by date 
        // take last 7
        const todayDate = new Date();
        const startDate = new Date(todayDate.getFullYear(),
            todayDate.getMonth(),
            todayDate.getDate() - 7);
        const result = await this.covidRepository.find({
            take: 7, // take the last 7 records for the  particular country
            order: {
                //name: "ASC",
                date: "DESC",
            },

            where: {
                country: countryName,
                //date: Between('2020-09-01T12:53:00.000Z', '2020-09-07T12:53:00.000Z');

                // date: Between(/*'2020-09-01T12:53:00.000Z'*/startDate.toLocaleString(), todayDate.toLocaleString())
                //date: Date.parse('2020-09-07T12:53:00.000Z'),
                // date.toString().substring(1,10):
                //DATEDIFF(CURRENT_DATE,substring(DATE,1,10))<7
            }
        })
        /* console.log(typeof (result[0].date));
         console.log(result[0].date);
         console.log(result[0].date.toString());
         console.log("todays date", todayDate);
         console.log("todays date DAy", todayDate.getDate());*/
        return result;
    }

    async getAvgCases(): Promise<number> {
        const records = await this.covidRepository.find();
        let sum = records.reduce((acc, rating) => {
            acc += rating.todayCases;
            return acc;
        }, 0);

        const avgRating = sum / records.length;
        return avgRating;
    }

    // Calculating ratio
    async getRatioPerCountry(countryName: string): Promise<number> {
        const last7DaysData = await this.getDataPerCountry(countryName);

        // 1. Average cases per 1 million
        let sumCases = last7DaysData.reduce((acc, record) => {
            acc += record.casesPerOneMillion;
            return acc;
        }, 0);

        const avgCases = sumCases / last7DaysData.length;

        // 2. Average tests per 1 million

        let sumTests = last7DaysData.reduce((acc, record) => {
            acc += record.testsPerOneMillion;
            return acc;
        }, 0);

        const avgTests = sumTests / last7DaysData.length;

        // 3. Ratio
        const ratio = ((avgCases / avgTests) * 100).toFixed(2);


        // console.log('AVERAGE cases: ', avgCases);
        // console.log('AVERAGE tests: ', avgTests);
        // console.log("RATIO: ", ratio);

        return +ratio;
    }

    async percentageOfEmployeesAllowed(countryName: string): Promise<number> {
        const ratioForCountry = await this.getRatioPerCountry(countryName);

        if (ratioForCountry > TRESHOLD_UPPER_BOUND) {
            return PHASE_1_PERCENTAGE; //ratio > 10% -> 50%
        }

        if (ratioForCountry >= TRESHOLD_LOWER_BOUND && ratioForCountry <= TRESHOLD_UPPER_BOUND) {
            return PHASE_2_PERCENTAGE; // 75%
        }

        else { // ratio < 5% 
            return 100; // 100% - all employees back at the office
        }
    }
}
