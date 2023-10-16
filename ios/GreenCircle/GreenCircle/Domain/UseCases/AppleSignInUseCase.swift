//
//  AppleSignInUseCase.swift
//  GreenCircle
//
//  Created by Dan FuPo on 09/10/23.
//

import Foundation

class AppleSignInUseCase {
  let repository = UserRepository.shared
  static let shared = AppleSignInUseCase()
  
  /// Iniciar sesión con Apple
  /// - Parameters:
  ///   - userId: Id de usuario
  ///   - fullName: Nombre completo
  ///   - email: Correo electrónico
  /// - Returns: Un estado de la operación
  func signIn(userId: String, fullName: String, email: String) async -> SignInState {
    do {
      let authRes = try await repository.postAppleLogin(userId: userId, fullName: fullName, email: email)
      if !authRes.user.id.isEmpty {
        NetworkAPIService.shared.setAuthTokens(authRes.tokens.authToken)
        repository.saveAuthData(authData: authRes)
        
        if authRes.user.roles == "new_user" {
          return .newUser
        } else {
          return .success
        }
      }
      return .fail
    } catch { return .fail}
  }
  
  /// Iniciar sesión con Apple desde background
  /// - Returns: Un estado de la operación
  func backgroundSignIn() async -> SignInState {
    if let authRes = repository.getAuthData() {
      
      NetworkAPIService.shared.setAuthTokens(authRes.tokens.authToken)
      if let user = await repository.fetchUserById(userId: authRes.user.id) {
        if user.roleId == "new_user" {
          return .newUser
        }
      } else {
        return .fail
      }
      return .success
    }
    
    return .fail
  }
  
}
