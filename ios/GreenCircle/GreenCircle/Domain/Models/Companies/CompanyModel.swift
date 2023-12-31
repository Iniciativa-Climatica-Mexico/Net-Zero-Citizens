//
//  CompanyModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández 19/09/23.
// Created by Daniel Gutiérrez on 19/09/23.
//

import Foundation

/// Enum representando el status de una compañía
enum StatusEnum: String, Codable, Equatable {
  case approved = "approved"
  case pendingApproval = "pending_approval"
  case rejected = "rejected"
}

/// Struct representando la información presente en una compañía
struct Company: Codable, Identifiable, Equatable {
  var id: String { companyId.uuidString }
  var companyId: UUID
  var userId: String?
  var name: String
  var description: String
  var email: String
  var phone: String
  var webPage: String?
  var street: String
  var streetNumber: String
  var city: String
  var state: String
  var zipCode: String
  // var latitude: Double
  // var longitude: Double
  var profilePicture: String?
  var status: StatusEnum
  // var reviews: [Review]
  var createdAt: String
  var updatedAt: String
  var products: [Product]?
  var score: Double?
  var oneComment: String?
  var files: [CompanyFiles]?
}

struct BasicCompany: Codable, Identifiable {
  var id: String { companyId.uuidString }
  var companyId: UUID
  var userId: String?
  var name: String
  var description: String
  var email: String
  var phone: String
  var webPage: String?
  var street: String
  var streetNumber: String
  var city: String
  var state: String
  var zipCode: String
  // var latitude: Double
  // var longitude: Double
  var profilePicture: String?
  var status: StatusEnum
}
