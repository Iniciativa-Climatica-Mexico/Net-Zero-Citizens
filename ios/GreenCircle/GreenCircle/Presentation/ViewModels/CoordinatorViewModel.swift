//
//  CoordinatorViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 26/09/23.
//

import Foundation

class CoordinatorViewModel: ObservableObject {
  var googleUseCase = GoogleSignInUseCase.shared
  var signInUseCase = UserSignInUseCase.shared
  
  func handleSignIn() async -> SignInState {
    if await googleUseCase.handleBackgroundSignIn() == .success {
      return .success
    }
    
    if signInUseCase.backgroundSignIn() == .success {
      return .success
    }
    
    return .fail
  }
}
