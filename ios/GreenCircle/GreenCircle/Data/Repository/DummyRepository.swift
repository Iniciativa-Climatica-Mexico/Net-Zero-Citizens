//
//  DummyRepository.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/09/23.
//

import Foundation

class Api {
  static let base = "http://localhost:3000/api/v1"
  struct Routes {
    static let dummy = "/dummy"
    static let ecoInfo = "/EcoInfo"
  }
}

protocol DummyApiProtocol {
  func getDummies() async -> PaginatedQuery<Dummy>?
}

class DummyRepository: DummyApiProtocol {
  let service = NetworkAPIService.shared
  static let shared = DummyRepository()

  func getDummies() async -> PaginatedQuery<Dummy>? {
    return
      await service
      .getAllDummies(url: URL(string: "\(Api.base)\(Api.Routes.dummy)")!)
  }

}
