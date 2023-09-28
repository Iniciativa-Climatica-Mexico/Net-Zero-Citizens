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
  /// - Parameters:
  ///   - authToken: token de autenticación del usuario
  ///   - company: datos de la compañía
  @MainActor
  func registerCompany(company: PostCompanyData) async {
    await cRepository.postCompany(company: company)
    await uRepository
      .updateUserRole(userId: company.userId!,
                      newRole: "COMAPNY_ROLE_ID")
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
      print(company.email)
      return company
    }
    return nil
  }
}
