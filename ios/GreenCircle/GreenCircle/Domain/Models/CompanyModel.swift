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
struct Company: Codable {
  var companyId: UUID
  var userId: String
  var name: String
  var description: String
  var email: String
  var phone: String
  var webPage: String
  var street: String
  var streetNumber: Int?
  var city: String
  var state: String
  var zipCode: Int
  var latitude: Double
  var longitude: Double
  var profilePicture: String?
  var pdfCurriculumUrl: String?
  var pdfDicCdmxUrl: String
  var pdfPeeFideUrl: String
  var pdfGuaranteeSecurityUrl: String
  var pdfActaConstitutivaUrl: String
  var pdfIneUrl: String
  var status: StatusEnum
  // var reviews: [Review]
  // var images: [CompanyImages]
  // var images: [Product]
  var createdAt: String
  var updatedAt: String
//  var products: [Product]?
  var score: Double
  var oneComment: String
//  var images: [CompanyImages]?
}
