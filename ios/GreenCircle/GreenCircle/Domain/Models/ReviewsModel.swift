//
//  ReviewsModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/09/23.
//

import Foundation

struct Reviews: Codable {
    var idReview: Int
    var UUID: String
    var idCompany: Int
    var review: String
    var score: Int
    var createdAt = Date() // Check
    var updatedAt = Date() // Check
}
