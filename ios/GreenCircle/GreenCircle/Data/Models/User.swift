//
//  User.swift
//  GreenCircle
//
//  Created by Frida Bailleres on 09/09/23.
//

import Foundation

struct User: Codable {
    let userId: String
    let roleId: String
    let companyId: String?
    let googleId: String?
    let facebookId: String?
    let appleId: String?
    var firstName: String
    var lastName: String
    var secondLastName: String?
    var email: String
    var password: String?
    var phoneNumber: String
    var age: Int
    var state: String
    var sex: String
    var profilePicture: String?
    let createdAt: Date
    let updatedAt: Date
}
