//
//  fetchAllEcoInfo.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 14/09/23.
//

import Foundation

protocol FetchAllEcoInfoUseProtocol {
  func fetchAllEcoInfo() async -> [EcoInfo]?
}

class FetchAllEcoInfoUseCase: FetchAllEcoInfoUseProtocol {
  let ecoInfoRepository: EcoInfoRepository

  static let shared = FetchAllEcoInfoUseCase()
  init(ecoInfoRepository: EcoInfoRepository = EcoInfoRepository.shared) {
    self.ecoInfoRepository = ecoInfoRepository
  }

  func fetchAllEcoInfo() async -> [EcoInfo]? {
    return await ecoInfoRepository.fetchAllEcoInfo()
  }
}
