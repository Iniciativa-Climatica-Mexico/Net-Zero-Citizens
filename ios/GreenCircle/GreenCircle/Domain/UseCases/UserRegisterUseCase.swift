//
//  UserRegisterUseCase.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 18/09/23.
//

import Foundation

class UserRegisterUseCase {
  var repository = UserRepository.shared
  static var shared = UserRegisterUseCase()
  
  @MainActor
  func postNewUser(authToken: String, user: User) async {
    await repository.putUser(authToken: authToken, user: user)
  }
}
