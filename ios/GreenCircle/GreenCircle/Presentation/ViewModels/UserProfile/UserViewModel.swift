//
//  ProfileViewModel.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 07/09/23.
//

import Foundation

class UserViewModel: ObservableObject {
    private let useCase = ProfileUseCase.shared
    private let lService = LocalService.shared
    private let repository = UserRepository.shared
    
    @Published var contentUser: UserAuth?
    @Published var contentBaseUser: User?
  @Published var tempContentBaseUser: User?
  
    @MainActor
    func getAllUserData(userId: String? = nil) async {
        // Usa el userId proporcionado o obténlo de lService
        let finalUserId = userId ?? lService.getUserInformation()?.user.id
        if let uid = finalUserId {
            do {
                contentBaseUser = try await repository.fetchUserById(userId: uid)
            } catch {
                print("Error fetching user data: \(error)")
            }
        }
    }
    
    @MainActor
    func saveProfileChanges() async {
        if let userToUpdate = contentBaseUser {
            contentBaseUser = await repository.updateUserDataOnServer(user: userToUpdate)
        }
    }

//  @MainActor
//  func saveProfileChanges() async {
//      if let userToUpdate = tempContentBaseUser {
//          tempContentBaseUser = await repository.updateUserDataOnServer(user: userToUpdate)
//          modelUser.contentBaseUser = tempContentBaseUser  // Actualizar la instancia principal solo después de guardar
//      }
//  }
  
    init() {
        contentUser = useCase.getUserData()
        Task {
            await getAllUserData()
        }
    }
}

