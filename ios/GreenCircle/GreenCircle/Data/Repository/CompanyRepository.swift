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
  static let base = "http://macbook-pro-de-ricardo.local:4000/api/v1/company"
  struct Routes {
    static let create = "/create"
    static let company = "/company/"
  }
}

/// Protocolo con las funciones del repositorio de Compañías
protocol CompanyRepositoryProtocol {
  func postCompany(company: PostCompanyData) async
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
      .getRequest(URL(string:
                        "\(CompanyAPI.base)/\(companyId.uuidString.lowercased())")!)
  }
  
  /// Función que llama al servicio de conexión con la API para postear una  nueva compañía
  /// - Parameters:
  ///   - authToken: token de autenticación
  ///   - company: el objeto con la información de la compañía
  func postCompany(company: PostCompanyData) async {
    let params: [String: Any] = [
      "company": [
        "name": company.name,
        "description": company.description,
        "email": company.email,
        "phone": company.phone,
        "webPage": company.webPage,
        "street": company.street,
        "streetNumber": company.streetNumber,
        "city": company.city,
        "state": company.state,
        "zipCode": company.zipCode,
        "userId": company.userId!,
        "pdfCurriculumUrl": company.pdfCurriculumUrl,
        "pdfGuaranteeSecurityUrl": company.pdfGuaranteeSecurityUrl,
        "pdfActaConstitutivaUrl": company.pdfActaConstitutivaUrl,
        "pdfIneUrl": company.pdfIneUrl
      ] as [String : Any]
    ]
    let _: NoResponse? = await service
      .postRequest(URL(
        string: "\(CompanyAPI.base)\(CompanyAPI.Routes.create)")!,
                   body: params)
  }
  
  func fetchAllCompanies() async -> PaginatedQuery<BasicCompany>? {
    return await service
      .getRequest(URL(string: "\(CompanyAPI.base)")!)
  }
  
}
