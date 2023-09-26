//
//  NetworkAPIService.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/09/23.
//
import Alamofire
import Foundation

struct NoResponse: Codable {}

/// Clase con el serivicio de la API
class NetworkAPIService {
  static let shared = NetworkAPIService()
  private let decoder = JSONDecoder()
  private var session = Session()
  
  init() {
    self.decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
  }
  
  func setAuthTokens(_ authToken: String) {
    self.session = Session(interceptor:
                            AuthRequestAdapter(authToken))
  }
  
  func getRequest<T: Codable>(_ url: URL) async -> T? {
    let requestTask = session
      .request(url).validate()
    
    let response = await requestTask.serializingData().response
    
    switch response.result {
    case let .success(data):
      do {
        return try decoder.decode(T.self, from: data)
      } catch {
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
  }
  
  func postRequest<T: Codable>(_ url: URL, body: [String: Any]) async -> T? {
    let requestTask = session
      .request(url, method: .post,
               parameters: body as Parameters,
               encoding: JSONEncoding.default)
      .validate()
    
    let response = await requestTask.serializingData().response
    
    switch response.result {
    case let .success(data):
      do {
        return try decoder.decode(T.self, from: data)
      } catch {
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
  }
  
  func putRequest<T: Codable>(_ url: URL, body: [String: Any]) async -> T? {
    let requestTask = session
      .request(url, method: .put,
               parameters: body as Parameters,
               encoding: JSONEncoding.default)
      .validate()
    
    let response = await requestTask.serializingData().response
    
    switch response.result {
    case let .success(data):
      do {
        return try decoder.decode(T.self, from: data)
      } catch {
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
  }
}
