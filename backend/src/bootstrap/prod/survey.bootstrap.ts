import { Bootstrapper } from '../Bootstraper'
import Survey from '../../models/survey.model'
import Question from '../../models/question.model'
import QuestionOption from '../../models/questionOption.model'
import Answer from '../../models/answer.model'

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
        surveyId: '48aca777-4baa-4365-8ca8-ed7ba4d33681',
        title: 'Hábitos de consumo',
        description:
          'Encuesta para aprender mas sobre los habitos de consumo y uso energético de los usuarios',
        questions: [
          {
            questionId: 'c96f70e0-c966-4f87-bdd5-184ec7cf0ffa',
            questionText: '¿Cuantos vehiculos tienes?',
            questionType: 'multiple_choice',
            questionOptions: [
              {
                questionOptionId: '12234887-aac5-437b-b700-40e99161dccd',
                textOption: '1',
                order: 1,
              },
              {
                questionOptionId: '54863a53-56e3-479e-8ffd-7943de650a23',
                textOption: '2',
                order: 2,
              },
              {
                questionOptionId: '54863a53-56e3-479e-8ffd-7943de650a43',
                textOption: '3',
                order: 3,
              },
              {
                questionOptionId: '54863a53-56e3-479e-8ffd-7943de650a24',
                textOption: '4+',
                order: 4,
              },
            ],
            answers: [
              {
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
                answerId: 'd9634fec-d669-4619-bcb2-e137b4ea508f',
                answerText: '4+',
              },
            ],
          },
          {
            questionId: 'b84348e0-c7bf-4c09-82ce-5366c81d764e',
            questionText:
              '¿Qué acciones tomas para reducir tu huella de carbono?',
            questionType: 'open',
            isRequired: false,
            answers: [
              {
                answerId: 'b84348e0-c7bf-4c09-82ce-5366c81d764e',
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
                answerText: 'Reciclo',
              },
            ],
          },
          {
            questionId: '3c9dccbb-1b19-49c0-b8e0-170e047a336a',
            questionText:
              '¿Qué tan amigable con el medio ambiente te consideras? (1, muy poco; 5, mucho)',
            questionType: 'scale',
            answers: [
              {
                answerId: '73910c50-0827-43dc-ace7-f03ed8c44a3f',
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
                scaleValue: 5,
              },
            ],
          },
          {
            questionId: 'ea067a23-3a46-41a6-b6e4-152aa199535a',
            questionText:
              '¿Cuantas personas forman parte de tu nucleo familiar?',
            questionType: 'multiple_choice',
            questionOptions: [
              {
                questionOptionId: '86d7613d-7633-4156-b596-65f218415c40',
                textOption: '1',
                order: 1,
              },
              {
                questionOptionId: '0c11fa72-2e8c-4310-acdb-fc5e2856793c',
                textOption: '2',
                order: 2,
              },
              {
                questionOptionId: 'd467a0a1-14da-4c5e-a7d8-45b13de95715',
                textOption: '3',
                order: 3,
              },
              {
                questionOptionId: 'effa5c3d-2e54-434e-b0f7-300429c07c31',
                textOption: '4',
                order: 4,
              },
              {
                questionOptionId: '06329a73-b188-4b77-8ab9-5f783a510807',
                textOption: '5+',
                order: 5,
              },
            ],
            answers: [
              {
                answerId: 'ad767557-62d9-4c31-9277-c7a2aa25bed6',
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
                answerText: '3',
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
