//
//  FetchUserDataUseCase.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 09/09/23.
//

//import Foundation
//
//class FetchUserDataUseCase {
//    let userRepository: UserRepository
//
//    init(userRepository: UserRepository){
//        self.userRepository = userRepository
//    }
//
//    func execute(completion: @escaping (User?, Error?) -> Void){
//        userRepository.fetchUserData (completion: completion)
//    }
//}

import Foundation

/// Inicialización de protocolo de casos de uso
protocol FetchUserInfoUseCase {
    func fetchUserById(id: String) async -> User?
}

/// Inicialización de clase de requerimientos de modelo de compañía
/// No como se hará fetch de los datos, pero si definir los casos de uso
/// para hacerlo
class FetchUserInfoUseCaseImpl: FetchUserInfoUseCase {
    /// Inicialización de repositorio para poder hacer el fetch de datos de compañía
    let userDataRepository: UserRepository
    /// Creación de Singleton
    static let shared = FetchUserInfoUseCaseImpl()
    /// Constructor con recibimiento o por defaultF
    init(userDataRepository: UserRepository = UserRepository.shared) {
        self.userDataRepository = userDataRepository
    }
    /// Definición de Caso de uso para hacer el fetch
    ///   - Parameters:UUID de compañía
    ///   - Returns: Modelo de compañía
    func fetchUserById(id: String) async -> User? {
        return await userDataRepository.fetchUserById(userId: id)
    }
    
}


