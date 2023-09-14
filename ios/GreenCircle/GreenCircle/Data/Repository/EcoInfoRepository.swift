//
//  EcoInfoRepository.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 14/09/23.
//

import Foundation
import Alamofire

class ApiEcoInfo {
  static let base = "http://localhost:3000/api/v1"
  struct Routes {
    static let ecoInfo = "/ecoinfo"
  }
}

protocol EcoInfoApiProtocol {
  func fetchAllEcoInfo() async -> PaginatedQuery<EcoInfo>?
}

class EcoInfoRepository: EcoInfoApiProtocol {
  let service: NetworkAPIService
  static let shared = EcoInfoRepository()

  init(service: NetworkAPIService = NetworkAPIService.shared) {
    self.service = service
  }
  ///  Fetch toda la ecoInfo del  backend
  ///  - Parameter url: ruta al endpoint
  ///  - Returns EcoInfo decoded o error
  func fetchAllEcoInfo() async -> PaginatedQuery<EcoInfo>? {
    return
      await service
      .fetchAllEcoInfo(url: URL(string: "\(ApiEcoInfo.base)\(ApiEcoInfo.Routes.ecoInfo)")!)
  }

}
