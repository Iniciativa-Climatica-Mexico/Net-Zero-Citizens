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
    var userId: UUID
    var name: String
    var description: String
    var email: String
    var phone: String
    var webPage: String?
    var street: String
    var streetNumber: Int //TO DO maybe it is string
    var city: String
    var state: String
    var zipCode: Int
    var latitude: Int
    var longitude: Int
    var profilePicture: String?
    var pdfCurriculumUrl: String?
    var pdfDicCdmxUrl: String
    var pdfPeeFideUrl: String
    var pdfGuaranteeSecurityUrl: String
    var pdfActaConstitutivaUrl: String
    var pdfIneUrl: String
    var status: StatusEnum
    // var product: Products?
    // var reviews: Reviews?
    var createdAt: String
    var updatedAt: String
}
