//
//  ReviewsModel.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 27/09/23.
//

import Foundation

struct Review: Codable, Identifiable {
    var id: String { reviewId.uuidString }
    var reviewId: UUID
    var userId: UUID
    var companyId: UUID
    var reviewTitle: String
    var score: Double
    var review: String
    var createdAt: String
    var updatedAt: String
//    var user: User
}
