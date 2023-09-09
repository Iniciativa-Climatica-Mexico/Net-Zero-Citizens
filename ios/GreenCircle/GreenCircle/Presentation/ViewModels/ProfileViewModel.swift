//
//  ProfileViewModel.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 07/09/23.
//

import Foundation

class ProfileViewModel: ObservableObject {
    
    private let fetchUserDataUseCase: FetchUserDataUseCase

    @Published var user: User?
    @Published var error: Error?

    init(fetchUserDataUseCase: FetchUserDataUseCase) {
        self.fetchUserDataUseCase = fetchUserDataUseCase
    }

    func fetchUserData() {
        fetchUserDataUseCase.execute { user, error in
            DispatchQueue.main.async {
                self.user = user
                self.error = error
            }
        }
    }
}
