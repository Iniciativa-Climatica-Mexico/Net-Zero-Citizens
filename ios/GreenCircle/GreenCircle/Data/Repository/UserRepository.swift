//
//  UserRepository.swift
//  GreenCircle
//
//  Created by ITESM on 09/09/23.
//

import Foundation

protocol UserRepository {
    func fetchUserData(completion: @escaping(User?, Error?) -> Void)
}
