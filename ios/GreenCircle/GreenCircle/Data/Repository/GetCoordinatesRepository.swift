//
//  CompanyRepository.swift
//  GreenCircle
//
//  Created by Juan Pablo Cabrera on 06/09/23.
//

import Foundation
import Alamofire

struct ApiCompany {
    static let baseCompany = "http://localhost:3000/api/v1/company"
    struct Routes {
        static let company = "/geocoding"
    }
}

protocol GetCoordinatesAPIProtocol {
    func getCoordinates() async -> PaginatedQuery<Company>?
}


/// Implementación de repoitorio de Compañía con singleton
class GetCoordinatesRepossitory: GetCoordinatesAPIProtocol {
  /// Inicialización de servicio backEnd
  let service: NetworkAPIService
  /// Inicialización de singleton de repositorio de compañía
  static let shared = GetCoordinatesRepossitory()
  /// Constructor que toma el valor del servicio del backEnd
  init(service: NetworkAPIService = NetworkAPIService.shared) {
    self.service = service
  }
  /// Obtener compañía por UUID llamando al método del servicio del backend
  ///   - Parameters: UUID de la compañía
  ///   - Returns: Modelo de compañía
  func getCoordinates(companyId: UUID) async -> PaginatedQuery<Company>? {
    return await service.getRequest(URL(string: "\(ApiCompany.baseCompany)/\(companyId.uuidString.lowercased())")!)
  }
}
