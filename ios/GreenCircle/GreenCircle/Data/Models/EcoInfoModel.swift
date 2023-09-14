//
//  EcoInfoModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 14/09/23.
//

import Foundation

struct EcoInfo: Codable {
  var ecoInfoId: UUID
  var postId: String
  var coverImageUrl: String?
  var description: String?
  var createdAt: String
  var updatedAt: String
}
