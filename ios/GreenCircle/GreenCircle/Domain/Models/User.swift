//
//  User.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 09/09/23.
//

import Foundation

struct User: Codable {
    
    let userId: Int
    let roleId: Int
    let companyId: String?
    let googleId: String?
    let facebookId: String?
    let appleId: String?
    let firstName: String
    let lastName: String
    let secondLastName: String?
    let email: String
    let password: String?
    let phoneNumber: String
    let age: Int
    let state: String
    let sex: String
    let profilePicture: String?
    let createdAt: String
    let updatedAt: String
    let CREATED_AT: String
    let UPDATED_AT: String
}
