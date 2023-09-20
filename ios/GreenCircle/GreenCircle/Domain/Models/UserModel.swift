//
//  UserModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation

/// Struct representando el usuario
struct User: Codable, Identifiable {
  var id: String {uuid}
  
  var first_name: String
  var last_name: String
  var uuid: String
  var email: String
  var login_type: String
  var picture: String
  var roles: String
  var phone: String?
  var gender: String?
  var state: String?
  var age: Int?
//  var created_at: String
}
