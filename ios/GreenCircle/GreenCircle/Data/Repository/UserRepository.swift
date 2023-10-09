//
//  UserRepository.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//  Modified by Daniel Gutiérrez Gómez on 03/10/23

import Foundation

/// Clase con la estructura de la API de autenticación
class AuthAPI {
  static let base = APIRoutes.Auth.base
  struct Routes {
    static let googleLogin = "/login/google"
    static let appleLogin = "/login/apple"
    static let login = "/login/credentials"
    static let register = "/register/credentials"
  }
}

/// Clase con la estructura de la API de usuarios
class UserAPI {
  static let base = APIRoutes.User.base
  struct Routes {
    static let userId = "/:userId"
    static let credentials = "users/credentials"
  }
}

/// Protocolo con la declaración del repositorio del usuario
protocol UserRepositoryProtocol {
  func fetchUserById(userId: String) async -> User?
//  func updateUserData(updatedUserData: User, userId: String) async -> User?
  func updateUserCredentials(userId: String, newUserCredentials: Credentials) async -> User?;
  func postGoogleLogin(googleToken: String) async -> AuthResponse?
  func postAppleLogin(userId: String, fullName: String, email: String) async -> AuthResponse?
  func putUser(_ user: UserAuth) async -> Bool
  func deleteUserById(userId: String)  async -> UserDeleteResponse?
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
  
  func postAppleLogin(userId: String, fullName: String, email: String) async throws -> AuthResponse {
    let url = URL(string: "\(AuthAPI.base)\(AuthAPI.Routes.appleLogin)")!
    
    let body = ["email": email, "userId": userId, "fullName": fullName]
    
    let res: AuthResponse? = await nService.postRequest(url, body: body)
    
    if let authResponse = res {
      return authResponse
    } else {
      throw GCError.requestFailed
    }
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
  
  
  func fetchUserById(userId: String) async -> User? {
    return await nService.getRequest(URL(string: "\(UserAPI.base)/\(userId)")!)
  }
  
  
  func updateUserCredentials(userId: String, newUserCredentials: Credentials) async -> User? {
    let url = URL(string: "\(UserAPI.base)/\(UserAPI.Routes.credentials)/\(userId)")!
    return await backEndService.UpdateUserCredentials(url: url, newUserCredentials: newUserCredentials)
  }
  
  func saveAuthData(authData: AuthResponse) {
    lService.setUserInformation(userData: authData)
  }
  
  func getAuthData() -> AuthResponse? {
    return lService.getUserInformation()
  }
  
  func deleteUserById(userId: String)  async -> UserDeleteResponse? {
    let endpoint = UserAPI.base + "/delete" + UserAPI.Routes.userId
          .replacingOccurrences(of: ":userId", with: userId)
        return await NetworkAPIService.shared.deleteRequest(URL(string: endpoint)!)
  }
  
  func postLogin(user: String, password: String) async throws -> AuthResponse {
    let url = URL(string: "\(AuthAPI.base)\(AuthAPI.Routes.login)")!
    
    let body = ["email": user.trimmingCharacters(in: .whitespaces),
                "password": password]
    
    let res: AuthResponse? = await nService.postRequest(url, body: body)
    
    if let authResponse = res {
      return authResponse
    } else {
      throw GCError.requestFailed
    }
  }
  
  func postRegisterUser(userInfo: CreateUserInfo) async throws -> AuthResponse {
    let url = URL(string: "\(AuthAPI.base)\(AuthAPI.Routes.register)")!
    
    let body = ["user":
      [
        "email": userInfo.email,
        "password": userInfo.password,
        "firstName": userInfo.name,
        "lastName": userInfo.lastName
      ]
    ]
    
    let res: AuthResponse? = await nService.postRequest(url, body: body)
    
    if let authResponse = res {
      return authResponse
    } else {
      throw GCError.requestFailed
    }
  }
  
  func updateLocalUserAuth(updatedUserAuth: UserAuth) {
      let encoder = JSONEncoder()
      if let encoded = try? encoder.encode(updatedUserAuth) {
          UserDefaults.standard.set(encoded, forKey: "userAuthData")
      }
  }
  
  func updateUserDataOnServer(user: User) async -> User? {
      let userId = (lService.getUserInformation()?.user.id)!
      let endpoint = "\(UserAPI.base)\(UserAPI.Routes.userId)".replacingOccurrences(of: ":userId", with: userId)
      let encoder = JSONEncoder()
      guard let encodedData = try? encoder.encode(user) else { return nil }

      guard let body = try? JSONSerialization.jsonObject(with: encodedData, options: .allowFragments) as? [String: Any] else { return nil }
      
      let result: NoResponse? = await nService.putRequest(URL(string: endpoint)!, body: body)
      
      if let _ = result {
          return user // Return the updated user data
      } else {
          return nil
      }
  }
  
  func deleteLocalUserData () {
    lService.deleteUserData()
  }
}
