//
//  RegisterCompanyUseCase.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//  Modified by Daniel Gutiérrez Gómez 23/09/23

import Foundation

/// Clase representando el caso de uso de registrar una compañía nueva
class CompanyUseCase {
  static let shared = CompanyUseCase()
  let cRepository = CompanyRepository.shared
  let uRepository = UserRepository.shared
  
  func getLocalUserData() -> AuthResponse? {
    return uRepository.getAuthData()
  }
  
  /// Llama al repositorio para crear una compañía nueva
  /// - Parameter company: datos de la compañía
  @MainActor
  func registerCompany(company: PostCompanyData) async {
    await cRepository.postCompany(company: company)
    await uRepository
      .updateUserRole(userId: company.userId!,
                      newRole: "COMAPNY_ROLE_ID")
  }
  
  @MainActor
  func assignCompanyToUser(companyId: String) async throws {
    let userId = uRepository.getAuthData()!.user.id
    try await cRepository.assignCompany(companyId: companyId, userId: userId)
  }
  
  @MainActor
  func fetchAllCompanies() async -> PaginatedQuery<Company>? {
    return await cRepository.fetchAllCompanies()
  }
  
  /// Definición de Caso de uso para hacer el fetch
  ///   - Parameters:UUID de compañía
  ///   - Returns: Modelo de compañía
  @MainActor
  func fetchCompanyById(id: UUID) async -> Company? {
    if var company = await cRepository.fetchCompanyById(companyId: id) {
      if company.webPage?.isEmpty ?? false {
        company.webPage = "No contamos con Página Web"
      }
      if let profilePicture = company.profilePicture, profilePicture.isEmpty {
        company.profilePicture = "person.crop.circle.badge.xmark"
      }
      return company
    }
    return nil
  }
}
