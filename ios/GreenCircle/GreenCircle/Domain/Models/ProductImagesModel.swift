//
//  ProductImagesModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/09/23.
//

import Foundation

struct ProductImages: Codable {
    var productIdImage: Int
    var productId: Int
    var image: String
    var alt: String
    var createdAt = Date() // Check
    var updatedAt = Date() // Check
}
