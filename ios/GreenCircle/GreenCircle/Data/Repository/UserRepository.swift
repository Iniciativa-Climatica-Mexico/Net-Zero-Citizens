//
//  UserRepository.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

class AuthAPI {
  static let base = "http://localhost:3000/api/v1/auth"
  struct Routes {
    static let googleLogin = "/login/google"
  }
}

class UserAPI {
  static let base = "http://localhost:3000/api/v1/users"
  struct Routes {
    static let userId = "/:id"
  }
}

protocol UserRepositoryProtocol {
  func postGoogleLogin(googleToken: String) async -> AuthResponse?
}

class UserRepository: UserRepositoryProtocol {
  let nService = NetworkAPIService.shared
  static let shared = UserRepository()
  
  func postGoogleLogin(googleToken: String) async -> AuthResponse? {
    return await nService
      .postGoogleSignIn(url: URL(
        string: "\(AuthAPI.base)\(AuthAPI.Routes.googleLogin)")!,
                        googleToken: googleToken)
  }
  
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
