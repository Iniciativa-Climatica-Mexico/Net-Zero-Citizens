//
//  DeviceLocationService.swift
//  GreenCircle
//
//  Created by Sebastian Flores on 04/10/23.
//  Modified by Dani Gutiérrez Góemz on 17/10/23.

import CoreLocation
import Combine
import MapKit

class DeviceLocationService: NSObject, CLLocationManagerDelegate, ObservableObject {
    
    var coordinatesPublisher = PassthroughSubject<CLLocationCoordinate2D, Error>()
    var deniedLocationAccessPublisher = PassthroughSubject<Void, Never>()
    
    private override init() {
        super.init()
    }
    static let shared = DeviceLocationService()
    
    private lazy var locationManager: CLLocationManager = {
        let manager = CLLocationManager ()
        manager.desiredAccuracy = kCLLocationAccuracyBest
        manager.delegate = self
        return manager
    }()
    
    /// - Description: Function to set the region center to where the user is at
    /// - Returns: `MKCoordinateRegion?` only if user consent is accepted
    func setCenterToUser() -> MKCoordinateRegion? {
      guard let userCoordinate = locationManager.location?.coordinate else {
              return nil
          }
      let span = MKCoordinateSpan(latitudeDelta: 0.5, longitudeDelta: 0.5)
      let region = MKCoordinateRegion(center: userCoordinate, span: span)
      return region
    }
    func requestLocationUpdates() {
        switch locationManager.authorizationStatus {
        case .notDetermined:
            locationManager.requestWhenInUseAuthorization()
        case .authorizedWhenInUse, .authorizedAlways:
            locationManager .startUpdatingLocation ()
        default:
            deniedLocationAccessPublisher.send()
        }
    }
    
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        switch manager.authorizationStatus {
        case .authorizedWhenInUse, .authorizedAlways:
            manager.startUpdatingLocation()
        default:
            manager.stopUpdatingLocation()
            deniedLocationAccessPublisher.send()
        }
    }
    
    func locationManager (_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else { return }
        coordinatesPublisher.send (location.coordinate)
    }
    
    func locationManager(_ manager: CLLocationManager, didFailwithError error: Error) {
        coordinatesPublisher.send (completion: .failure (error))
    }
}
