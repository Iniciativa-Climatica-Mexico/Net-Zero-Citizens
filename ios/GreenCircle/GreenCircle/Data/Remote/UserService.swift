//
//  APIService.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 09/09/23.
//

//import Foundation
//import Alamofire


//class APIService: UserRepository {
//    func fetchUserData(completion: @escaping (User?, Error?) -> Void) {
//        guard let url = URL(string: "http://localhost:3000/api/v1/users/1") else {
//            completion(nil, NSError(domain: "Invalid URL", code: 1, userInfo: nil))
//            return
//        }
//
//        let task = URLSession.shared.dataTask(with: url) { data, response, error in
//            guard let data = data, error == nil else {
//                completion(nil, error)
//                return
//            }
//
//            do {
//                // Imprime los datos JSON crudos para ayudar a diagnosticar el problema
//                print(String(data: data, encoding: .utf8) ?? "Could not print raw JSON")
//
//                // Intenta decodificar los datos JSON a un objeto User
//               let user = try JSONDecoder().decode(User.self, from: data)
//                completion(user, nil)
//            } catch let error {
//                // Si la decodificación falla, imprime el error para saber qué salió mal
//                print("Decoding error: \(error)")
//                completion(nil, error)
//            }
//        }
//
//        task.resume()
//    }
//
//}


import Foundation
import Alamofire

/// Inicializar clase de servicio con Singleton
/// Se declaran los métodos para hacer las llamadas al backend
class UserService {
    /// Inicialización de singleton
    static let shared = UserService()
    // TODO GET all companies
    
    /// Obtener compañía por id
    ///  - Parameters:
    ///     - url: Backend url para obtener datos
    ///  - Returns: Modelo de compañía o error en cualquier otro caso no válido
    func fetchUserById(url: URL) async -> User? {
        let taskRequest = AF.request(url, method: .get).validate()
        let response = await taskRequest.serializingData().response
        switch response.result {
        case .success(let data):
            do {
                return try JSONDecoder().decode(User.self, from: data)
            } catch {
                return nil
            }
        case let .failure(error):
            print(error)
            debugPrint(error.localizedDescription)
            return nil
        }
    }
    
    
}
