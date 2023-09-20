//
//  CompanyRegisterViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import Foundation

/// View model del registro de la compañía
class CompanyRegisterViewModel: ObservableObject {
  var useCase = GoogleSignInUseCase.shared
  
  @MainActor
  /// Función que maneja el SignIn con Google
  /// - Parameter userData: la variable de entorno con los datos del usuario
  /// - Returns: un booleano indicando si el usuario es nuevo o ya está registrado
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
