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
        // Usando el nuevo authToken hardcodeado
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInV1aWQiOiJhYmNkLTEyMzQtZWZnaC01Njc4IiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImxvZ2luX3R5cGUiOiJnb29nbGUiLCJyb2xlcyI6WyJhZG1pbiJdLCJnb29nbGVJZCI6IjAxMjM0NTY3ODkiLCJpYXQiOjE2OTQ5ODYwNjksImV4cCI6MTY5NDk4NjM2OX0.tG0AfaW16YdDjIpFcCafAZiUdUxKIMHYZtXfg8VGneE"
        

        let headers: HTTPHeaders = [
            "Authorization": "Bearer \(token)",
            "Accept": "application/json"
        ]

        let taskRequest = AF.request(url, method: .get, headers: headers).validate()
        print("Request")
        print(taskRequest)
        print("URL: \(url.absoluteString)")

        let response = await taskRequest.serializingData().response
        print("Response")
        print(response)

        switch response.result {
        case .success(let data):
            let decoder = JSONDecoder()
            decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
            if let jsonString = String(data: data, encoding: .utf8) {
                  print("JSON received: \(jsonString)")
              }
            do {
                        let decoder = JSONDecoder()
                        decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
                        return try decoder.decode(User.self, from: data)
                    } catch {
                        // Log the error to help with debugging
                        print("Failed to decode JSON: \(error)")
                        return nil
                    }
        case .failure(let error):
            // Log the error to help with debugging
            print("HTTP request failed: \(error)")
            print("error aqui jajajaj")
            debugPrint(error.localizedDescription)
            return nil
        }
    }

}
