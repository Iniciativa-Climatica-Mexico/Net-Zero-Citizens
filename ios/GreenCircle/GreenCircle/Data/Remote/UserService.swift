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
    
    
    private let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInV1aWQiOiJhYmNkLTEyMzQtZWZnaC01Njc4IiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImxvZ2luX3R5cGUiOiJnb29nbGUiLCJyb2xlcyI6WyJhZG1pbiJdLCJnb29nbGVJZCI6IjAxMjM0NTY3ODkiLCJpYXQiOjE2OTUwMDg3MTQsImV4cCI6MTY5NTAwOTAxNH0.4wgpDYVfZ0YGFe0d6XvQlUpsc66t5i0MNZyc7dzbJL4"
    
    private let headers: HTTPHeaders

        private init() {
            self.headers = [
                "Authorization": "Bearer \(self.token)",
                "Accept": "application/json"
            ]
        }
    // TODO GET all companies
    
    /// Obtener compañía por id
    ///  - Parameters:
    ///     - url: Backend url para obtener datos
    ///  - Returns: Modelo de compañía o error en cualquier otro caso no válido
    func fetchUserById(url: URL) async -> User? {
        // Usando el nuevo authToken hardcodeado

        let taskRequest = AF.request(url, method: .get, headers: headers).validate()
        let response = await taskRequest.serializingData().response

        switch response.result {
        case .success(let data):
            let decoder = JSONDecoder()
            decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
            if let jsonString = String(data: data, encoding: .utf8) {
                  print("JSON received: \(jsonString)")
              }
            do {
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
            debugPrint(error.localizedDescription)
            return nil
        }
    }
    
    func UpdateUserData(url: URL, updatedUserData: User) async -> User? {
        do {
            let requestData = try JSONEncoder().encode(updatedUserData)
            
            var request = URLRequest(url: url)
            request.httpMethod = "PUT"
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpBody = requestData
            
            let taskRequest = AF.request(request).validate()
            taskRequest.uploadProgress { progress in
                print("Upload Progress: \(progress.fractionCompleted)")
            }
            
            let response = await taskRequest.serializingData().response
            
            switch response.result {
            case .success(let data):
                let decoder = JSONDecoder()
                decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
                if let jsonString = String(data: data, encoding: .utf8) {
                    print("JSON received: \(jsonString)")
                }
                do {
                    return try decoder.decode(User.self, from: data)
                } catch {
                    print("Failed to decode JSON: \(error)")
                    return nil
                }
            case .failure(let error):
                print("HTTP request failed: \(error)")
                debugPrint(error.localizedDescription)
                return nil
            }
        } catch {
            print(error)
            return nil
        }
    }



        // Update user credentials
    func UpdateUserCredentials(url: URL, newUserCredentials: Credentials) async -> User? {
            do{
                let requestData = try JSONEncoder().encode(newUserCredentials)
                
                var request = URLRequest(url: url)
                request.httpMethod = "PUT"
                request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                request.httpBody = requestData
                
                let taskRequest = AF.request(request).validate()
                taskRequest.uploadProgress { progress in
                    print("Upload Progress: \(progress.fractionCompleted)")
                }
                
                let response = await taskRequest.serializingData().response
                
                switch response.result{
                case .success(let data):
                    let decoder = JSONDecoder()
                    decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
                    if let jsonString = String(data: data, encoding: .utf8){
                        print("JSON received: \(jsonString)")
                    }
                    do {
                        return try decoder.decode(User.self, from: data)
                    }
                    catch {
                        print("Failed to decode JSON: \(error)")
                        return nil
                    }
                case .failure(let error):
                    print("HTTP request failed: \(error)")
                    debugPrint(error.localizedDescription)
                    return nil
                }
            }
            catch{
                print(error)
                return nil
            }
        }
}
