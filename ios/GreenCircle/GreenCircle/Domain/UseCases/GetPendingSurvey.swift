//
//  GetPendingSurvey.swift
//  GreenCircle
//
//  Created by Dan FuPo on 17/09/23.
//

import Foundation

protocol GetPendingSurveyUseCaseProtocol {
  func getPendingSurvey() async -> SurveyModel?
}

class GetPendingSurveyUseCase: GetPendingSurveyUseCaseProtocol {
  let surveyRepository: SurveyRepository
  
  static let shared = GetPendingSurveyUseCase()
  init(surveyRepository: SurveyRepository = SurveyRepository.shared) {
    self.surveyRepository = surveyRepository
  }
  
  func getPendingSurvey() async -> SurveyModel? {
    return await surveyRepository.getPendingSurvey()
  }
  
}
