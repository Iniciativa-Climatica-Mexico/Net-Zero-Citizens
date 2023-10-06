//
//  EcoInfoRepository.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 14/09/23.
//

import Foundation
import Alamofire

class ApiEcoInfo {
  static let base = "http://Mayras-MacBook-Air.local:4000/api/v1"
  struct Routes {
    static let ecoInfo = "/ecoInfo/"
  }
}

protocol EcoInfoApiProtocol {
  func fetchAllEcoInfo() async -> [EcoInfo]?
}

class EcoInfoRepository: EcoInfoApiProtocol {
  let service: NetworkAPIService
  static let shared = EcoInfoRepository()

  init(service: NetworkAPIService = NetworkAPIService.shared) {
    self.service = service
  }
  ///  Fetch toda la ecoInfo del  backend
  ///  - Parameter url: ruta al endpoint
  ///  - Returns: [EcoInfo]?  decoded o error
  func fetchAllEcoInfo() async -> [EcoInfo]? {
    return
      await service
      .getRequest(URL(string: "\(ApiEcoInfo.base)\(ApiEcoInfo.Routes.ecoInfo)")!)
  }

}
