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
  static let base = APIRoutes.Company.base
  struct Routes {
    static let create = "/create"
    static let company = "/company/"
    static let uploadFile = "/upload/file"
    static let assing = "/:companyId/assign"
  }
}

struct APIResponse: Codable {
    let message: String
}

struct CreateCompanyResponse: Codable{
    let companyId: String?
    var message: String
}


/// Protocolo con las funciones del repositorio de Compañías
protocol CompanyRepositoryProtocol {
  func postCompany(company: PostCompanyData) async
  func fetchCompanyById(companyId: UUID) async -> Company?
  //func fetchAllCompanies() async -> Company?
    func uploadCompanyFile(file: Data, fileDescription: String, fileFormat: String, mimeType: String) async -> APIResponse?
}


/// Clase con las funciones del repositorio de las compañías
class CompanyRepository: CompanyRepositoryProtocol {
  /// Inicialización de servicio backEnd
  let service: NetworkAPIService
  let local: LocalService
  /// Inicialización de singleton de repositorio de compañía
  static let shared = CompanyRepository()
  /// Constructor que toma el valor del servicio del backEnd
    init(service: NetworkAPIService = NetworkAPIService.shared, local: LocalService = LocalService.shared) {
        self.service = service
        self.local = local
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
            ] as [String : Any]
        ]
        
        do {
            if let response: CreateCompanyResponse = await service.postRequest(URL(string: "\(CompanyAPI.base)\(CompanyAPI.Routes.create)")!, body: params) {
                if let companyId = response.companyId {
                    print("Company id del response: ------- \(companyId)")
                    LocalService.shared.setCompanyId(companyId: companyId)
                }
            }
        } catch {
            print("Error posting company: \(error)")
        }
    }


  
  func assignCompany(companyId: String, userId: String) async throws{
    let url = URL(string: "\(CompanyAPI.base)\(CompanyAPI.Routes.assing)"
      .replacingOccurrences(of: ":companyId", with: companyId))!
    
    let body = ["userId": userId]
    
    let res: NoResponse? = await service.putRequest(url, body: body)
    
    if res == nil {
      throw GCError.requestFailed
    }
  }
  
  func fetchAllCompanies() async -> PaginatedQuery<Company>? {
    return await service
      .getRequest(URL(string: "\(CompanyAPI.base)")!)
  }
  
    /// Funcion para llamar al servicio de subir archivos
    /// - Parameters:
    ///     - file: el archivo seleccionado
    ///     - fileDescription: La descripcion del archivo es un enun
    ///     - fileFormat: procurar que sea un pdf
    ///     - mimeType: el tipo de archivo para que lo entienda AF

    func uploadCompanyFile(file: Data, fileDescription: String, fileFormat: String, mimeType: String) async -> APIResponse? {
        let uploadURL = URL(string: "\(CompanyAPI.base)\(CompanyAPI.Routes.uploadFile)")!
        
        guard let companyId = local.getCompanyId() else {
            // Si no puedes obtener el companyId, decides si quieres devolver un error o continuar
            // Por ahora, simplemente imprimiré un mensaje y retornaré nil. Puedes adaptar esto a tu caso de uso.
            print("Error: No se pudo obtener el companyId")
            return nil
        }
        
        let additionalParameters: [String: Any] = [
            "companyId": companyId,
            "fileDescription": fileDescription,
            "fileFormat": fileFormat,
        ]
        let fileName = "archivo.pdf"
        let mimeType = mimeType
        return await service.uploadFileRequest(uploadURL, file: file, fileName: fileName, mimeType: mimeType, additionalParameters: additionalParameters)
    }
}
