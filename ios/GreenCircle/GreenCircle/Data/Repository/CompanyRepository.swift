//
//  CompanyRepository.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//
import Foundation

/// Clase representando la estructura de la API para las compañías
class CompanyAPI {
  static let base = "http://localhost:3000/api/v1/company"
  struct Routes {
    static let companies = "/"
  }
}

/// Protocolo con las funciones del repositorio de Compañías
protocol CompanyRepositoryProtocol {
  func getCompanies(authToken: String) async -> PaginatedQuery<Company>?
}

/// Clase con las funciones del repositorio de las compañías
class CompanyRepository: CompanyRepositoryProtocol {
  static let shared = CompanyRepository()
  let nService: NetworkAPIService = NetworkAPIService()

  /// Función que llama al servicio de conexión con la API para postear una  nueva compañía
  /// - Parameters:
  ///   - authToken: token de autenticación
  ///   - company: el objeto con la información de la compañía
  func getCompanies(authToken: String) async -> PaginatedQuery<Company>? {
    await nService
      .getAllCompanies(url:
                    URL(
                      string: "\(CompanyAPI.base)\(CompanyAPI.Routes.companies)")!,
                   authToken: authToken)
  }
}
