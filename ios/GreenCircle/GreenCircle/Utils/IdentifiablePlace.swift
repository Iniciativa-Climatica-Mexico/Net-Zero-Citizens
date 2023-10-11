//
//  IdentifiablePlace.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/10/23.
//

import Foundation
import Combine
import MapKit

struct IdentifiablePlace: Identifiable {
  let id: UUID
  let name: String?
  let location: CLLocationCoordinate2D
  init(id: UUID = UUID(), name: String, lat: Double, long: Double) {
    self.id = id
    self.name = name
    self.location = CLLocationCoordinate2D(
      latitude: lat,
      longitude: long)
  }
}
