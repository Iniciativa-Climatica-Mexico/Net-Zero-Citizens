//
//  ReviewsModel.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 27/09/23.
//

import Foundation

struct Review: Codable {
    var reviewId: UUID
    var userID: UUID
    var companyId: UUID
    var reviewTitle: String
    var score: Int
    var review: String
    var createdAt: Date
    var updatedAt: Date
}
