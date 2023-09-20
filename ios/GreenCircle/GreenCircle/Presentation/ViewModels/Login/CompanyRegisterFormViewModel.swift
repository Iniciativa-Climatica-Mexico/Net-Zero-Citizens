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
  var streetNumber: Int?
  var city: String = ""
  var state: String = ""
  var zipCode: Int?
  var userId: String?
  let pdfCurriculumUrl = "a"
  let pdfGuaranteeSecurityUrl = "a"
  let pdfActaConstitutivaUrl = "a"
  let pdfIneUrl = "a"
}

/// ViewModel de la vista del formulario para registrar compañía
class CompanyRegisterFormViewModel: ObservableObject {
  @Published var formState = PostCompanyData()
  var useCase = RegisterCompanyUseCase.shared
  
  @MainActor
  /// Función para manejar el submit de la información de la compañía
  /// - Parameter userData: objeto en el entorno con la información del usuario
  func handleSubmit(userData: UserData) async {
    formState.userId = userData.user!.id
    await useCase.registerCompany(authToken: userData.tokens!.authToken,
                                  company: formState)
  }
  
  /// Función para validar los datos del formulario
  private func validate() throws {
    if formState.name.isEmpty
        || formState.description.isEmpty
        || formState.email.isEmpty
        || formState.phone.isEmpty
        || formState.phone.count != 10
        || formState.street.isEmpty
        || formState.streetNumber == nil
        || formState.city.isEmpty
        || formState.zipCode == nil
        || formState.zipCode! > 99999
        || formState.zipCode! < 10000 {
      throw CustomError.mainError
    }
  }
}
