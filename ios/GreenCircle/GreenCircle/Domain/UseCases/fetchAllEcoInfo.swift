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

  /// Trim the limit text where a whitespace is found or length is 150
  /// - Parameters: string of description and int of max length
  /// - Returns: The trimmed string
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
