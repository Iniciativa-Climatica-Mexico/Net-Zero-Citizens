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
  var appleUseCase = AppleSignInUseCase.shared
  
  func handleSignIn() async -> SignInState {
    var signIn = await googleUseCase.handleBackgroundSignIn()
    if signIn != .fail {
      return signIn
    }
    
    
    signIn = await signInUseCase.backgroundSignIn()
    if signIn != .fail {
      return signIn
    }
    
    signIn = await appleUseCase.backgroundSignIn()
    if signIn != .fail {
      return signIn
    }
    
    return .fail
  }
}
