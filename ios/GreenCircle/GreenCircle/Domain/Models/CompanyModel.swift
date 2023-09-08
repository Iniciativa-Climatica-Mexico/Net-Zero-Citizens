//
//  CompanyModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation

enum StatusEnum: String, Codable {
    case approved
    case pendingApproval
    case rejected
}

struct Company: Codable {
    var companyId: UUID
    var userId: String // Needs to be UUID
    var name: String
    var description: String
    var email: String
    var location: String
    var profilePicture: String?
    var status: StatusEnum
    var phoneNumber: String
    var webPage: String?
    // var product: Products?
    // var reviews: Reviews?
    var createdAt: String
    var updatedAt: String
}

