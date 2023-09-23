//
//  ProfileViewModel.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 07/09/23.
//

import Foundation
//...

/// Implementación de view model de modelo de Compañía
class UserViewModel: ObservableObject {
    /// Caso de uso para hacer fetch de los datos de compañía
    private let userInfoUseCase: UserRegisterUseCase
    private let updateRegisterUseCase: UserRegisterUseCase
    /// La compañía puede cambiar en la vista (se construye .onAppear())
    @Published var contentUser: User = User(
        userId: UUID(),
        roleId: "",
        companyId: "",
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
        gender: "",
        profilePicture: "",
        createdAt: Date(),
        updatedAt: Date()
        )
    /// Para implementar el caso de uso en la vista que llame al ViewModel Compañía
    init(
      userInfoUseCase: UserRegisterUseCase = UserRegisterUseCase.shared,
      updateRegisterUseCase: UserRegisterUseCase = UserRegisterUseCase()
    ) {
        self.userInfoUseCase = userInfoUseCase
        self.updateRegisterUseCase = updateRegisterUseCase
    }

    @MainActor
    /// Obtener información de la compañía mediante el caso de uso
    /// Actualización de la compañía si existe el UUID en base de datos
    func fetchUserById(idUser: String) async {
        let resultUser = await userInfoUseCase.fetchUserById(id: idUser)
        if let resultUser = resultUser {
            print("Usuario recibido: \(resultUser)")
            contentUser = resultUser
        } else {
            print("No se pudo obtener el usuario")
        }
        
        
    }
    func updateUserData(updatedUserData: User, userId: String) async {
            let resultUser = await updateRegisterUseCase.execute(updatedUserData: updatedUserData, userId: userId)
            if let resultUser = resultUser {
                print("Usuario actualizado: \(resultUser)")
                contentUser = resultUser
            } else {
                print("No se pudo actualizar el usuario")
            }
        }

    func updateUserCredentials(userId: String, newUserCredentials: Credentials) async {
           let resultUser = await updateRegisterUseCase.updateCredentials(
            userId: userId, newUserCredentials: newUserCredentials)
           if let resultUser = resultUser {
               print("Credenciales del usuario actualizadas: \(resultUser)")
               contentUser = resultUser
           } else {
               print("No se pudo actualizar las credenciales del usuario")
           }
       }
}
