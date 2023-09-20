//
//  AuthResponseModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

/// Struct representando los tokens
struct Tokens: Codable {
  var authToken: String
  var refreshToken: String
}

/// Struct representando la respuesta del servidor en autenticación
struct AuthResponse: Codable {
  var tokens: Tokens
  var user: User
}
