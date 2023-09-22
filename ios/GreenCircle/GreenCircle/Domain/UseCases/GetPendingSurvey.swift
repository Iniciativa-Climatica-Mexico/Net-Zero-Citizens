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
  
  /// - Description: Inicializa el caso de uso de encuestas
  /// - Parameter surveyRepository: SurveyRepository
  init(surveyRepository: SurveyRepository = SurveyRepository.shared) {
    self.surveyRepository = surveyRepository
  }
  
  /// - Description: Obtener encuesta pendiente
  /// - Returns: Modelo de encuesta o nil (SurveyModel?)
  func getPendingSurvey() async -> SurveyModel? {
    return await surveyRepository.getPendingSurvey()
  }
  
  /// - Description: Enviar respuestas de la encuesta
  /// - Parameters:
  ///   - surveyId: ID de la encuesta
  ///   - answers: Las respuestas de la encuesta
  /// - Returns: Bool
  func submitAnswers(surveyId: String, answers: [Answer]) async -> Bool {
    return await surveyRepository.submitAnswers(surveyId: surveyId, answers:answers)
  }
    
}
