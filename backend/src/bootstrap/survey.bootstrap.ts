import { Bootstrapper } from './Bootstraper'
import Survey from '../models/survey.model'
import Question from '../models/question.model'

export default class SurveysBootstrapper extends Bootstrapper {
  async run() {
    await Survey.create(
      {
        title: 'Encuesta de satisfacción',
        description: 'Encuesta para medir la satisfacción de los clientes',
        questions: [
          {
            questionText: '¿Qué tan satisfecho está con el servicio?',
            questionType: 'scale',
            hola: 'hola',
          },
        ],
      },
      { include: [Question] }
    )
  }
}
