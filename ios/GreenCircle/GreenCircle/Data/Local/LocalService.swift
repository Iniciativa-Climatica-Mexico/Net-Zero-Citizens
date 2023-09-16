//
//  LocalService.swift
//  GreenCircle
//
//  Created by Daniel Hurtado on 16/09/23.
//

import Foundation

class LocalService {
    static let shared = LocalService()
    private let TOKEN_KEY = "authToken"

    func getToken() -> String? {
        return UserDefaults.standard.string(forKey: TOKEN_KEY)
    }

    func setToken(_ token: String) {
        UserDefaults.standard.set(token, forKey: TOKEN_KEY)
    }
}
