//
//  EcoInfoModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 14/09/23.
//

import Foundation

struct EcoInfo: Codable, Hashable {
  var ecoinfoId: UUID
  var postId: String
  var postLink: String
  var coverImage: String?
  var description: String?
  var createdAt: String
  var updatedAt: String
}

struct EcoInfoContainer: Codable {
  var ecoInfos: [EcoInfo]?
}
