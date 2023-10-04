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
  @Published var errMessage = ""
  @Published var showAlert = false
  @Published var success = false
  
  init(getPendingSurveyUseCase: SurveyUseCaseProtocol = SurveyUseCase.shared) {
    self.surveyUseCase = getPendingSurveyUseCase as! SurveyUseCase
  }
  
  @MainActor
  func handleSubmit() async {
    do {
      try validateResponses()
      try await submitAnswers()
      errMessage = "Se han enviado tus respuestas con éxito"
      showAlert = true
      success = true
      return
    } catch GCError.validationError(let message) {
      errMessage = message
      showAlert = true
      return
    } catch {
      errMessage = "Intenta de nuevo más tarde :("
      showAlert = true
      return
    }
  }
  
  @MainActor
  /// - Description: Obtener encuesta pendiente
  func getPendingSurvey() async -> Bool {
    
    if let pending = await surveyUseCase.getPendingSurvey() {
      self.survey = pending
      
      survey.questions.forEach({ question in
        answers.append(Answer(scaleValue: nil, answerText: nil, questionId: question.questionId))
      })
      
      return true
    }
    
    return false
  }
  
  @MainActor
  /// - Description: Enviar respuestas de la encuesta
  /// - Parameter answers: Respuestas de la encuesta
  /// - Returns: Bool
  func submitAnswers() async throws {
    if await !surveyUseCase.submitAnswers(surveyId: self.survey.surveyId, answers: self.answers){
      throw GCError.requestFailed
    }
    
  }
  
  /// - Description: Corroborar que una pregunta requerida este respondida
  /// - Returns: Bool
  func validateResponses() throws {
    for (index, question) in survey.questions.enumerated() {
      if question.isRequired {
        if (answers[index].answerText == "" || answers[index].answerText == nil)
            && (answers[index].scaleValue == 0 || answers[index].scaleValue == nil) {
          throw GCError.validationError("No has respondido una pregunta requerida")
        }
      }
    }
  }
}
