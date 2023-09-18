//
//  UserRegisterViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

class UserRegisterViewModel: ObservableObject {
  var useCase = GoogleSignInUseCase()
  
  @MainActor
  func handleGoogleSignIn(userData: UserData) async -> Bool {
    let res = await useCase.handleSignInButton()!

    userData.user = res.user
    userData.tokens = res.tokens
    
    if res.user.roles == "new_user" {
      return true
    }
    return false
  }
}
