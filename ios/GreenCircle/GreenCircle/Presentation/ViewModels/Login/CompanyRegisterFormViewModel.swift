//
//  CompanyRegisterFormViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import Foundation

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

class CompanyRegisterFormViewModel: ObservableObject {
  @Published var formState = PostCompanyData()
  var useCase = RegisterCompanyUseCase.shared
  
  @MainActor
  func handleSubmit(userData: UserData) async {
    formState.userId = userData.user!.id
    await useCase.registerCompany(authToken: userData.tokens!.authToken,
                                  company: formState)
  }
  
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
