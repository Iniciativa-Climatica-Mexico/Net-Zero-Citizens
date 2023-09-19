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
  //@Published var answers: Answer = Answer(scaleValue: 0, answerText: nil, questionId: nil)
  
  init(getPendingSurveyUseCase: SurveyUseCaseProtocol = SurveyUseCase.shared) {
    self.surveyUseCase = getPendingSurveyUseCase as! SurveyUseCase
  }
  
  /*
  init(submitSurveyUseCase: SubmitSurveyUseCaseProtocol = SubmitSurveyUseCase.shared) {
    self.getPendingSurveyUseCase = getPendingSurveyUseCase as! GetPendingSurveyUseCase
  }
   */
  
  @MainActor
  func getPendingSurvey() async {
    self.survey = await surveyUseCase.getPendingSurvey()!
  }

  @MainActor
  func submitAnswers(answers:  [Answer]) async -> Bool {
    return await surveyUseCase.submitAnswers(surveyId: self.survey.surveyId, answers: answers)
  }
  
  
}
