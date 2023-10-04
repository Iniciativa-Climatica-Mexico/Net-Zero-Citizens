//
//  UserModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

// swiftlint:disable identifier_name

/// Struct representando el usuario
struct UserAuth: Codable, Identifiable, Equatable {
  var id: String {uuid}
  
  var first_name: String
  var last_name: String
  var uuid: String
  var email: String
  var login_type: String
  var picture: String?
  var roles: String
  var phone: String?
  var gender: String?
  var state: String?
  var age: Int?
//  var created_at: String
}

// swiftlint:enable identifier_name
