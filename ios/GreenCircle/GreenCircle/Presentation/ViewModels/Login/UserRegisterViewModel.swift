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
  @Published var showAlert = false

  /// Función encargada de actualizar el objeto de entorno y realizar el login de Google
  /// - Parameter userData: el objeto de entorno
  /// - Returns: un enum indicando el estado de la operación
  @MainActor
  func handleGoogleSignIn(userData: UserData) async -> SignInState {
    let res = await useCase.handleSignInButton()
    
    if res == .fail {
      showAlert = true
    }
    return res
  }
}
