//
//  UserSignIn.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 03/10/23.
//

import Foundation

class UserSignInUseCase {
  static let shared = UserSignInUseCase()
  let repository = UserRepository.shared
  
  func signIn(user: String, password: String) async -> SignInState {
    do {
      let authRes = try await repository.postLogin(user: user, password: password)
      if !authRes.user.id.isEmpty {
        repository.saveAuthData(authData: authRes)
        return .success
      }
      return .fail
    } catch { return .fail }
  }
  
  func backgroundSignIn() -> SignInState {
    if let authRes = repository.getAuthData() {
      
      NetworkAPIService.shared.setAuthTokens(authRes.tokens.authToken)
      return .success
    }
    
    return .fail
  }
}
