//
//  PaginatedQuery.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import Alamofire
import Foundation

struct PaginatedQuery<T: Codable>: Codable {
  var rows: [T]
  var start: Int
  var pageSize: Int
  var total: Int
}
