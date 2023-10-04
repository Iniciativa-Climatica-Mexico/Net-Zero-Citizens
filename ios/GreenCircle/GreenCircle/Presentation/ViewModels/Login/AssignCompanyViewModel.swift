//
//  AssignCompanyViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 02/10/23.
//

import Foundation

class AssignCompanyViewModel: ObservableObject {
  @Published var companyId = ""
  @Published var showAlert = false
  @Published var errorMessage = ""
  let useCase = CompanyUseCase()
  
  @MainActor
  func handleSubmit() async -> Bool {
    do {
      try await useCase.assignCompanyToUser(companyId: companyId)
      return true
    } catch {
      showAlert = true
      errorMessage = "Algo salió mal. Intenta de nuevo más tarde"
      return false
    }
  }
}
