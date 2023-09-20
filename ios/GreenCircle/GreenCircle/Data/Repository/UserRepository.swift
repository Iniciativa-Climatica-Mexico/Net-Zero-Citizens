//
//  UserRepository.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

/// Clase con la estructura de la API de autenticación
class AuthAPI {
  static let base = "http://localhost:3000/api/v1/auth"
  struct Routes {
    static let googleLogin = "/login/google"
  }
}

/// Clase con la estructura de la API de usuarios
class UserAPI {
  static let base = "http://localhost:3000/api/v1/users"
  struct Routes {
    static let userId = "/:id"
  }
}

/// Protocolo con la declaración del repositorio del usuario
protocol UserRepositoryProtocol {
  func postGoogleLogin(googleToken: String) async -> AuthResponse?
  func putUser(authToken: String, user: User) async
}

/// Clase con la funcionalidad del repositorio de usuario
class UserRepository: UserRepositoryProtocol {
  let nService = NetworkAPIService.shared
  static let shared = UserRepository()
  
  /// Llama al serivicio de API para postear un nuevo usuario por Google
  /// - Parameter googleToken: token proporcionado por Google
  /// - Returns: Una respuesta de autenticación, con Tokens e información del usuario
  func postGoogleLogin(googleToken: String) async -> AuthResponse? {
    return await nService
      .postGoogleSignIn(url: URL(
        string: "\(AuthAPI.base)\(AuthAPI.Routes.googleLogin)")!,
                        googleToken: googleToken)
  }
  
  /// Actualiza la información de un usuario
  /// - Parameters:
  ///   - authToken: token de autenticación
  ///   - user: información del usuario a actualizar
  func putUser(authToken: String, user: User) async {
    let url = URL(
      string: "\(UserAPI.base)\(UserAPI.Routes.userId)"
        .replacingOccurrences(
          of: ":id",
          with: user.id))!
    await nService.putUser(url: url,
                           authToken: authToken,
                           user: user)
  }
}
