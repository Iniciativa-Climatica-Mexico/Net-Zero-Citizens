//
//  AuthResponseModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

struct Tokens: Codable {
  var authToken: String
  var refreshToken: String
}

struct AuthResponse: Codable {
  var tokens: Tokens
  var user: User
}
