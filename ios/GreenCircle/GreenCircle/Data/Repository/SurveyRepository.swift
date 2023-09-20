// 
// SurveyRepository.swift
//  GreenCircle
//
// Created by Dan FuPo on 16/09/23.
//

import Foundation
import Alamofire

class SurveyApi {
  static let base = "http://localhost:5050/api/v1"
  struct Routes {
    static let survey = "/survey/pending/:userId"
    static let submitSurvey = "/survey/:surveyId/answer/:userId"
  }
}

protocol SurveyApiProtocol {
  func getPendingSurvey() async -> SurveyModel?
}

class SurveyRepository: SurveyApiProtocol {
  let service: NetworkAPIService
  static let shared = SurveyRepository()
  
  /// - Description: Inicializa el repositorio de encuestas
  /// - Parameter service: NetworkAPIService
  init(service: NetworkAPIService = NetworkAPIService.shared) {
    self.service = service
  }
  
  /// - Description: Obtener encuesta pendiente
  /// - Returns: Modelo de encuesta o nil (SurveyModel?)
  func getPendingSurvey() async -> SurveyModel? {
    let userId = "abcd-1234-efgh-5678"
    let surveyRoute = SurveyApi.Routes.survey.replacingOccurrences(of: ":userId", with: userId)
    return await service.getPendingSurvey(url: URL(string: "\(SurveyApi.base)\(surveyRoute)")!)
  }
  
  /// - Description: Enviar respuestas de la encuesta
  /// - Parameters:
  ///   - surveyId: El id de la encuesta
  ///   - answers: Las respuestas de la encuesta
  /// - Returns: Bool
  func submitAnswers(surveyId: String, answers : [Answer]) async -> Bool {
    let userId = "abcd-1234-efgh-5678"
    let surveyId = "surv-5555-efgh-3333"
    let surveyRoute = SurveyApi.Routes.submitSurvey.replacingOccurrences(of: ":userId", with: userId)
      .replacingOccurrences(of: ":surveyId", with: surveyId)
    
    return await service.submitAnswers(url: URL(string: "\(SurveyApi.base)\(surveyRoute)")!, answers: answers)
  }
  
}
