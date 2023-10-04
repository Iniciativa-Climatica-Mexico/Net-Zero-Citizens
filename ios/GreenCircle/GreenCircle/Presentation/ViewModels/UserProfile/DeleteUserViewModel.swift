//
//  DeleteUserViewModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 03/10/23.
//

import Foundation


/// Implementación de viewModel de modelo de DeleteUserViewModel
class DeleteUserViewModel: ObservableObject {
  private let useCase: DeleteUserUseCase
  
  @Published var contentResponse: UserDeleteResponse = UserDeleteResponse(
    message: "", error: "" , status: 0
  )
  
  init(useCase: DeleteUserUseCase = DeleteUserUseCase.shared) {
    self.useCase = useCase
  }
  
  /// - Description:
  ///      Función asíncrona que se encarga de borrar los datos del usuario de google
  ///      modifica el ViewModel de la respuesta recibida del backend
  @MainActor
  func deleteUserById() async throws {
    let userId: String = useCase.getLocalUserData()?.user.id ?? ""
    if let resultDeleteUser = await useCase.deleteUserById(userId: userId) {
      contentResponse = resultDeleteUser
      if resultDeleteUser.message == "User deleted" {
        useCase.lService.deleteUserInformation()
      } else {
        throw GCError.requestFailed
      }
    }
  }
}
