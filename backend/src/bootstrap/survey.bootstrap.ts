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
    );

    await Survey.create(
      {
        surveyId: 'surv-5678-abcd-1111',
        title: 'Product Feedback Survey',
        description: 'Survey to gather feedback on our latest product',
        questions: [
          {
            questionId: 'ques-5678-abcd-1111',
            questionText: 'What features would you like to see in our product?',
            questionType: 'text',
          },
          {
            questionId: 'ques-5678-abcd-1112',
            questionText: 'On a scale of 1 to 10, how likely are you to recommend our product?',
            questionType: 'scale',
            answers: [
              {
                answerId: 'answ-5678-abcd-1111',
                userId: 'efgh-5678-abcd-1111',
                scaleValue: 8,
              },
              {
                answerId: 'answ-5678-abcd-1112',
                userId: 'efgh-5678-abcd-1112',
                scaleValue: 9,
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
            ],
          },
        ],
      }
    );

    await Survey.create(
      {
        surveyId: 'surv-9876-dcba-2222',
        title: 'Employee Engagement Survey',
        description: 'Survey to measure employee engagement in the company',
        questions: [
          {
            questionId: 'ques-9876-dcba-2222',
            questionText: 'Do you feel valued in your role?',
            questionType: 'yes_no',
            answers: [
              {
                answerId: 'answ-9876-dcba-2221',
                userId: 'ijkl-9876-dcba-2221',
                answerText: 'Yes',
              },
              {
                answerId: 'answ-9876-dcba-2222',
                userId: 'ijkl-9876-dcba-2222',
                answerText: 'No',
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
            ],
          },
        ],
      }
    );

    await Survey.create(
      {
        surveyId: 'surv-5555-efgh-3333',
        title: 'Website Usability Survey',
        description: 'Survey to assess the usability of our website',
        questions: [
          {
            questionId: 'ques-5555-efgh-3333',
            questionText: 'Did you find the website easy to navigate?',
            questionType: 'yes_no',
            answers: [
              {
                answerId: 'answ-5555-efgh-3331',
                userId: 'mnop-5555-efgh-3331',
                answerText: 'Yes',
              },
              {
                answerId: 'answ-5555-efgh-3332',
                userId: 'mnop-5555-efgh-3332',
                answerText: 'No',
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
            ],
          },
        ],
      }
    );
  }
}
