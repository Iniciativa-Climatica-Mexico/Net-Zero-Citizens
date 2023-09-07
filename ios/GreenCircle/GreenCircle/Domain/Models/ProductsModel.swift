//
//  ProductsModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/09/23.
//

import Foundation

struct Products: Codable {
    var poductId: Int
    var companyId: Int
    var name: String
    var description: String
    var createdAt = Date() // Check
    var updatedAt = Date() // Check
}
