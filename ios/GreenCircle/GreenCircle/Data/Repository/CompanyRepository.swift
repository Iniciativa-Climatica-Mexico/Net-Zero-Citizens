//
//  CompanyRepository.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation
import Alamofire

/// Estructura con rutas para modelo de compañía
struct ApiCompany {
    static let baseCompany = "http://localhost:3000/api/v1/company"
    struct Routes {
        static let company = "/company/"
    }
}

/// Protocolo que para cualquier clase que la use debe ser implementada
protocol CompanyAPIProtocol {
    // GET all companies
    
    /// Obtener compañía por UUID recibido desde el view listCompanies
    ///  - Parameters: UUID
    ///  - Returns: Modelo de Compañía
    func fetchCompanyById(companyId: UUID) async -> Company?
}

/// Implementación de repoitorio de Compañía con singleton
class CompanyRepository: CompanyAPIProtocol {
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
        return await service.fetchCompanyById(url: URL(string: "\(ApiCompany.baseCompany)/\(companyId.uuidString.lowercased())")!)
    }
}
