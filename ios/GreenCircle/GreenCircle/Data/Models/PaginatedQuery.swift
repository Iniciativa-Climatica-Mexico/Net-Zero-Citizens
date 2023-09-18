//
//  CompanyRowsModel.swift
//  GreenCircle
//
//  Created by Juan Pablo Cabrera on 16/09/23.
//

import Foundation

struct PaginatedQuery<T: Codable>: Codable {
  var rows: [T]
  var start: Int
  var pageSize: Int
  var total: Int
}
