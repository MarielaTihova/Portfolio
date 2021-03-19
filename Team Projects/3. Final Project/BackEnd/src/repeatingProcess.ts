// import { Injectable, Logger } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';

// @Injectable()
// export class TasksService {
//     private readonly logger = new Logger(TasksService.name);

//     @Cron('45 * * * * *')
//     handleCron() {
//         this.logger.debug('Called when the current second is 45');
//     }
// }

import { Injectable, Logger, HttpService, /*HttpService */ } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { CovidData } from './models/covidData.entity';
import { Repository, Between } from "typeorm";
import { COVID_URL } from './constant/covid-url';
import { CovidDataService } from './services/covid-data.service';
import { CovidDataController } from './controllers/covid-data.controller';
// import { AxiosResponse } from 'axios';
// import { Observable } from 'rxjs'

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(CovidData) private readonly covidRepository: Repository<CovidData>,
        private readonly httpService: HttpService,
    ) { }



    @Cron('00  32 22 * * *')
    async root() {
        const response = await this.httpService.get(COVID_URL).toPromise();
        const data: [] = response.data;

        const records = data.map(async (record: CovidData) => {

            if (!record.recovered) {
                console.log("No recovered", record);
            }
            const newEntry = this.covidRepository.create(record);
            let created;
            try {
                created = this.covidRepository.save(newEntry);
            }
            catch (e) {
                console.log("Error ", e);
            }

            //console.log("Today's cases", record.todayCases);
            return await created;

        })

        const result = await Promise.all(records);
        //console.log("Result", result);
        //console.log("API data", data);
        return data;
    }
    //  @Cron('20 12 19 * * *')
    async addData(data: any) {
        const records = await data.map(record => {

            const newEntry = this.covidRepository.create(record);
            const created = this.covidRepository.save(newEntry);
        })

        return data;
    }


}





