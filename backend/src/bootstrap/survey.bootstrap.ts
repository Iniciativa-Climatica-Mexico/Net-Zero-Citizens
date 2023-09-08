import { Bootstrapper } from './Bootstraper'
import Survey from '../models/survey.model'
import Question from '../models/question.model'
import QuestionOption from '../models/questionOption.model'
import Answer from '../models/answer.model'

export default class SurveysBootstrapper extends Bootstrapper {
  async run() {
    await Survey.create(
      {
        surveyId: 'surv-1234-efgh-0000',
        title: 'Encuesta de satisfacción',
        description: 'Encuesta para medir la satisfacción de los clientes',
        questions: [
          {
            questionId: 'ques-1234-efgh-0000',
            questionText: '¿Qué tan satisfecho está con el servicio?',
            questionType: 'scale',
            answers: [
              {
                answerId: 'answ-1234-efgh-0000',
                userId: 'abcd-1234-efgh-5678',
                scaleValue: 5,
              },
              {
                answerId: 'answ-1234-efgh-0001',
                userId: 'abcd-1234-efgh-5679',
                scaleValue: 4,
              },
            ],
          },
          {
            questionId: 'ques-1234-efgh-0001',
            questionText: '¿Cómo describiria nuestro servicio?',
            questionType: 'multiple_choice',
            questionOptions: [
              {
                questionOptionId: 'optn-1234-efgh-0000',
                textOption: 'Excelente',
              },
              {
                questionOptionId: 'optn-1234-efgh-0001',
                textOption: 'Bueno',
              },
              {
                questionOptionId: 'optn-1234-efgh-0002',
                textOption: 'Regular',
              },
              {
                questionOptionId: 'optn-1234-efgh-0003',
                textOption: 'Malo',
              },
              {
                questionOptionId: 'optn-1234-efgh-0004',
                textOption: 'Pésimo',
              },
            ],
            answers: [
              {
                answerId: 'answ-1234-efgh-0002',
                userId: 'abcd-1234-efgh-5678',
                answerText: 'Excelente',
              },
              {
                answerId: 'answ-1234-efgh-0003',
                userId: 'abcd-1234-efgh-5679',
                answerText: 'Bueno',
              },
            ],
          },
        ],
      },
      {
        include: [
          {
            model: Question,
            association: 'questions',
            include: [
              {
                model: Answer,
                association: 'answers',
              },
              {
                model: QuestionOption,
                association: 'questionOptions',
              },
            ],
          },
        ],
      }
    )
  }
}
