//
//  fetchAllEcoInfo.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 14/09/23.
//

import Foundation

protocol FetchAllEcoInfoUseCaseProtocol {
  func fetchAllEcoInfo() async -> [EcoInfo]?
}

class FetchAllEcoInfoUseCase: FetchAllEcoInfoUseCaseProtocol {
  let ecoInfoRepository: EcoInfoRepository

  static let shared = FetchAllEcoInfoUseCase()
  init(ecoInfoRepository: EcoInfoRepository = EcoInfoRepository.shared) {
    self.ecoInfoRepository = ecoInfoRepository
  }

  /// Corte del string donde se encuentra un espacio o la longitud es 150
  /// - Parameters: string de la descripción y entero con máximo de longitud
  /// - Returns: El string cortado
  func limitText(ecoText: String, maxLength: Int) -> String {
    if ecoText.count <= maxLength {
      return ecoText
    }
    var limitedText = String(ecoText.prefix(maxLength))

    if let lastNonSpaceIndex = limitedText.lastIndex(where: { !$0.isWhitespace }) {
      limitedText = String(limitedText[...lastNonSpaceIndex])
    }
    return limitedText
  }

  /// Obtener toda la información que conforma al modelo EcoInfo
  /// - Returns: [EcoInfo]?
  func fetchAllEcoInfo() async -> [EcoInfo]? {
    if var resultEcoInfo = await ecoInfoRepository.fetchAllEcoInfo() {
      resultEcoInfo = resultEcoInfo.map { ecoInfo in
        var modifiedEcoInfo = ecoInfo
        if (modifiedEcoInfo.description ?? "").isEmpty {
          modifiedEcoInfo.description = "No se ha puesto descripción en este post..."
        }
        if (modifiedEcoInfo.coverImage ?? "").isEmpty {
          modifiedEcoInfo.coverImage = "person.crop.circle.badge.xmark"
        }
        modifiedEcoInfo.description = limitText(ecoText: modifiedEcoInfo.description ?? "", maxLength: 150)
        return modifiedEcoInfo
      }
      return resultEcoInfo
    }
    return nil
  }
}
