//
//  NetworkAPIService.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/09/23.
//
import Alamofire
import Foundation

/// Clase con el serivicio de la API
class NetworkAPIService {
  static let shared = NetworkAPIService()
  static let decoder = JSONDecoder()
  
  init() {
    NetworkAPIService.decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
  }
  
  /// Función encargada de postear al backend la información de un nuevo usuario registrado con Google
  /// - Parameters:
  ///   - url: url para hacer el POST
  ///   - googleToken: token de identidad de Google
  /// - Returns: respuesta de autenticación con tokens e información del usuario
  func postGoogleSignIn(url: URL, googleToken: String) async -> AuthResponse? {
    let params: Parameters = ["googleToken": googleToken]
    
    let requestTask = AF.request(url, method: .post,
                                 parameters: params,
                                 encoding: JSONEncoding.default)
      .validate()
    let response = await requestTask.serializingData().response
    
    switch response.result {
    case let .success(data):
      do {
        return try NetworkAPIService.decoder
          .decode(AuthResponse.self, from: data)
      } catch {
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
    
  }
  
  /// Actualiza un usuario con la información proporcionada
  /// - Parameters:
  ///   - url: el url para realizar el PUT
  ///   - authToken: token de autenticación
  ///   - user: la información del usuario a actualizar
  func putUser(url: URL, authToken: String, user: User) async {
    let params: Parameters = [
      "phoneNumber": user.phone!,
      "age": user.age!,
      "gender": user.gender!,
      "state": user.state!,
      "roleId": "CUSTOMER_ROLE_ID"
    ]
    let headers: HTTPHeaders = [.authorization(bearerToken: authToken)]
    let requestTask = AF.request(url, method: .put,
                                 parameters: params,
                                 headers: headers).validate()
    let response = await requestTask.serializingData().response
    
    switch response.result {
    case .success(_):
      return
    case let .failure(error):
      debugPrint(error)
    }
  }
  
  /// Crea una compañía nueva
  /// - Parameters:
  ///   - url: url para hacer el post
  ///   - authToken: token de autenticación
  ///   - company: datos de la compañía a postear
  func postCompany(url: URL, authToken: String, company: PostCompanyData) async {
    let params: Parameters = [
      "company": [
        "name": company.name,
        "description": company.description,
        "email": company.email,
        "phone": company.phone,
        "webPage": company.webPage,
        "street": company.street,
        "streetNumber": company.streetNumber!,
        "city": company.city,
        "state": company.state,
        "zipCode": company.zipCode!,
        "userId": company.userId!,
        "pdfCurriculumUrl": company.pdfCurriculumUrl,
        "pdfGuaranteeSecurityUrl": company.pdfGuaranteeSecurityUrl,
        "pdfActaConstitutivaUrl": company.pdfActaConstitutivaUrl,
        "pdfIneUrl": company.pdfIneUrl
      ] as [String : Any]
    ]
    
    let headers: HTTPHeaders = [.authorization(bearerToken: authToken)]
    let requestTask = AF.request(url, method: .post,
                                 parameters: params,
                                 headers: headers).validate()
    
    let response = await requestTask.serializingData().response
    switch response.result {
    case .success(_):
      return
    case let .failure(error):
      debugPrint(error)
    }
  }
  
  /// - Description: Obtener encuesta pendiente
  /// - Parameter url: URL
  /// - Returns: Modelo de encuesta o nil (SurveyModel?)
  func getPendingSurvey(url: URL) async -> SurveyModel? {
    let requestTask = AF.request(url, method: .get).validate()
    let response = await requestTask.serializingData().response
    
    switch response.result {
    case .success(let data):
      do {
        return
          try NetworkAPIService
          .decoder
          .decode(SurveyModel.self, from: data)
      } catch {
        debugPrint(error)
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
  }
  
  /// - Description: Enviar respuestas de la encuesta
  /// - Parameters:
  ///   - url: URL
  ///   - answers: Las respuestas de la encuesta
  /// - Returns: Bool
  func submitAnswers(url: URL, answers: [Answer]) async -> Bool {
    let requestTask = AF.request(url, method: .post, parameters: answers, encoder: JSONParameterEncoder.default).validate()
    let response = await requestTask.serializingData().response

    switch response.result {
    case .success:
      return true
    case let .failure(error):
      debugPrint(error)
      return false
    }
  }
  
  ///  Fetch toda la ecoInfo del  backend
    ///  - Parameter url: ruta al endpoint
    ///  - Returns EcoInfo decoded o error
    func fetchAllEcoInfo(url: URL) async -> [EcoInfo]? {
      let requestTask = AF.request(url, method: .get).validate()
      let response = await requestTask.serializingData().response
      switch response.result {
      case .success(let data):
        do {
          return
            try NetworkAPIService
            .decoder
            .decode([EcoInfo].self, from: data)
        } catch {
          debugPrint(error)
          return nil
        }
      case let .failure(error):
        debugPrint(error)
        return nil
      }
    }
}
