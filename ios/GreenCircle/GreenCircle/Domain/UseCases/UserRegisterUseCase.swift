//
//  UserRegisterUseCase.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 18/09/23.
//

import Foundation

protocol UserInfoUseCaseProtocol {
  func fetchUserById(id: String) async -> User?
  func execute(updatedUserData: User, userId: String) async -> User?
  func updateCredentials(userId: String, newUserCredentials: Credentials) async -> User?
}

/// Caso de uso de registrar un usuario nuevo
class UserRegisterUseCase {
  var repository = UserRepository.shared
  static var shared = UserRegisterUseCase()
  
  func getLocalUserData() -> AuthResponse? {
    return repository.getAuthData()
  }
  
  /// Llama al repositorio para actualizar el usuario creado automáticamente
  /// - Parameters:
  ///   - authToken: token de autenticación
  ///   - user: información de usuario
  @MainActor
  func postNewUser(_ user: BasicUserInfo) async {
    guard var userData = repository.getAuthData() else { return }
    
    userData.user.age = Int(user.age)
    userData.user.gender = user.gender
    userData.user.phone = user.phone
    userData.user.state = user.state
    
    await repository.putUser(userData.user)
    repository.saveAuthData(authData: userData)
  }
  
  @MainActor
  func fetchUserById(id: String) async -> User? {
    return await repository.fetchUserById(userId: id)
  }
  
  @MainActor
  func execute(updatedUserData: User, userId: String) async -> User? {
    return await repository.updateUserData(updatedUserData: updatedUserData, userId: userId)
  }
  
  @MainActor
  func updateCredentials(userId: String, newUserCredentials: Credentials) async -> User? {
    return await repository.updateUserCredentials(userId: userId, newUserCredentials: newUserCredentials)
  }
  
  
}
