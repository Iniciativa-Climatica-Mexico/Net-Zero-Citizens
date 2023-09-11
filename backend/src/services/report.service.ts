import { unwrap } from '../../test/utils'
import Answer from '../models/answer.model'
import Question from '../models/question.model'
import QuestionOption from '../models/questionOption.model'
import Survey from '../models/survey.model'

export const getSurveyReport = async (
  surveyId: string
): Promise<Survey | null> => {
  const s = await Survey.findByPk(surveyId, {
    plain: true,
    include: [
      {
        model: Question,
        attributes: ['questionText', 'questionType'],
        include: [
          {
            model: QuestionOption,
            attributes: ['textOption'],
          },
          {
            model: Answer,
            attributes: ['answerText', 'scaleValue'],
          },
        ],
      },
    ],
  })
  return unwrap(s)
}
