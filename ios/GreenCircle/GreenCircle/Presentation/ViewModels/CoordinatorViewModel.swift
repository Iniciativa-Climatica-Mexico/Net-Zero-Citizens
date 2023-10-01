//
//  CoordinatorViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 26/09/23.
//

import Foundation

class CoordinatorViewModel: ObservableObject {
  var useCase = GoogleSignInUseCase.shared
  
  func handleSignIn() async -> SignInState {
    return await useCase.handleBackgroundSignIn()
  }
}
