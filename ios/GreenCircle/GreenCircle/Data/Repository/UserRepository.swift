//
//  UserRepository.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

/// Clase con la estructura de la API de autenticación
class AuthAPI {
  static let base = "http://localhost:4000/api/v1/auth"
  struct Routes {
    static let googleLogin = "/login/google"
  }
}

/// Clase con la estructura de la API de usuarios
class UserAPI {
  static let base = "http://localhost:4000/api/v1/users"
  struct Routes {
    static let userId = "/:userId"
    static let credentials = "users/credentials"
  }
}

/// Protocolo con la declaración del repositorio del usuario
protocol UserRepositoryProtocol {
  func fetchUserById(userId: String) async -> User?
  func updateUserData(updatedUserData: User, userId: String) async -> User?
  func updateUserCredentials(userId: String, newUserCredentials: Credentials) async -> User?;
  func postGoogleLogin(googleToken: String) async -> AuthResponse?
  func putUser(_ user: UserAuth) async -> Bool
}


/// Clase con la funcionalidad del repositorio de usuario
class UserRepository: UserRepositoryProtocol {
  
  let backEndService: UserService
  let nService = NetworkAPIService.shared
  let lService = LocalService.shared
  static let shared = UserRepository()
  
  init(backEndService: UserService = UserService.shared){
    self.backEndService = backEndService
    
  }
  
  /// Llama al serivicio de API para postear un nuevo usuario por Google
  /// - Parameter googleToken: token proporcionado por Google
  /// - Returns: Una respuesta de autenticación, con Tokens e información del usuario
  func postGoogleLogin(googleToken: String) async -> AuthResponse? {
    let params: [String: Any] = ["googleToken": googleToken, "ios": "true"]
    return await nService
      .postRequest(URL(
        string: "\(AuthAPI.base)\(AuthAPI.Routes.googleLogin)")!,
                   body: params)
  }
  
  /// Actualiza la información de un usuario
  /// - Parameters:
  ///   - user: información del usuario a actualizar
  func putUser(_ user: UserAuth) async -> Bool{
    var gender: String
    
    switch user.gender {
    case "Masculino":
      gender = "masculine"
    case "Femenino":
      gender = "femenine"
    case "Otro":
      gender = "other"
    default:
      gender = "no_answer"
    }
    
    let params: [String: Any] = [
      "phoneNumber": user.phone!,
      "age": user.age!,
      "gender": gender,
      "state": user.state!,
      "roleId": "CUSTOMER_ROLE_ID"
    ]
    
    let url = URL(
      string: "\(UserAPI.base)\(UserAPI.Routes.userId)"
        .replacingOccurrences(
          of: ":userId",
          with: user.id))!
    
    let res: NoResponse? = await nService.putRequest(url, body: params)
    return res != nil
  }
  
  func updateUserRole(userId: String, newRole: String) async {
    let params: [String: Any] = [
      "roleId": newRole
    ]
    
    let url = URL(
      string: "\(UserAPI.base)\(UserAPI.Routes.userId)"
        .replacingOccurrences(
          of: ":userId",
          with: userId))!
    
    let _: NoResponse? = await nService.putRequest(url, body: params)
  }
  
  //func updateUserData()
  
  func fetchUserById(userId: String) async -> User? {
    return await backEndService.fetchUserById(url: URL(string: "\(UserAPI.base)/\(userId)")!)
  }
  
  func updateUserData(updatedUserData: User, userId: String) async -> User? {
    return await backEndService.UpdateUserData(url: URL(string: "\(UserAPI.base)/\(userId)")!, updatedUserData: updatedUserData)
  }
  
  func updateUserCredentials(userId: String, newUserCredentials: Credentials) async -> User? {
    let url = URL(string: "\(UserAPI.base)/\(UserAPI.Routes.credentials)/\(userId)")!
    return await backEndService.UpdateUserCredentials(url: url, newUserCredentials: newUserCredentials)
  }
  
    func saveAuthData(authData: AuthResponse) {
        lService.setToken(userData: authData)
        print("User: \(authData.user)")
    }

  func getAuthData() -> AuthResponse? {
    return lService.getToken()
  }
}
