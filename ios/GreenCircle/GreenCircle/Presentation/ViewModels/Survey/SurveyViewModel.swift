// 
// SurveyViewModel.swift
//  GreenCircle
//
//  Created by Dan FuPo on 16/09/23.
//

import Foundation

class SurveyViewModel: ObservableObject {
  private let surveyUseCase: SurveyUseCase
  
  @Published var survey: SurveyModel = SurveyModel(surveyId: "", title: "", description: "", questions: [])
  @Published var answers: [Answer] = []
  
  init(getPendingSurveyUseCase: SurveyUseCaseProtocol = SurveyUseCase.shared) {
    self.surveyUseCase = getPendingSurveyUseCase as! SurveyUseCase
  }
  
  @MainActor
  /// - Description: Obtener encuesta pendiente
  func getPendingSurvey() async {

    self.survey = await surveyUseCase.getPendingSurvey()!

    survey.questions.forEach({ question in
      answers.append(Answer(scaleValue: nil, answerText: nil, questionId: question.questionId))
    })
    
  }

  @MainActor
  /// - Description: Enviar respuestas de la encuesta
  /// - Parameter answers: Respuestas de la encuesta
  /// - Returns: Bool
  func submitAnswers() async -> Bool {
    return await surveyUseCase.submitAnswers(surveyId: self.survey.surveyId, answers: self.answers)
  }
  
}
