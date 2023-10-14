//
//  SignOutUseCase.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/10/23.
//

import Foundation
import GoogleSignIn

class SignOutUseCase {
  static let shared = SignOutUseCase()
  let repository = UserRepository.shared
  
  func signOut() {
    GIDSignIn.sharedInstance.signOut()
    repository.deleteLocalUserData()
  }
}
