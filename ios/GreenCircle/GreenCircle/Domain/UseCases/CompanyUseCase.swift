//
//  RegisterCompanyUseCase.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import Foundation

protocol CompanyUseCaseProtocol {
  func fetchAllCompanies() async -> PaginatedQuery<Company>?
  func fetchCompanyById(id: UUID) async -> Company?
}

/// Clase representando el caso de uso de registrar una compañía nueva
class CompanyUseCase {
  static let shared = CompanyUseCase()
  let repository = CompanyRepository.shared
  
  /// Llama al repositorio para crear una compañía nueva
  /// - Parameters:
  ///   - authToken: token de autenticación del usuario
  ///   - company: datos de la compañía
  @MainActor
  func registerCompany(authToken: String, company: PostCompanyData) async {
    await repository.postCompany(authToken: authToken, company: company)
  }
  
  @MainActor
  func fetchAllCompanies() async -> PaginatedQuery<Company>? {
    return await repository.fetchAllCompanies()
  }
}
