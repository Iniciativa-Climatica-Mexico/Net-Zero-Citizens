//
//  ProfileViewModel.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 07/09/23.
//

import Foundation

class UserImageViewModel: ObservableObject {
    private let repository = UserRepository.shared
    private var local = LocalService.shared
    
    @Published var profilePictureURL: String?
    
    init(local: LocalService = LocalService.shared) {
        self.local = local
    }
    
    private func fetchUserProfilePicture() async {
        if let userId = local.getUserInformation()?.user.id,
           let user = await repository.fetchUserById(userId: userId) {
            profilePictureURL = user.profilePicture
        }
        print(profilePictureURL)
    }
}


/// Implementación de view model de modelo de Compañía
class UserViewModel: ObservableObject {
    /// Caso de uso para hacer fetch de los datos de compañía
    private let useCase = ProfileUseCase.shared
    /// La compañía puede cambiar en la vista (se construye .onAppear())
    @Published var contentUser: UserAuth
    /// Para implementar el caso de uso en la vista que llame al ViewModel Compañía
    init() {
        contentUser = useCase.getUserData()
    }
}
