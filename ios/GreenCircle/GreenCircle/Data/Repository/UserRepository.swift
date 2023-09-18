//
//  UserRepository.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 09/09/23.
//



//import Foundation
//
//protocol UserRepository {
//    func fetchUserData(completion: @escaping(User?, Error?) -> Void)
//}


import Foundation
import Alamofire

/// Estructura con rutas para modelo de compañía
struct ApiUser {
    static let base = "http://localhost:3000/api/v1"
    struct Routes {
        static let user = "users"
        static let credentials = "users/credentials"
    }
}

/// Protocolo que para cualquier clase que la use debe ser implementada
protocol UserAPIProtocol {
    // GET all companies
    
    /// Obtener compañía por UUID recibido desde el view listCompanies
    ///  - Parameters: UUID
    ///  - Returns: Modelo de Compañía
    func fetchUserById(userId: String) async -> User?
    func updateUserData(updatedUserData: User, userId: String) async -> User?
    func updateUserCredentials(userId: String, newUserCredentials: Credentials) async -> User?;
}

/// Implementación de repoitorio de Compañía con singleton
class UserRepository: UserAPIProtocol {
    /// Inicialización de servicio backEnd
    let backEndService: UserService
    /// Inicialización de singleton de repositorio de compañía
    static let shared = UserRepository()
    
    init(backEndService: UserService = UserService.shared){
        self.backEndService = backEndService
    }
    
    /// Obtener compañía por UUID llamando al método del servicio del backend
    ///   - Parameters: UUID de la compañía
    ///   - Returns: Modelo de compañía

    func fetchUserById(userId: String) async -> User? {
        return await backEndService.fetchUserById(url: URL(string: "\(ApiUser.base)/\(ApiUser.Routes.user)/\(userId)")!)
      }
    
    func updateUserData(updatedUserData: User, userId: String) async -> User? {
        return await backEndService.UpdateUserData(url: URL(string: "\(ApiUser.base)/\(ApiUser.Routes.user)/\(userId)")!, updatedUserData: updatedUserData)
    }

    func updateUserCredentials(userId: String, newUserCredentials: Credentials) async -> User? {
        let url = URL(string: "\(ApiUser.base)/\(ApiUser.Routes.credentials)/\(userId)")!
        return await backEndService.UpdateUserCredentials(url: url, newUserCredentials: newUserCredentials)
    }
}
