import { Bootstrapper } from './Bootstraper'
import Survey from '../models/survey.model'
import Question from '../models/question.model'
import QuestionOption from '../models/questionOption.model'
import Answer from '../models/answer.model'

export default class SurveysBootstrapper extends Bootstrapper {
  async run() {
    const config = {
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
    const surveys = [
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
            questionText: '¿Cómo describiría nuestro servicio?',
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
        surveyId: 'surv-5678-abcd-1111',
        title: 'Product Feedback Survey',
        description: 'Survey to gather feedback on our latest product',
        questions: [
          {
            questionId: 'ques-5678-abcd-1111',
            questionText: 'What features would you like to see in our product?',
            questionType: 'open',
            isRequired: false,
          },
          {
            questionId: 'ques-5678-abcd-1112',
            questionText:
              'On a scale of 1 to 10, how likely are you to recommend our product?',
            questionType: 'scale',
            answers: [
              {
                answerId: 'answ-5678-abcd-1111',
                userId: 'abcd-1234-efgh-5678',
                scaleValue: 3,
              },
              {
                answerId: 'answ-5678-abcd-1112',
                userId: 'abcd-1234-efgh-5679',
                scaleValue: 5,
              },
            ],
          },
        ],
      },

      {
        surveyId: 'surv-9876-dcba-2222',
        title: 'Employee Engagement Survey',
        description: 'Survey to measure employee engagement in the company',
        questions: [
          {
            questionId: 'ques-9876-dcba-2222',
            questionText: 'Do you feel valued in your role?',
            questionType: 'multiple_choice',
            questionOptions: [
              {
                questionOptionId: 'optn-9876-dcba-2220',
                textOption: 'Yes',
              },
              {
                questionOptionId: 'optn-9876-dcba-2221',
                textOption: 'No',
              },
            ],
            answers: [
              {
                answerId: 'answ-9876-dcba-2222',
                userId: 'abcd-1234-efgh-5679',
                answerText: 'No',
              },
            ],
          },
        ],
      },
      {
        surveyId: 'surv-5555-efgh-3333',
        title: 'Website Usability Survey',
        description: 'Survey to assess the usability of our website',
        questions: [
          {
            questionId: 'ques-5555-efgh-3330',
            questionText: 'Did you find the website easy to navigate?',
            questionType: 'multiple_choice',
            questionOptions: [
              {
                questionOptionId: 'optn-5555-efgh-3330',
                textOption: 'Yes',
              },
              {
                questionOptionId: 'optn-5555-efgh-3331',
                textOption: 'No',
              },
            ],
            answers: [
              {
                answerId: 'answ-5555-efgh-3330',
                userId: 'abcd-1234-efgh-5679',
                answerText: 'No',
              },
            ],
          },          
          {
            questionId: 'ques-5678-abcd-3331',
            questionText: 'What features would you like to see in our product?',
            questionType: 'open',
            isRequired: false,
          },
          {
            questionId: 'ques-5678-abcd-3332',
            questionText:
              'On a scale of 1 to 10, how likely are you to recommend our product?',
            questionType: 'scale',
            answers: [
              {
                answerId: 'answ-5678-abcd-3331',
                userId: 'abcd-1234-efgh-5679',
                scaleValue: 5,
              },
            ],
          },
          {
            questionId: 'ques-1234-efgh-3333',
            questionText: '¿Cómo describiría nuestro servicio?',
            questionType: 'multiple_choice',
            questionOptions: [
              {
                questionOptionId: 'optn-1234-efgh-3332',
                textOption: 'Excelente',
              },
              {
                questionOptionId: 'optn-1234-efgh-3333',
                textOption: 'Bueno',
              },
              {
                questionOptionId: 'optn-1234-efgh-3334',
                textOption: 'Regular',
              },
              {
                questionOptionId: 'optn-1234-efgh-3335',
                textOption: 'Malo',
              },
              {
                questionOptionId: 'optn-1234-efgh-3336',
                textOption: 'Pésimo',
              },
            ],
            answers: [
              // {
              //   answerId: 'answ-1234-efgh-3337',
              //   userId: 'abcd-1234-efgh-5678',
              //   answerText: 'Excelente',
              // },
              {
                answerId: 'answ-1234-efgh-3338',
                userId: 'abcd-1234-efgh-5679',
                answerText: 'Bueno',
              },
            ],
          },
        ],
      },
    ]
    for (const survey of surveys) {
      await Survey.create(survey, config)
    }
  }
}
