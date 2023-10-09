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
  
  func signIn(userId: String, fullName: String, email: String) async -> SignInState {
    do {
      let authRes = try await repository.postAppleLogin(userId: userId, fullName: fullName, email: email)
      if !authRes.user.id.isEmpty {
        repository.saveAuthData(authData: authRes)
        return .success
      }
      return .fail
    } catch { return .fail}
  }
  
  ///Apple Sign handle session
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
