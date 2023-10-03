//
//  UserRegisterFormViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

struct BasicUserInfo {
  var phone = ""
  var age = ""
  var state = ""
  var gender = ""
  var privacy = false
}

let GENDERS = ["Masculino", "Femenino", "Otro", "Prefiero no contestar"]

/// ViewModel de la vista de formulario de Registro de Usuario
class UserRegisterFormViewModel: ObservableObject {
  var useCase = UserRegisterUseCase.shared
  
  @Published var formState = BasicUserInfo()
  @Published var errorMessage = ""
  @Published var showAlert = false
  @Published var userData: UserAuth
  
  init() {
    userData = useCase.getLocalUserData()!.user
  }
  
  /// Función encargada de enviar el post al backend y actualizar el objeto de entorno
  /// - Parameter userData: objeto con la información del usuario
  /// - Returns: un booleano representando si ocurrió un error al validar el formulario
  @MainActor
  func handleSubmit() async -> Bool {
    do {
      try validateInformation()
      formState.phone = formState.phone
        .replacingOccurrences(of: "-", with: "")
      try await useCase.postNewUser(formState)
      return true
    } catch GCError.validationError(let message){
      errorMessage = message
      showAlert = true
      return false
    } catch {
      errorMessage = "Intenta de nuevo más tarde :("
      showAlert = true
      return false
    }
  }
  
  /// Valida los datos del formulario
  private func validateInformation() throws {
    if formState.phone.isEmpty
        || formState.phone.count != 12 {
      throw GCError.validationError("Por favor introduce un teléfono válido.")
    }
    
    if formState.age.isEmpty
        || Int(formState.age)! < 16 {
      throw GCError.validationError("Por favor introduce una edad válida.")
    }
    
    if formState.state.isEmpty {
      throw GCError.validationError("Por favor selecciona un estado.")
    }
    
    if formState.gender.isEmpty {
      throw GCError.validationError("Por favor selecciona tu género.")
    }
    
    if !formState.privacy {
      throw GCError.validationError("Debes aceptar la política de privacidad.")
    }
  }
}
