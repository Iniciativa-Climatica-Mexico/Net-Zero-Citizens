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

/// ViewModel de la vista de formulario de Registro de Usuario
class UserRegisterFormViewModel: ObservableObject {
  var useCase = UserRegisterUseCase.shared
  
  let genders = ["Masculino", "Femenino", "Otro", "Prefiero no decirlo"]
  
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
      await useCase.postNewUser(formState)
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
  
  func format(with mask: String, for string: String) -> String {
    let numbers = string.replacingOccurrences(of: "[^0-9]", with: "", options: .regularExpression)
    var result = ""
    var index = numbers.startIndex
    for ch in mask where index < numbers.endIndex {
      if ch == "X" {
        result.append(numbers[index])
        index = numbers.index(after: index)
      } else {
        result.append(ch)
      }
    }
    return result
  }
  
  /// Valida los datos del formulario
  private func validateInformation() throws {
    if formState.phone.isEmpty
        || formState.phone.count != 10
        || formState.phone.rangeOfCharacter(from: NSCharacterSet.letters) != nil {
      throw GCError.validationError("El teléfono introducido es inválido.")
    }
    
    if formState.age.isEmpty
        || Int(formState.age) == nil {
      throw GCError.validationError("La edad introducida es inválida.")
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
