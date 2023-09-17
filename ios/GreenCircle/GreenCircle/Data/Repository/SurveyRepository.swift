// 
// SurveyRepository.swift
//  GreenCircle
//
// Created by Dan FuPo on 16/09/23.
//

import Foundation

class SurveyApi {
  static let base = "http://localhost:3000/api/v1"
  struct Routes {
    static let survey = "/survey/pending/:userId"
  }
}

protocol SurveyApiProtocol {
  func getSurvey() async -> SurveyModel?
}

class SurveyRepository: SurveyApiProtocol {
  let service = NetworkAPIService.shared
  static let shared = SurveyRepository()
  
  func getSurvey() async -> SurveyModel? {
    let userId = "A01708302"
    let surveyRoute = SurveyApi.Routes.survey.replacingOccurrences(of: ":userId", with: userId)
    return await service.getPendingSurvey(url: URL(string: "\(Api.base)\(surveyRoute)")!)
  }
  
}
