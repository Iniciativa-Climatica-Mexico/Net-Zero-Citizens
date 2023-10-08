import SwiftUI
import MapKit

class IdentifiablePointAnnotation: NSObject, MKAnnotation, Identifiable {
    let id = UUID()
    let wrappedAnnotation: MKPointAnnotation
    let name: String

    init(annotation: MKPointAnnotation, name: String) {
        self.wrappedAnnotation = annotation
        self.name = name
    }

    var coordinate: CLLocationCoordinate2D {
        wrappedAnnotation.coordinate
    }
}

struct CoordinatesView: View {
    @ObservedObject var viewModel = CoordinatesCompanyViewModel()
    @State var region = MKCoordinateRegion()
    @State var annotations: [IdentifiablePointAnnotation] = []
    @State var selectedAnnotation: IdentifiablePointAnnotation?
    
    var body: some View {
        Map(coordinateRegion: $region, annotationItems: annotations) { annotation in
            MapAnnotation(coordinate: annotation.coordinate) {
                VStack {
                    if annotation.id == selectedAnnotation?.id {
                        Text(annotation.name)
                            .font(.headline)
                            .padding(4)
                            .background(Color.white)
                            .clipShape(RoundedRectangle(cornerRadius: 4))
                            .shadow(radius: 4)
                            .fixedSize(horizontal: true, vertical: true)
                            .frame(maxWidth: 200)
                    }
                    Image(systemName: "mappin")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 20, height: 30)
                        .foregroundColor(.red)
                        .onTapGesture {
                            selectedAnnotation = annotation
                        }
                }
            }
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

        annotations = coordinates.map { company -> IdentifiablePointAnnotation in
            let annotation = MKPointAnnotation()
            annotation.coordinate = CLLocationCoordinate2D(latitude: company.latitude, longitude: company.longitude)
            return IdentifiablePointAnnotation(annotation: annotation, name: company.name)
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