//
//  NetworkAPIService.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/09/23.
//
import Alamofire
import Foundation

struct NoResponse: Codable {}

/// Clase con el serivicio de la API
class NetworkAPIService {
  static let shared = NetworkAPIService()
  private let decoder = JSONDecoder()
  private var session = Session()
  static let local = LocalService()
  
  /// Asigna el tipo de decoding al decoder de la instancia
  init() {
    self.decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
  }

  /// Actualiza el interceptor de la instancia para que utilice los tokens de auth
  func setAuthTokens(_ authToken: String) {
    self.session = Session(interceptor:
                            AuthRequestAdapter(authToken))
  }

  /// Ejecuta la get request a la url proporcionada
  /// - Parameter url: el url a la cuál hacer el request
  /// - Returns: el tipo de dato inferido o nil si falla
  func getRequest<T: Codable>(_ url: URL) async -> T? {
    let requestTask = session
      .request(url).validate()

    let response = await requestTask.serializingData().response

    switch response.result {
    case let .success(data):
      do {
        return try decoder.decode(T.self, from: data)
      } catch {
        debugPrint(error)
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
  }

  /// Ejecuta la post request a la url dada
  /// - Parameters:
  ///   - url: el url a la cual hacer la request
  ///   - body: el body que va en la request
  /// - Returns: la response inferida o nil si falla
  func postRequest<T: Codable>(_ url: URL, body: [String: Any]) async -> T? {
    let requestTask = session
      .request(url, method: .post,
               parameters: body as Parameters,
               encoding: JSONEncoding.default)
      .validate()

    let response = await requestTask.serializingData().response

    switch response.result {
    case let .success(data):
      do {
        return try decoder.decode(T.self, from: data)
      } catch {
        debugPrint(error)
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
  }

  /// Realiza un put request a la url dada
  /// - Parameters:
  ///   - url: la url a la cual hacer el put request
  ///   - body: el body de la request
  /// - Returns: la respuesta inferida o nil si falla
  func putRequest<T: Codable>(_ url: URL, body: [String: Any]) async -> T? {
    let requestTask = session
      .request(url, method: .put,
               parameters: body as Parameters,
               encoding: JSONEncoding.default)
      .validate()

    let response = await requestTask.serializingData().response

    switch response.result {
    case let .success(data):
      do {
        return try decoder.decode(T.self, from: data)
      } catch {
        debugPrint(error)
        return nil
      }
    case let .failure(error):
      debugPrint(error)
      return nil
    }
  }
    /// Realiza un put request a la url dada
    /// - Parameters:
    ///   - url: la url a la cual hacer el put request
    ///   - fileURL: url a donde esta almacenado el archivo en el dispositivo
    ///   
    ///   - body: el body de la request
    /// - Returns: la respuesta inferida o nil si falla
    ///
    enum UploadStatus {
        case success(message: String)
        case failure(message: String)
    }
    
    func uploadFileRequest<T: Codable>(
        _ url: URL,
        file: Data,
        fileParameterName: String = "file",
        fileName: String?,
        mimeType: String?,
        additionalParameters: [String: Any] = [:]
    ) async -> T? {
        var responseResult: T?

        // 1. Obtener el token de LocalService
        guard let authToken = LocalService.shared.getToken()?.tokens.authToken else {
            print("Error: Unable to fetch token")
            return nil
        }

        // Crear encabezados con el token de autenticación
        let headers: HTTPHeaders = [
            "Authorization": "Bearer \(authToken)",
            "Accept": "application/json"
        ]

        do {
            let response = try await AF.upload(multipartFormData: { multipartFormData in
                multipartFormData.append(file, withName: fileParameterName, fileName: fileName, mimeType: mimeType)
                
                for (key, value) in additionalParameters {
                    if let stringValue = value as? String {
                        multipartFormData.append(stringValue.data(using: .utf8)!, withName: key)
                    } else if let dataValue = value as? Data {
                        multipartFormData.append(dataValue, withName: key)
                    }
                }
            }, to: url, headers: headers).serializingData().value

            return responseResult
        } catch {
            print(error)
            return responseResult
        }
    }

  
  /// Realiza un delete request a la url dada
  /// - Parameters:
  ///   - url: la url a la cual hacer el delete request
  /// - Returns: la respuesta inferida o nil si falla
  func deleteRequest<T: Codable>(_ url: URL) async -> T? {
    let requestTask = session
      .request(url, method: .delete)
      .validate()
    
    let response = await requestTask.serializingData().response

    switch response.result {
    case let .success(data):
      do {
        return try decoder.decode(T.self, from: data)
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
