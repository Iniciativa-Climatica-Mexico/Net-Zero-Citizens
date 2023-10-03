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
        surveyId: 'beaa7b8d-0531-4f24-9a0a-d08900f1f7db',
        title: 'Encuesta de satisfacción',
        description: 'Encuesta para medir la satisfacción de los clientes',
        questions: [
          {
            questionId: '4f6ba762-60a3-4b64-a5ed-5a54fe534969',
            questionText: '¿Qué tan satisfecho está con el servicio?',
            questionType: 'scale',
            answers: [
              {
                answerId: '32836306-79d9-46db-966d-65d556329ccd',
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
                scaleValue: 5,
              },
              {
                answerId: 'e5990693-8804-4676-905f-5d633aa81ae3',
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
                scaleValue: 4,
              },
            ],
          },
          {
            questionId: 'd5034404-24eb-4eb6-92a0-f39a5a4fe592',
            questionText: '¿Cómo describiría nuestro servicio?',
            questionType: 'multiple_choice',
            questionOptions: [
              {
                questionOptionId: 'e42b3e35-9a57-471a-9868-da23adb93f3d',
                textOption: 'Excelente',
                order: 1,
              },
              {
                questionOptionId: '89d38b7a-f75e-481e-b522-f642d38bc87c',
                textOption: 'Bueno',
                order: 2,
              },
              {
                questionOptionId: '1fb3772a-6ac7-4609-ab7b-c2777ecad62b',
                textOption: 'Regular',
                order: 3,
              },
              {
                questionOptionId: '8e5d10c3-ab64-4ef9-9433-33870e1bbd49',
                textOption: 'Malo',
                order: 4,
              },
              {
                questionOptionId: '581ec9c2-5b40-44f5-a9e9-9e1166042506',
                textOption: 'Pésimo',
                order: 5,
              },
            ],
            answers: [
              {
                answerId: '5e7ec927-e777-4915-8fa0-69d9ca192fb5',
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
                answerText: 'Excelente',
              },
              {
                answerId: '46eb7810-bf30-41dc-8eca-f9e3d0be6935',
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
                answerText: 'Bueno',
              },
            ],
          },
        ],
      },
      {
        surveyId: '2d233918-2b99-4a3d-ba43-e69aee89497a',
        title: 'Product Feedback Survey',
        description: 'Survey to gather feedback on our latest product',
        questions: [
          {
            questionId: 'e71bb662-b5cd-46d0-8e81-0c493e9fcbab',
            questionText: 'What features would you like to see in our product?',
            questionType: 'open',
            isRequired: false,
            answers: [
              {
                answerId: 'e71bb662-b5cd-46d0-8e81-0c493e9fcbab',
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
                answerText: 'More colors',
              },
            ],
          },
          {
            questionId: '894a255f-d68d-4e64-8053-84327aa5c22c',
            questionText:
              'On a scale of 1 to 10, how likely are you to recommend our product?',
            questionType: 'scale',
            answers: [
              {
                answerId: '24e1ed06-bec3-458c-a0f7-a57bfdb6f426',
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
                scaleValue: 3,
              },
              {
                answerId: '97703d0c-9abe-4d36-a942-b1ea36ec4c7e',
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
                scaleValue: 5,
              },
            ],
          },
        ],
      },

      {
        surveyId: 'd65281ba-53ff-42ce-b434-8a5915ca5e35',
        title: 'Employee Engagement Survey',
        description: 'Survey to measure employee engagement in the company',
        questions: [
          {
            questionId: '8e9a45a4-e5c8-4673-8285-728981dcd480',
            questionText: 'Do you feel valued in your role?',
            questionType: 'multiple_choice',
            questionOptions: [
              {
                questionOptionId: 'dc168c50-d9f3-4acd-a962-93febe3e822a',
                textOption: 'Yes',
                order: 1,
              },
              {
                questionOptionId: '30e82a3a-570b-4d3e-acfc-87eafd188cf6',
                textOption: 'No',
                order: 2,
              },
            ],
            answers: [
              {
                answerId: 'd3fa51ba-39ff-4c4d-96f5-67d6c6f1eb8a',
                userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
                answerText: 'No',
              },
            ],
          },
        ],
      },
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
