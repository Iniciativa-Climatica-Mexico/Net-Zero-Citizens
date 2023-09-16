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

  ///  Fetch toda la ecoInfo del  backend
  ///  - Parameter url: ruta al endpoint
  ///  - Returns EcoInfo decoded o error
  func fetchAllEcoInfo(url: URL) async -> [EcoInfo]? {
    let requestTask = AF.request(url, method: .get).validate()
    let response = await requestTask.serializingData().response
    switch response.result {
    case .success(let data):
      do {
        return
          try NetworkAPIService
          .decoder
          .decode([EcoInfo].self, from: data)
      } catch {
        debugPrint(error)
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
  }
}
