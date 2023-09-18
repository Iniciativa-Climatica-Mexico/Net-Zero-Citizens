//
//  UpdateUserDataUseCase.swift
//  GreenCircle
//
//  Created by Gamaliel Marines on 9/14/23.
//

import Foundation

protocol UpdateUserDataUseCaseProtocol {
    func execute(updatedUserData: User, userId: String) async -> User?
    func updateCredentials(userId: String, newUserCredentials: Credentials) async -> User?
}

final class UpdateUserDataUseCase: UpdateUserDataUseCaseProtocol {
    private let userRepository: UserRepository

    init(userRepository: UserRepository = .shared) {
        self.userRepository = userRepository
    }

    func execute(updatedUserData: User, userId: String) async -> User? {
        return await userRepository.updateUserData(updatedUserData: updatedUserData, userId: userId)
    }

    func updateCredentials(userId: String, newUserCredentials: Credentials) async -> User? {
        return await userRepository.updateUserCredentials(userId: userId, newUserCredentials: newUserCredentials)
    }
}
