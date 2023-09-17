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
    
    struct Credentials: Codable {
        let email: String
        let password: String
    }
    
    private let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInV1aWQiOiJhYmNkLTEyMzQtZWZnaC01Njc4IiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImxvZ2luX3R5cGUiOiJnb29nbGUiLCJyb2xlcyI6WyJhZG1pbiJdLCJnb29nbGVJZCI6ImEiLCJpYXQiOjE2OTQ5ODU1NzEsImV4cCI6MTY5NDk4NTg3MX0.sbbV_CEYLsA5mHEQULoILtl1hfTxM4Duw8-illcnXKE"
    
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
            debugPrint(error.localizedDescription)
            return nil
        }
    }
    
    func UpdateUserData(url: URL, updatedUserData: User) async -> User? {
        do {
            let requestData = try JSONEncoder().encode(updatedUserData)

            let taskRequest = AF.request(url, method: .put, parameters: nil, encoding: JSONEncoding.default, headers: headers).validate()
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
//        func UpdateUserCredentials(userId: String, newUserCredentials: Credentials) async -> User? {
//            do {
//                // Construct the URL for updating user credentials
//                let urlString = "http://localhost:3000/api/v1/users/credentials/\(userId)"
//                let urlForCredentialsUpdate = URL(string: urlString)!
//
//                var request = URLRequest(url: urlForCredentialsUpdate)
//                request.httpMethod = "PUT"
//                request.setValue("application/json", forHTTPHeaderField: "Content-Type")
//
//                // Encode the updated user data as JSON
//                let userInfo = User(userId: userId, roleId: 0, companyId: nil, googleId: nil, facebookId: nil, appleId: nil, firstName: "", lastName: "", secondLastName: nil, email: newUserCredentials.email, password: newUserCredentials.password, phoneNumber: "", age: 0, state: "", sex: "", profilePicture: nil, createdAt: "", updatedAt: "", CREATED_AT: "", UPDATED_AT: "")
//
//                let requestData = try JSONEncoder().encode(userInfo)
//                request.httpBody = requestData
//
//                let taskRequest = AF.request(request).validate()
//                let response = await taskRequest.serializingData().response
//
//                switch response.result {
//                case .success(let data):
//                    do {
//                        // Parse and return the updated user data
//                        return try JSONDecoder().decode(User.self, from: data)
//                    } catch {
//                        return nil
//                    }
//                case .failure(let error):
//                    print(error)
//                    debugPrint(error.localizedDescription)
//                    return nil
//                }
//            } catch {
//                print(error)
//                return nil
//            }
//        }

}
