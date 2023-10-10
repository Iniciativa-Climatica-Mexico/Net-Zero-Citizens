//
//  Favourite.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 30/09/23.
//

import Foundation

struct Favourite: Codable {
  var favouriteId: UUID
  var companyId: UUID
  var userId: String
  var createdAt: String
  var updatedAt: String
}

struct FavouriteCreationResponse: Codable {
  let favouriteId: UUID
  let companyId: UUID
  let message: String
}

struct FavouriteDeleteResponse: Codable {
  var rows: Int
  var message: String?
}

struct FavouriteGetResponse: Codable {
  var favouriteId: UUID
  var companyId: UUID
  var userId: String
  var createdAt: String
  var updatedAt: String
  var message: String?
}
