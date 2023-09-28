import SwiftUI
import MapKit

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
    @ObservedObject var viewModel = CoordinatesCompanyViewModel()
    @State var region = MKCoordinateRegion()
    @State var annotations: [IdentifiablePointAnnotation] = []
    
    var body: some View {
        Map(coordinateRegion: $region, annotationItems: annotations) { annotation in
            MapMarker(coordinate: annotation.coordinate)
        }
        .onAppear {
            Task {
                await setRegion()
            }
        }
    }
    
    func setRegion() async {
        await viewModel.getCoordinates()
        let coordinates = viewModel.coordinates
        print(coordinates.count)

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
    
    struct CoordinatesView_Previews: PreviewProvider {
        static var previews: some View {
            CoordinatesView()
        }
    }
}

