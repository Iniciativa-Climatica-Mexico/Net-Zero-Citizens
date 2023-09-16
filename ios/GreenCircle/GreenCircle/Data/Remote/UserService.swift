//
//  APIService.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 09/09/23.
//

import Foundation
import Alamofire

/// Inicializar clase de servicio con Singleton
/// Se declaran los métodos para hacer las llamadas al backend
class UserService {
    /// Inicialización de singleton
    static let shared = UserService()
    private let localService = LocalService.shared
    // TODO GET all companies
    
    /// Obtener compañía por id
    ///  - Parameters:
    ///     - url: Backend url para obtener datos
    ///  - Returns: Modelo de compañía o error en cualquier otro caso no válido
    func fetchUserById(url: URL) async -> User? {
        guard let token = localService.getToken() else {
            return nil
        }

        let headers: HTTPHeaders = [
            "Authorization": "Bearer \(token)",
            "Accept": "application/json"
        ]

        let taskRequest = AF.request(url, method: .get, headers: headers).validate()
        let response = await taskRequest.serializingData().response

        switch response.result {
        case .success(let data):
            do {
                return try JSONDecoder().decode(User.self, from: data)
            } catch {
                // Log the error to help with debugging
                print("Failed to decode JSON: \(error)")
                return nil
            }
        case .failure(let error):
            // Log the error to help with debugging
            print("HTTP request failed: \(error)")
            debugPrint(error.localizedDescription)
            return nil
        }
    }

}
