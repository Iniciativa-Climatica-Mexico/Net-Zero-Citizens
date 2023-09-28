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
  
  /// Definición de Caso de uso para hacer el fetch
    ///   - Parameters:UUID de compañía
    ///   - Returns: Modelo de compañía
  @MainActor
  func fetchCompanyById(id: UUID) async -> Company? {
    if var company = await repository.fetchCompanyById(companyId: id) {
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
