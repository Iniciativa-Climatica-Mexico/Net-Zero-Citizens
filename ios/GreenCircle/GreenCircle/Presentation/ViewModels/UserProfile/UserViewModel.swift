//
//  ProfileViewModel.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 07/09/23.
//

import Foundation

class UserViewModel: ObservableObject {
    private let useCase = ProfileUseCase.shared
  
    @Published var contentUser: UserAuth
  
    init() {
        contentUser = useCase.getUserData()
    }
  
  
}
