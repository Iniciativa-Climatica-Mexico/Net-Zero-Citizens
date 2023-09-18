//
//  CompanyProductsModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/09/23.
//

import Foundation

struct CompanyProducts: Codable {
  var companyProductId: UUID
  var productId: UUID
  var companyId: UUID
  var pdfProductCertificationUrl: String
  var createdAt: String  // Check
  var updatedAt: String // Check
}
