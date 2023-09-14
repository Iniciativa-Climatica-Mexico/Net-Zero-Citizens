//
//  CustomDateFormatter.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import Foundation

extension Formatter {
  static var customISO8601DateFormatter: ISO8601DateFormatter = {
    let formatter = ISO8601DateFormatter()
    formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    return formatter
  }()
}

extension JSONDecoder.DateDecodingStrategy {
  static var iso8601WithFractionalSeconds = custom { decoder in
    let dateStr = try decoder.singleValueContainer().decode(String.self)
    let customIsoFormatter = Formatter.customISO8601DateFormatter
    if let date = customIsoFormatter.date(from: dateStr) {
      return date
    }
    throw DecodingError.dataCorrupted(
      DecodingError.Context(
        codingPath: decoder.codingPath,
        debugDescription: "Invalid date"))
  }
}
