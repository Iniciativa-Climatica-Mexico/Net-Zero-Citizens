//
//  DummyRepository.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/09/23.
//

import Foundation

class Api {

  static let base = APIRoutes.baseURL
  struct Routes {
    static let dummy = "/dummy"
    static let ecoInfo = "/EcoInfo"
  }
}

protocol DummyApiProtocol {
  
}

class DummyRepository: DummyApiProtocol {
  let service = NetworkAPIService.shared
  static let shared = DummyRepository()

}
