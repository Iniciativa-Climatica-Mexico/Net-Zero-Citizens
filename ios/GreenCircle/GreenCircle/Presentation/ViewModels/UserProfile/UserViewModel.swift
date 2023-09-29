//
//  ProfileViewModel.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 07/09/23.
//

import Foundation

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
