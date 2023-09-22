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
struct UserAPI {
    static let base = "http://localhost:3000/api/v1"
    struct Routes {
        static let user = "users"
        static let credentials = "users/credentials"
        static let userId = "/:id"
    }
}

class AuthAPI {
  static let base = "http://localhost:3000/api/v1/auth"
  struct Routes {
    static let googleLogin = "/login/google"
  }
}

/// Protocolo que para cualquier clase que la use debe ser implementada
protocol UserRepositoryProtocol {
    // GET all companies
    
    /// Obtener compañía por UUID recibido desde el view listCompanies
    ///  - Parameters: UUID
    ///  - Returns: Modelo de Compañía
    func fetchUserById(userId: String) async -> User?
    func updateUserData(updatedUserData: User, userId: String) async -> User?
    func updateUserCredentials(userId: String, newUserCredentials: Credentials) async -> User?;
    
    func postGoogleLogin(googleToken: String) async -> AuthResponse?
    func putUser(authToken: String, user: User) async
    
}

/// Implementación de repoitorio de Compañía con singleton
class UserRepository: UserRepositoryProtocol {
    /// Inicialización de servicio backEnd
    let backEndService: UserService
    let nService = NetworkAPIService.shared
    /// Inicialización de singleton de repositorio de compañía
    static let shared = UserRepository()
    
    init(backEndService: UserService = UserService.shared){
        self.backEndService = backEndService
        
    }
    
    func putUser(authToken: String, user: User) async {
        let url = URL(
          string: "\(UserAPI.base)\(UserAPI.Routes.userId)"
            .replacingOccurrences(
              of: ":id",
              with: user.userId))!
        await nService.putUser(url: url,
                               authToken: authToken,
                               user: user)
      }
    
    func postGoogleLogin(googleToken: String) async -> AuthResponse? {
        return await nService
          .postGoogleSignIn(url: URL(
            string: "\(AuthAPI.base)\(AuthAPI.Routes.googleLogin)")!,
                            googleToken: googleToken)
      }
    
    /// Obtener compañía por UUID llamando al método del servicio del backend
    ///   - Parameters: UUID de la compañía
    ///   - Returns: Modelo de compañía
    ///   

    func fetchUserById(userId: String) async -> User? {
        return await backEndService.fetchUserById(url: URL(string: "\(UserAPI.base)/\(UserAPI.Routes.user)/\(userId)")!)
      }
    
    func updateUserData(updatedUserData: User, userId: String) async -> User? {
        return await backEndService.UpdateUserData(url: URL(string: "\(UserAPI.base)/\(UserAPI.Routes.user)/\(userId)")!, updatedUserData: updatedUserData)
    }

    func updateUserCredentials(userId: String, newUserCredentials: Credentials) async -> User? {
        let url = URL(string: "\(UserAPI.base)/\(UserAPI.Routes.credentials)/\(userId)")!
        return await backEndService.UpdateUserCredentials(url: url, newUserCredentials: newUserCredentials)
    }
}
