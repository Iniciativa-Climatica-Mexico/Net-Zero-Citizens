//
//  LoginViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

class LoginViewModel: ObservableObject {
  var useCase = GoogleSignInUseCase()
  
  func handleGoogleSignIn() {
    useCase.handleSignInButton()
  }
}
