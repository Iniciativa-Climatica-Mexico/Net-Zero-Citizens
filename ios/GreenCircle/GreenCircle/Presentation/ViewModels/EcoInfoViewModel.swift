//
//  EcoInfoViewModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 15/09/23.
//

import Foundation

class EcoInfoViewModel: ObservableObject {

  private let fetchEcoInfoUseCase: FetchAllEcoInfoUseCaseProtocol

  @Published var ecoInfoArray: [EcoInfo] = []

  /// Constructor para inicializar arquitectura hasta llegar a network
  init(fetchEcoInfoUseCase: FetchAllEcoInfoUseCaseProtocol = FetchAllEcoInfoUseCase.shared) {
    self.fetchEcoInfoUseCase = fetchEcoInfoUseCase
  }

  /// Función MainActor para binding con vista apartir del fetch de Facebook
  @MainActor
  func fetchAllEcoInfo() async {
    let resultEcoInfo = await fetchEcoInfoUseCase.fetchAllEcoInfo()
    if let resultEcoInfo = resultEcoInfo {
      ecoInfoArray = resultEcoInfo
    }
  }

}
