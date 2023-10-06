//
//  CompanyRepository.swift
//  GreenCircle
//
//  Created by Juan Pablo Cabrera on 06/09/23.
//

import Foundation
import Alamofire

struct ApiCompany {
    static let baseCompany = "http://Mayras-MacBook-Air.local:4000/api/v1/company"
    struct Routes {
        static let company = "/geocoding"
    }
}

protocol GetCoordinatesAPIProtocol {
    func getCoordinates() async -> PaginatedQuery<CompanyCoordinates>?
}


/// Implementación de repoitorio de Compañía con singleton
class GetCoordinatesRepository: GetCoordinatesAPIProtocol {
  /// Inicialización de servicio backEnd
  let service: NetworkAPIService
  /// Inicialización de singleton de repositorio de compañía
  static let shared = GetCoordinatesRepository()
  /// Constructor que toma el valor del servicio del backEnd
  init(service: NetworkAPIService = NetworkAPIService.shared) {
    self.service = service
  }
  /// Obtener compañía por UUID llamando al método del servicio del backend
  ///   - Parameters: UUID de la compañía
  ///   - Returns: Modelo de compañía
  func getCoordinates() async -> PaginatedQuery<CompanyCoordinates>? {
      print(URL(string: "\(ApiCompany.baseCompany)\(ApiCompany.Routes.company)")!)
      return await service.getRequest(URL(string: "\(ApiCompany.baseCompany)\(ApiCompany.Routes.company)")!)
  }
}
