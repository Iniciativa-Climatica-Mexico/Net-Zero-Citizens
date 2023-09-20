//
//  NetworkAPIService.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/09/23.
//

import Alamofire
import Foundation

class NetworkAPIService {
  static let shared = NetworkAPIService()
  static let decoder = JSONDecoder()

  init() {
    NetworkAPIService.decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
  }

  func getAllDummies(url: URL) async -> PaginatedQuery<Dummy>? {
    let requestTask = AF.request(url, method: .get).validate()
    let response = await requestTask.serializingData().response

    switch response.result {
    case .success(let data):
      do {
        return
          try NetworkAPIService
          .decoder
          .decode(PaginatedQuery<Dummy>.self, from: data)
      } catch {
        debugPrint(error)
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
  }
  
  /// - Description: Obtener encuesta pendiente
  /// - Parameter url: URL
  /// - Returns: Modelo de encuesta o nil (SurveyModel?)
  func getPendingSurvey(url: URL) async -> SurveyModel? {
    let requestTask = AF.request(url, method: .get).validate()
    let response = await requestTask.serializingData().response
    
    switch response.result {
    case .success(let data):
      do {
        return
          try NetworkAPIService
          .decoder
          .decode(SurveyModel.self, from: data)
      } catch {
        debugPrint(error)
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
  }
  
  /// - Description: Enviar respuestas de la encuesta
  /// - Parameters:
  ///   - url: URL
  ///   - answers: Las respuestas de la encuesta
  /// - Returns: Bool
  func submitAnswers(url: URL, answers: [Answer]) async -> Bool {
    let requestTask = AF.request(url, method: .post, parameters: answers, encoder: JSONParameterEncoder.default).validate()
    let response = await requestTask.serializingData().response

    switch response.result {
    case .success:
      return true
    case let .failure(error):
      debugPrint(error)
      return false
    }
  }
}
