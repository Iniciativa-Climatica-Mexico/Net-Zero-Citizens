//
//  CompanyRepository.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//  Created by Daniel Gutierresz on 19/09/23.
//

import Foundation

/// Clase representando la estructura de la API para las compañías
class CompanyAPI {
  static let base = "http://localhost:4000/api/v1/company"
  struct Routes {
    static let create = "/create"
    static let company = "/company/"
  }
}

/// Protocolo con las funciones del repositorio de Compañías
protocol CompanyRepositoryProtocol {
  func postCompany(authToken: String, company: PostCompanyData) async
  func fetchCompanyById(companyId: UUID) async -> Company?
  //func fetchAllCompanies() async -> Company?
}

/// Clase con las funciones del repositorio de las compañías
class CompanyRepository: CompanyRepositoryProtocol {
  /// Inicialización de servicio backEnd
  let service: NetworkAPIService
  /// Inicialización de singleton de repositorio de compañía
  static let shared = CompanyRepository()
  /// Constructor que toma el valor del servicio del backEnd
  init(service: NetworkAPIService = NetworkAPIService.shared) {
    self.service = service
  }
  
  /// Obtener compañía por UUID llamando al método del servicio del backend
  ///   - Parameters: UUID de la compañía
  ///   - Returns: Modelo de compañía
  func fetchCompanyById(companyId: UUID) async -> Company? {
    return await service
      .fetchCompanyById(url: URL(string: "\(CompanyAPI.base)/\(companyId.uuidString.lowercased())")!)
  }
  
  /// Función que llama al servicio de conexión con la API para postear una  nueva compañía
  /// - Parameters:
  ///   - authToken: token de autenticación
  ///   - company: el objeto con la información de la compañía
  func postCompany(authToken: String, company: PostCompanyData) async {
    await service
      .postCompany(url:
                    URL(
                      string: "\(CompanyAPI.base)\(CompanyAPI.Routes.create)")!,
                   authToken: authToken, company: company)
  }
  
  func fetchAllCompanies(companyId: UUID) async -> Company? {
    return await service
      .fetchCompanyById(url: URL(string: "\(CompanyAPI.base)\(CompanyAPI.Routes.company)")!)
  }
  
}
