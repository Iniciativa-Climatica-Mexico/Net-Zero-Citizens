
import SwiftUI
import MapKit
import Combine

class IdentifiablePointAnnotation: NSObject, MKAnnotation, Identifiable {
    let id = UUID()
    let wrappedAnnotation: MKPointAnnotation

    init(annotation: MKPointAnnotation) {
        self.wrappedAnnotation = annotation
    }

    var coordinate: CLLocationCoordinate2D {
        wrappedAnnotation.coordinate
    }
}

struct CoordinatesView: View {
    @StateObject var deviceLocationService = DeviceLocationService.shared
    @State var tokens: Set<AnyCancellable> = []
    @State var coordinates: (lat: Double, lon: Double) = (0,0)
    
    @ObservedObject var viewModel = CoordinatesCompanyViewModel()
    @State var region = MKCoordinateRegion()
    @State var annotations: [IdentifiablePointAnnotation] = []
    
    @State private var userLocation: CLLocationCoordinate2D?
    @State private var isTrackingUserLocation = true

    
    var body: some View {
//        Map(coordinateRegion: $region, annotationItems: annotations) { annotation in
//            MapMarker(coordinate: annotation.coordinate)
//        }
        Map(coordinateRegion: $region, showsUserLocation: true, userTrackingMode: .constant(isTrackingUserLocation ? .follow : .none), annotationItems: annotations) { annotation in
            MapMarker(coordinate: annotation.coordinate)
        }

        .onAppear {
            Task {
                await setRegion()
                observeCoordinateUpdates()
                observeLocationAccessDenied()
                deviceLocationService.requestLocationUpdates()
            }
        }
//        VStack {
//            Text ("Latitude: \(coordinates.lat)")
//                .font (. largeTitle)
//            Text ("Longitude: \(coordinates.lon)")
//                .font (.largeTitle)
//            }
//        .onAppear {
//            observeCoordinateUpdates()
//            observeLocationAccessDenied()
//            deviceLocationService.requestLocationUpdates()
//        }
    }
    
    func setRegion() async {
        await viewModel.getCoordinates()
        let coordinates = viewModel.coordinates
        

        annotations = coordinates.map { company -> IdentifiablePointAnnotation in
            let annotation = MKPointAnnotation()
            annotation.coordinate = CLLocationCoordinate2D(latitude: company.latitude, longitude: company.longitude)
            return IdentifiablePointAnnotation(annotation: annotation)
        }
        

        let coordinatesRegion = MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: coordinates.first?.latitude ?? 0, longitude: coordinates.first?.longitude ?? 0),
            span: MKCoordinateSpan(latitudeDelta: 0.5, longitudeDelta: 0.5)
        )

        region = coordinatesRegion
    }
    
//    func observeCoordinateUpdates () {
//        deviceLocationService.coordinatesPublisher
//            .receive (on: DispatchQueue .main)
//            .sink { completion in
//                if case .failure(let error) = completion {
//                    print (error)
//                }
//            } receiveValue: { coordinates in
//                self.coordinates = (coordinates.latitude, coordinates.longitude)
//            }
//            .store (in: &tokens)
//    }
// Buena
    
    func observeCoordinateUpdates() {
        deviceLocationService.coordinatesPublisher
            .receive(on: DispatchQueue.main)
            .sink { completion in
                if case .failure(let error) = completion {
                    print(error)
                }
            } receiveValue: { coordinates in
                self.coordinates = (coordinates.latitude, coordinates.longitude)
                self.userLocation = coordinates 
            }
            .store(in: &tokens)
    }
    func observeLocationAccessDenied() {
        deviceLocationService.deniedLocationAccessPublisher
            .receive(on: DispatchQueue.main)
            .sink {
                print("Show some kind of alert to the user")
            }
            .store (in: &tokens)
    }
    
    struct CoordinatesView_Previews: PreviewProvider {
        static var previews: some View {
            CoordinatesView()
        }
    }
}

