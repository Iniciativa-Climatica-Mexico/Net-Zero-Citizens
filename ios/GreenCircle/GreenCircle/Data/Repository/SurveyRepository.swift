//
// SurveyRepository.swift
//  GreenCircle
//
// Created by Dan FuPo on 16/09/23.
//

import Foundation

class SurveyApi {
  static let base = "http://localhost:4000/api/v1"
  struct Routes {
    static let survey = "/survey/pending/:userId"
    static let submitSurvey = "/survey/:surveyId/answer/:userId"
  }
}

protocol SurveyApiProtocol {
  func getPendingSurvey(userId: String) async -> SurveyModel?
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
  func getPendingSurvey(userId: String) async -> SurveyModel? {
    let surveyRoute = SurveyApi.base + SurveyApi.Routes.survey.replacingOccurrences(of: ":userId", with: userId)
    let url = URL(string: surveyRoute) ?? URL(string: SurveyApi.base + userId)
    return await service.getRequest(url!)
  }
  
  /// - Description: Enviar respuestas de la encuesta
  /// - Parameters:
  ///   - surveyId: El id de la encuesta
  ///   - answers: Las respuestas de la encuesta
  /// - Returns: Bool
  func submitAnswers(surveyId: String, userId: String ,answers : [Answer]) async -> Bool {
    let surveyRoute = SurveyApi.Routes.submitSurvey
      .replacingOccurrences(of: ":userId", with: userId)
      .replacingOccurrences(of: ":surveyId", with: surveyId)
    
    var processAns = [[String: Any]]()
    
    answers.forEach{
      answer in
      if let answerText = answer.answerText {
        processAns.append(["questionId": answer.questionId, "answerText": answerText])
      }
      if let scaleValue = answer.scaleValue {
        processAns.append(["questionId": answer.questionId, "scaleValue": scaleValue])
      }
    }
    
    let body: [String: Any] = ["answers":  processAns]
    
    let res: NoResponse? = await service.postRequest(URL(string: "\(SurveyApi.base)\(surveyRoute)")!, body: body)
    
    if res != nil {
      return true
    } else {
      return false
    }
  }
  
}
