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
    return repository.getAuthData()!.user
  }
  
//  @MainActor
//  func updateUserData() async {
//    let user = repository.getAuthData()
//
//
//    repository.saveAuthData(authData: user)
//  }
  
}
