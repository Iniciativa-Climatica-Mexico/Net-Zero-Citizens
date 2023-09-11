import { SurveysModel } from "../models/surveys.model";
import { Bootstrapper } from "./Bootstraper";

export default class SurveysBootstrap extends Bootstrapper {
    async run() {
        SurveysModel.bulkCreate([
            {
                title: 'Encuesta 1',
                description: 'Esta es una encuesta de prueba',
                startDate: new Date('2021-01-01'),
                endDate: new Date('2021-01-01'),
            },
            {
                title: 'Encuesta 2',
                description: 'Luppi estuvo aqui',
                startDate: new Date('2021-01-01'),
                endDate: new Date('2021-01-01'),
            },
            {
                title: 'Encuesta 3',
                description: 'Richie esta programando',
                startDate: new Date('2021-01-01'),
                endDate: new Date('2021-01-01'),
            },
            {
                title: 'Encuesta 4',
                description: 'Cajas murio',
                startDate: new Date('2021-01-01'),
                endDate: new Date('2021-01-01'),
            },
        ])
    }
}
