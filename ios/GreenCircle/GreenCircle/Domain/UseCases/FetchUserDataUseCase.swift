//
//  FetchUserDataUseCase.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 09/09/23.
//

import Foundation

class FetchUserDataUseCase {
    let userRepository: UserRepository
    
    init(userRepository: UserRepository){
        self.userRepository = userRepository
    }
    
    func execute(completion: @escaping (User?, Error?) -> Void){
        userRepository.fetchUserData (completion: completion)
    }
}


