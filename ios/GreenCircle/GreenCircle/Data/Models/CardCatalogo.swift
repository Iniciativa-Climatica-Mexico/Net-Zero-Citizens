//
//  CompanyModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//
import Foundation

/// Enum representando el status de una compañía
enum StatusEnum: String, Codable, Equatable {
  case approved = "approved"
  case pendingApproval = "pending_approval"
  case rejected = "rejected"
}

/// Struct representando la información presente en una compañía
struct Company: Codable, Identifiable {
  var id: String { companyId }
  var companyId: String
  var userId: String?
  var name: String
  var description: String
  var email: String
  var phoneNumber: String
  var webPage: String?
  var location: String
  var profilePicture: String?
  var createdAt: String
  var updatedAt: String
}
