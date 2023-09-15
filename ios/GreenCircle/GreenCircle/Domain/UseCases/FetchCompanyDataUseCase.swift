//
//  CompanyInfoRequirement.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation

/// Inicialización de protocolo de casos de uso
protocol FetchCompanyInfoUseCase {
    func fetchCompanyById(id: UUID) async -> Company?
}

/// Inicialización de clase de requerimientos de modelo de compañía
/// No como se hará fetch de los datos, pero si definir los casos de uso
/// para hacerlo
class FetchCompanyInfoUseCaseImpl: FetchCompanyInfoUseCase {
    /// Inicialización de repositorio para poder hacer el fetch de datos de compañía
    let companyDataRepository: CompanyRepository
    /// Creación de Singleton
    static let shared = FetchCompanyInfoUseCaseImpl()
    /// Constructor con recibimiento o por default
    init(companyDataRepository: CompanyRepository = CompanyRepository.shared) {
        self.companyDataRepository = companyDataRepository
    }
    /// Definición de Caso de uso para hacer el fetch
    ///   - Parameters:UUID de compañía
    ///   - Returns: Modelo de compañía
    func fetchCompanyById(id: UUID) async -> Company? {
      if var company = await companyDataRepository.fetchCompanyById(companyId: id) {
        if let webPage = company.webPage, webPage.isEmpty {
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
