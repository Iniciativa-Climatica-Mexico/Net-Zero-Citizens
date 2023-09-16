//
//  ProfileViewModel.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 07/09/23.
//

//import Foundation
//
//class ProfileViewModel: ObservableObject {
//
//    private let fetchUserDataUseCase: FetchUserDataUseCase
//
//    @Published var user: User?
//    @Published var error: Error?
//
//    init(fetchUserDataUseCase: FetchUserDataUseCase) {
//        self.fetchUserDataUseCase = fetchUserDataUseCase
//    }
//
//    func fetchUserData() {
//        fetchUserDataUseCase.execute { user, error in
//            DispatchQueue.main.async {
//                self.user = user
//                self.error = error
//            }
//        }
//    }
//}

import Foundation

/// Implementación de view model de modelo de Compañía
class UserViewModel: ObservableObject {
    /// Caso de uso para hacer fetch de los datos de compañía
    private let fetchUserInfoUseCase: FetchUserInfoUseCase
    
    /// La compañía puede cambiar en la vista (se construye .onAppear())
    @Published var contentUser: User = User(
        userId:"",
        roleId: 0,
        companyId:"",
        googleId: "",
        facebookId: "",
        appleId: "",
        firstName: "",
        lastName: "",
        secondLastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        age: 0,
        state: "",
        sex: "",
        profilePicture: "",
        createdAt: "",
        updatedAt: "",
        CREATED_AT: "",
        UPDATED_AT: ""

        )
    /// Para implementar el caso de uso en la vista que llame al ViewModel Compañía
    init(fetchUserInfoUseCase: FetchUserInfoUseCase = FetchUserInfoUseCaseImpl.shared) {
        self.fetchUserInfoUseCase = fetchUserInfoUseCase
    }
    @MainActor
    /// Obtener información de la compañía mediante el caso de uso
    /// Actualización de la compañía si existe el UUID en base de datos
    
//    func fetchUserById(idUser: String) async {
//        let resultUser = await fetchUserInfoUseCase.fetchUserById(id: idUser)
//        if let resultUser = resultUser {
//            contentUser = resultUser
//        }
//    }
    
    func fetchUserById(idUser: String) async {
        let resultUser = await fetchUserInfoUseCase.fetchUserById(id: idUser)
        if let resultUser = resultUser {
            print("Usuario recibido: \(resultUser)") // Añade esto para ayudarte a depurar
            contentUser = resultUser
        } else {
            print("No se pudo obtener el usuario")
        }
    }
}
