//
//  CompanyImagesModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 12/09/23.
//

import Foundation

struct CompanyImages: Codable {
  var companyImageId: UUID
  var companyId: String
  var imageUrl: String?
  var altText: String?
}
