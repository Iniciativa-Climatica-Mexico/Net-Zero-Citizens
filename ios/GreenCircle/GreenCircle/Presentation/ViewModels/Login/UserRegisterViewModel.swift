//
//  UserRegisterViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

struct CreateUserInfo {
  var name = ""
  var lastName = ""
  var email = ""
  var password = ""
  var confirmPassword = ""
}

/// ViewModel de la vista de registro de usuario
class UserRegisterViewModel: ObservableObject {
  var googleUseCase = GoogleSignInUseCase.shared
  var signInUseCase = UserSignInUseCase.shared
  @Published var showAlert = false
  @Published var alertMessage = ""
  @Published var formState = CreateUserInfo()
  
  /// Función encargada de actualizar el objeto de entorno y realizar el login de Google
  /// - Parameter userData: el objeto de entorno
  /// - Returns: un enum indicando el estado de la operación
  @MainActor
  func handleGoogleSignIn() async -> SignInState {
    let res = await googleUseCase.handleSignInButton()
    
    if res == .fail {
      showAlert = true
    }
    return res
  }
  
  @MainActor
  func registerUser() async -> SignInState {
    let res = await signInUseCase.registerUser(userInfo: formState)
    
    if res == .fail {
      showAlert = true
      alertMessage = "Intenta de nuevo más tarde."
    }
    
    return res
  }
}
