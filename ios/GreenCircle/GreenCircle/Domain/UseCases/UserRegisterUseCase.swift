//
//  UserRegisterUseCase.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 18/09/23.
//

import Foundation

/// Caso de uso de registrar un usuario nuevo
class UserRegisterUseCase {
  var repository = UserRepository.shared
  static var shared = UserRegisterUseCase()
  
  /// Llama al repositorio para actualizar el usuario creado automáticamente
  /// - Parameters:
  ///   - authToken: token de autenticación
  ///   - user: información de usuario
  @MainActor
  func postNewUser(authToken: String, user: User) async {
    await repository.putUser(authToken: authToken, user: user)
  }
}
