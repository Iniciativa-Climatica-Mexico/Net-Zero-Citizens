//
//  LoginViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

/// Un enum representando el estado de la operación de login
enum SignInState {
  case newUser
  case success
  case fail
}

class LoginViewModel: ObservableObject {
  var useCase = GoogleSignInUseCase.shared
  var lService = LocalService.shared
  @Published var showAlert = false
  
  /// Función encargada de realizar el SignIn con Google y actualizar la información de entorno
  /// - Parameter userData: objeto de entorno
  /// - Returns: un enum indicando el estado de la operación
  @MainActor
  func handleGoogleSignIn() async -> SignInState {
    let res = await useCase.handleSignInButton()
    
    if res == .fail {
      showAlert = true
    }
    
    return res
  }
}
