//
//  UserRegisterViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

/// ViewModel de la vista de registro de usuario
class UserRegisterViewModel: ObservableObject {
  var useCase = GoogleSignInUseCase.shared
  
  @MainActor
  /// Función encargada de actualizar el objeto de entorno y realizar el login de Google
  /// - Parameter userData: el objeto de entorno
  /// - Returns: un booleano indicando el éxito de la función
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
