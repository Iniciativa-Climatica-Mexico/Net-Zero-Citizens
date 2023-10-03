//
//  CompanyRegisterFormViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import Foundation

/// Struct representando la información necesaria para crear una compañía en el backend
struct PostCompanyData {
  var name: String = ""
  var description: String = ""
  var email: String = ""
  var phone: String = ""
  var webPage: String = ""
  var street: String = ""
  var streetNumber: String = ""
  var city: String = ""
  var state: String = ""
  var zipCode: String = ""
  var userId: String?
  let pdfCurriculumUrl = "a"
  let pdfGuaranteeSecurityUrl = "a"
  let pdfActaConstitutivaUrl = "a"
  let pdfIneUrl = "a"
}

/// ViewModel de la vista del formulario para registrar compañía
class CompanyRegisterFormViewModel: ObservableObject {
  @Published var formState = PostCompanyData()
  @Published var userData: UserAuth
  @Published var showAlert = false
  @Published var errorMessage = ""
  var useCase = CompanyUseCase.shared
  
  init() {
    userData = useCase.getLocalUserData()!.user
  }
  
  /// Función para manejar el submit de la información de la compañía
  /// - Parameter userData: objeto en el entorno con la información del usuario
  @MainActor
  func handleSubmit() async -> Bool{
    do {
      try validate()
      formState.userId = userData.id
      await useCase.registerCompany(company: formState)
      return true
    } catch GCError.validationError(let message) {
      showAlert = true
      errorMessage = message
      return false
    } catch {
      showAlert = true
      errorMessage = "Algo salió mal :(."
      return false
    }
    
  }
  
  /// Función para validar los datos del formulario
  private func validate() throws {
    if formState.name.isEmpty {
      throw GCError.validationError("Por favor ingresa el nombre de tu compañía.")
    }
    
    if formState.description.isEmpty
        || formState.description.count < 5 {
      throw GCError.validationError("Por favor ingresa una descripción.")
    }
    
    if formState.email.isEmpty
        || !Utils.isValidEmail(formState.email) {
      throw GCError.validationError("Por favor ingresa un email válido.")
    }

    
    if formState.phone.isEmpty
        || formState.phone.count != 12 {
      throw GCError.validationError("Por favor ingresa un teléfono válido.")
    }
    
    if formState.street.isEmpty
        || formState.street.count < 3 {
      throw GCError.validationError("Por favor ingresa una calle.")
    }
    
    if formState.streetNumber.isEmpty {
      throw GCError.validationError("Por favor ingresa un número de la calle")
    }

    if formState.city.isEmpty {
      throw GCError.validationError("Por favor ingresa una ciudad válida.")
    }
    
    if formState.zipCode.count < 5 {
      throw GCError.validationError("Por favor ingresa un código postal válido")
    }
  }
}
