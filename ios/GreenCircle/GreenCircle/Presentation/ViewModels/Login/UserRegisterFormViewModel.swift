//
//  UserRegisterFormViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

class UserRegisterFormViewModel: ObservableObject {
  var useCase = UserRegisterUseCase.shared
  
  let genders = ["Masculino", "Femenino", "Otro", "Prefiero no decirlo"]
  
  @Published var phone = ""
  @Published var age = ""
  @Published var state = ""
  @Published var gender = ""
  @Published var privacy = false
  @Published var showAlert = false
  
  @MainActor
  func putUserInformation(userData: UserData) async -> Bool {
    do {
      try validateInformation()
      
      userData.user!.phone = phone
      userData.user!.age = Int(age)!
      userData.user!.state = state
      userData.user!.gender = gender
      print(userData.tokens!.authToken)
      
      await useCase.postNewUser(authToken: userData.tokens!.authToken,
                                user: userData.user!)
      return true
    } catch {
      showAlert = true
      return false
    }
  }
  
  private func validateInformation() throws {
    if phone.isEmpty
        || phone.count != 10
        || phone.rangeOfCharacter(from: NSCharacterSet.letters) != nil
        || age.isEmpty
        || Int(age) == nil
        || state.isEmpty
        || gender.isEmpty
        || !privacy {
      throw CustomError.mainError
    }
  }
}

enum CustomError: Error {
  case mainError
}
