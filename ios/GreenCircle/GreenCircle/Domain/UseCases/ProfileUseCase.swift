//
//  ProfileUseCase.swift
//  GreenCircle
//
//  Created by Frida Bailleres González on 28/09/23.
//

import Foundation

class ProfileUseCase {
  static let shared = ProfileUseCase()
  let repository = UserRepository.shared
  
  func getUserData() -> UserAuth {
    /// Se evita el force unwrapping cuando hay un delete del `USER_DATA`
    if let authData = repository.getAuthData()?.user {
      return authData
    } else {
      return UserAuth(first_name: "", last_name: "", uuid: "", email: "", login_type: "", picture: "", roles: "")
    }
  }
  
  @MainActor
  func updateUserData(user: User) async -> User? {
      return await repository.updateUserDataOnServer(user: user)
  }
  
}
