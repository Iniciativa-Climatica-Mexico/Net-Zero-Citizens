import { Bootstrapper } from './Bootstraper'
import { SurveysModel } from '../models/surveys.model'

export default class SurveysBootstrapper extends Bootstrapper {
  async run() {
    Promise.all([
      SurveysModel.create({
        title: 'Encuesta de satisfacción',
        description: 'Encuesta para medir la satisfacción de los clientes',
      }).then((survey) => {
        survey
          .createQuestion({
            questionText: '¿Cómo calificaría el servicio?',
            questionType: 'scale',
          })
          .then((question) => {
            question.createAnswer({
              scaleValue: 5,
            })
            question.createAnswer({
              scaleValue: 5,
            })
            question.createAnswer({
              scaleValue: 3,
            })
          })

        survey
          .createQuestion({
            questionText: 'Comentarios de mejora',
            questionType: 'open',
          })
          .then((question) => {
            question.createAnswer({
              answerText: 'Me gustaría que hubiera más promociones',
            })
            question.createAnswer({
              answerText: 'Me gustó mucho el servicio',
            })
          })
      }),
      SurveysModel.create({
        title: 'Encuesta Habitos de consumo',
        description:
          'Encuesta para medir los habitos de consumo de los clientes',
      }).then((survey) => {
        survey
          .createQuestion({
            questionText: '¿Cuántas veces al mes consume comida rápida?',
            questionType: 'multiple_choice',
          })
          .then(async (question) => {
            const options = [
              '1-5 veces',
              '6-10 veces',
              '11-15 veces',
              'mas de 15 veces',
            ]
            await Promise.all(
              options.map((option) => {
                question.createQuestionOption({
                  textOption: option,
                })
              })
            )

            const answers = [
              '1-5 veces',
              '1-5 veces',
              '1-5 veces',
              '6-10 veces',
              'mas de 15 veces',
            ]
            await Promise.all(
              answers.map((answer) => {
                question.createAnswer({
                  answerText: answer,
                })
              })
            )
          })

        survey
          .createQuestion({
            questionText: '¿Qué tan eco friendly te consideras?',
            questionType: 'scale',
          })
          .then((question) => {
            question.createAnswer({
              scaleValue: 5,
            })
            question.createAnswer({
              scaleValue: 5,
            })
            question.createAnswer({
              scaleValue: 3,
            })
          })
      }),
    ])
  }
}
