//
//  fetchAllEcoInfo.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 14/09/23.
//

import Foundation

protocol FetchAllEcoInfoUseCase {
  func fetchAllEcoInfo() async -> PaginatedQuery<EcoInfo>?
}

class FetchAllEcoInfoUseCaseImpl: FetchAllEcoInfoUseCase {
  let ecoInfoRepository: EcoInfoRepository

  static let shared = FetchAllEcoInfoUseCaseImpl()
  init(ecoInfoRepository: EcoInfoRepository = EcoInfoRepository.shared) {
    self.ecoInfoRepository = ecoInfoRepository
  }

  func fetchAllEcoInfo() async -> PaginatedQuery<EcoInfo>? {
    return await ecoInfoRepository.fetchAllEcoInfo()
  }
}
