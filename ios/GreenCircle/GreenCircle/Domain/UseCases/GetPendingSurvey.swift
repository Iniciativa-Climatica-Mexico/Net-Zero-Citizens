//
//  GetPendingSurvey.swift
//  GreenCircle
//
//  Created by Dan FuPo on 17/09/23.
//

import Foundation

protocol SurveyUseCaseProtocol {
  func getPendingSurvey() async -> SurveyModel?
  
  func submitAnswers(surveyId: String, answers: [Answer]) async -> Bool
}

class SurveyUseCase: SurveyUseCaseProtocol {
  let surveyRepository: SurveyRepository
  
  static let shared = SurveyUseCase()
  init(surveyRepository: SurveyRepository = SurveyRepository.shared) {
    self.surveyRepository = surveyRepository
  }
  
  func getPendingSurvey() async -> SurveyModel? {
    return await surveyRepository.getPendingSurvey()
  }
  
  func submitAnswers(surveyId: String, answers: [Answer]) async -> Bool {
    return await surveyRepository.submitAnswers(surveyId: surveyId, answers:answers)
  }
    
}
