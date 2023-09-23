//
//  CompanyInfoRequirement.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation

/// Inicialización de protocolo de casos de uso
protocol FetchCompanyInfoUseCaseProtocol {
  func fetchCompanyById(id: UUID) async -> Company?
}

class FetchCompanyInfoUseCase: FetchCompanyInfoUseCaseProtocol {

  let companyDataRepository: CompanyRepository

  static let shared = FetchCompanyInfoUseCase()

  init(companyDataRepository: CompanyRepository = CompanyRepository.shared) {
    self.companyDataRepository = companyDataRepository
  }
  /// Definición de Caso de uso para hacer el fetch
  ///   - Parameters:UUID de compañía
  ///   - Returns: Modelo de compañía
  func fetchCompanyById(id: UUID) async -> Company? {
    if var company = await companyDataRepository.fetchCompanyById(companyId: id) {
      if !company.webPage.isEmpty {
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
  
  func fetchAllCompanies() async -> PaginatedQuery<Company>? {
    return await companyDataRepository.fetchAllCompanies()
  }
}
