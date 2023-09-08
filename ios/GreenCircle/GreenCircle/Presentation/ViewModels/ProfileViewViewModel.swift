//
//  ProfileViewViewModel.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 07/09/23.
//

import Foundation



//import Combine

//class ProfileViewModel: ObservableObject {
//    @Published var firstName: String = "Nombre"
//   @Published var lastName: String = "Apellido"
//    @Published var profilePicture: String = "profile_placeholder"
    
    //private var userService: UserService
//    private var cancellables = Set<AnyCancellable>()

//    init(userService: UserService) {
//        self.userService = userService
//    }
    
//    func fetchUserProfile() {
//        userService.fetchUserProfile { user in
//           if let user = user {
//               DispatchQueue.main.async {
//                    self.firstName = user.firstName
//                    self.lastName = user.lastName
//                    self.profilePicture = user.profileImageName
//                }
//            } else {
//                // Manejar el caso de error
//            }
//        }
//    }
//}
