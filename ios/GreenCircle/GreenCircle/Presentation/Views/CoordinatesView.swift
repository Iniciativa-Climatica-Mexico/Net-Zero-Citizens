//import SwiftUI
//import MapKit
//
//struct CoordinatesView: View {
//    @ObservedObject var viewModel: CompanyViewModel
//    @State var region: MKCoordinateRegion
//
//    var body: some View {
//        Map(coordinateRegion: $region)
//            .onAppear {
//                setRegion()
//            }
//    }
//
//    func setRegion() {
//        guard let coordinates = viewModel.companiesCoordinates?.rows else { return }
//        print(coordinates.count)
//
//        _ = coordinates.map { company -> MKPointAnnotation in
//            let annotation = MKPointAnnotation()
//            annotation.coordinate = CLLocationCoordinate2D(latitude: company.latitude, longitude: company.longitude)
//            return annotation
//        }
//
//        let coordinatesRegion = MKCoordinateRegion(
//            center: CLLocationCoordinate2D(latitude: coordinates.first?.latitude ?? 0, longitude: coordinates.first?.longitude ?? 0),
//            span: MKCoordinateSpan(latitudeDelta: 0.5, longitudeDelta: 0.5)
//        )
//
//        region = coordinatesRegion
//    }
//
//
//    struct CoordinatesView_Previews: PreviewProvider {
//        static var previews: some View {
//            CoordinatesView(viewModel: CompanyViewModel(), region: MKCoordinateRegion())
//        }
//    }
//}
