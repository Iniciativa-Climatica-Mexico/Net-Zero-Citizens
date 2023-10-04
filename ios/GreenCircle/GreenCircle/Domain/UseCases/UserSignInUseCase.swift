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
  
  func registerUser(userInfo: CreateUserInfo) async {
    await repository.postRegisterUser(userInfo: userInfo)
  }
  
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
