//
//  DeleteUserUseCase.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 03/10/23.
//

import Foundation

/// Clase representando el caso de uso de favoritos de proveedores
class DeleteUserUseCase {
  static let shared = DeleteUserUseCase()
  let uRepository = UserRepository.shared
  
  // Obtener los tokens del usuario (userId)
  let lService = LocalService.shared
  
  /// - Description: Obtener el ID del user para poder  hacer el delete
  func getLocalUserData() -> AuthResponse? {
    return uRepository.getAuthData()
  }
  
  /// - Description: Delete de un user con param (userId) asíncrono
  /// - Parameters:
  ///    - userId
  /// - Returns:
  ///    - `UserDeleteResponse?` objeto representando la respuesta desde backend.
  @MainActor
  func deleteUserById(userId: String) async -> UserDeleteResponse? {
    return await uRepository.deleteUserById(userId: userId)
  }
  
}
