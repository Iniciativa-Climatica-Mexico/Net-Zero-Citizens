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
  let repository: SurveyRepository
  let uRepository: UserRepository
  
  static let shared = SurveyUseCase()
  
  
  /// - Description: Inicializa el caso de uso de encuestas
  /// - Parameter surveyRepository: SurveyRepository
  init(surveyRepository: SurveyRepository = SurveyRepository.shared,
       userRepository: UserRepository = UserRepository.shared) {
    self.repository = surveyRepository
    self.uRepository = userRepository
  }
  
  /// - Description: Obtener encuesta pendiente
  /// - Returns: Modelo de encuesta o nil (SurveyModel?)
  func getPendingSurvey() async -> SurveyModel? {
    let userId = uRepository.getAuthData()!.user.id
    return await repository.getPendingSurvey(userId: userId)
  }
  
  /// - Description: Enviar respuestas de la encuesta
  /// - Parameters:
  ///   - surveyId: ID de la encuesta
  ///   - answers: Las respuestas de la encuesta
  /// - Returns: Bool
  func submitAnswers(surveyId: String, answers: [Answer]) async -> Bool {
    let userId = uRepository.getAuthData()!.user.id
    return await repository.submitAnswers(surveyId: surveyId, userId: userId ,answers:answers)
  }
    
}
