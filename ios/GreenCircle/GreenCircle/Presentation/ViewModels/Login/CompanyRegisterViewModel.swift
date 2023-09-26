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
  @Published var showAlert = false
  
  /// Función que maneja el SignIn con Google
  /// - Parameter userData: la variable de entorno con los datos del usuario
  /// - Returns: un booleano indicando si el usuario es nuevo o ya está registrado
  @MainActor
  func handleGoogleSignIn() async -> SignInState {
    let res = await useCase.handleSignInButton()
    
    if res == .fail {
      showAlert = true
    }
    
    return res
  }
}
