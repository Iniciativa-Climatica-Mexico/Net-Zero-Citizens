//
//  ContactCompanyComponents.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 01/10/23.
//

import Foundation
import SwiftUI
import MapKit
import Combine

struct ContactCompanyProductView: View {
  var productDescription: String
  var productName: String
  var body: some View {
    VStack(alignment: .leading, spacing: 10) {
      Text(productName)
        .foregroundColor(Color("MainText"))
        .font(.system(size: 24)).bold()
      VStack {
        Text(productDescription)
          .foregroundColor(Color("MainText"))
          .font(.system(size: 17))
          .padding(EdgeInsets(top: 5, leading: 0, bottom: 6, trailing: 0))
          .lineSpacing(8)
      }
      Spacer()
    }.padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
  }
}

struct ContactCompanyComponentView: View {
  @StateObject var coordinatesCompany = CoordinatesCompanyViewModel()
  @ObservedObject var modelCompany: CompanyViewModel
  @StateObject var deviceLocationService = DeviceLocationService.shared
  @State private var isMapVisible = false
  @State var places: [IdentifiablePlace] = []
  @State var region: MKCoordinateRegion = MKCoordinateRegion()
  @State var tokens: Set<AnyCancellable> = []
  @State var coordinates: (lat: Double, lon: Double) = (0,0)
  @State private var userLocation: CLLocationCoordinate2D?
  @State private var userConsent: Bool = false
  @State private var fullLocation: [String] = []
  @State private var fullLocationString: String = ""

  /// Cuando  se autoriza acceso a localización
  func observeCoordinateUpdates() {
    deviceLocationService.coordinatesPublisher
    .receive(on: DispatchQueue.main)
    .sink { completion in
      if case .failure(let error) = completion {
          print(error)
      }
    } receiveValue: { coordinates in
      self.coordinates = (coordinates.latitude, coordinates.longitude)
      places.append(IdentifiablePlace(name: "Tú marcador", lat: coordinates.latitude, long: coordinates.longitude))
  }
    .store(in: &tokens)
  }
  /// Cuando no se autoriza acceso a localización
  func observeLocationAccessDenied() {
   deviceLocationService.deniedLocationAccessPublisher
     .receive(on: DispatchQueue.main)
     .sink {
       print("No se aceptó uso de localización")
       self.isMapVisible = false
     }
     .store (in: &tokens)
   }
  
  func addressComponents() -> String {
    if !modelCompany.contentCompany.state.isEmpty {
      fullLocation.append(modelCompany.contentCompany.state)
    }
    if !modelCompany.contentCompany.street.isEmpty {
      fullLocation.append(modelCompany.contentCompany.street)
    }
    if !modelCompany.contentCompany.streetNumber.isEmpty {
      fullLocation.append(modelCompany.contentCompany.streetNumber)
    }
    return fullLocation.joined(separator: ", ")
  }
  
  var body: some View {
    VStack(alignment: .leading, spacing: 7) {
      Text("Conecta")
        .font(.system(size: 24))
        .foregroundColor(Color("MainText"))
        .padding(.bottom, 5).bold()
      VStack(alignment: .leading, spacing: 6) {
        Text("Página web").font(.system(size: 17))
          .foregroundColor(Color("BlackCustom"))
        if let url = modelCompany.contentCompany.webPage {
          Text(String(url))
            .font(.system(size: 15))
            .foregroundColor(Color("MainText"))
          .onTapGesture {
              UIApplication.shared.open(URL(string: url)!)
          }
        } else {
          Text(modelCompany.contentCompany.webPage ?? "No hay página web")
            .font(.system(size: 15))
            .foregroundColor(Color("MainText"))
        }
      }

      Divider()

      VStack(alignment: .leading, spacing: 6) {
        Text("Correo electrónico: ").font(.system(size: 17))
        MailContactCompanyView(email: modelCompany.contentCompany.email)
          .font(.system(size: 15))
          .foregroundColor(Color("MainText"))
      }

      Divider()

      VStack(alignment: .leading, spacing: 6) {
        Text("Dirección")
          .font(.system(size: 17))
          .foregroundColor(Color("BlackCustom"))
        HStack(spacing: 5) {
          Image(systemName: "location")
            .foregroundColor(Color("MainText"))
            .font(.system(size: 15))
          Text(fullLocationString)
            .textSelection(.enabled)
            .font(.system(size: 15))
            .foregroundColor(Color("MainText"))
            .onTapGesture {
              isMapVisible.toggle()
                observeCoordinateUpdates()
                observeLocationAccessDenied()
                Task {
                  await coordinatesCompany.getCoordinates()
                  await coordinatesCompany.getCoordinatesById(companyId: modelCompany.contentCompany.companyId)
                  // Store the coordinates of just the company and make an Identifiabla Place
                  places.append(IdentifiablePlace(id: UUID(), name: modelCompany.contentCompany.name,
                                                  lat: coordinatesCompany.companyLocalization.latitude, long: coordinatesCompany.companyLocalization.longitude))
                  region = MKCoordinateRegion(
                    center: CLLocationCoordinate2D(latitude: coordinatesCompany.companyLocalization.latitude,
                                                   longitude: coordinatesCompany.companyLocalization.longitude),
                    span: MKCoordinateSpan(latitudeDelta: 0.8, longitudeDelta: 0.8))
                }
                if !isMapVisible && !places.isEmpty {
                  places.removeAll()
                }
              }
        }
      }
      Divider()

      VStack(alignment: .leading, spacing: 6) {
        CallTextMenuView(phone: modelCompany.contentCompany.phone)
          .font(.system(size: 15))
      }.foregroundColor(Color("MainText"))

      Spacer()
    }
    .onAppear {
      fullLocationString = addressComponents()
    }
    .padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
    .foregroundColor(Color("BlackCustom"))
    .sheet(isPresented: $isMapVisible) {
      MapContactCompanyView(companyName: modelCompany.contentCompany.name,
                            places: places, phone: modelCompany.contentCompany.phone,
                            mail: modelCompany.contentCompany.email,
                            region: $region, isMapVisible: $isMapVisible)
    }
  }
}

struct ContactCompanyRatingView: View {
  @ObservedObject var modelCompanyRating: CompanyViewModel
  @Binding var dispScrollView: Bool
  var body: some View {
    if !dispScrollView {
      VStack(alignment: .leading, spacing: 5) {
        Text("Rating")
          .font(.system(size: 24))
          .foregroundColor(Color("MainText"))
          .padding(.bottom, 7).bold()
        HStack {
          if let score = modelCompanyRating.contentCompany.score, score > 0 {
            ForEach(0..<5) { index in
              if index < Int(score) {
                Image(systemName: "star.fill")
                  .resizable()
                  .frame(width: 15, height: 15)
              } else if index == Int(score) {
                Image(systemName: "star.leadinghalf.fill")
                  .resizable()
                  .frame(width: 15, height: 15)
              } else {
                Image(systemName: "star")
                  .resizable()
                  .frame(width: 15, height: 15)
              }
            }
            Text(String(score))
          }
          else {
            Text("No hay rating")
          }
        }
          .padding(.bottom, 5)
          .foregroundColor(Color("GreenCustom"))
        
        Divider()
        Text("Reviews")
          .font(.system(size: 24))
          .foregroundColor(Color("MainText"))
          .padding(.bottom, 7).bold()
        VStack(spacing: 6) {
          Text(modelCompanyRating.contentCompany.oneComment ?? "No hay comentarios")
            .font(.system(size: 15))
            .foregroundColor(Color("BlackCustom"))
        }.padding(.bottom, 10)
        HStack {
          Spacer()
          Text("Ver mas...").onTapGesture {
            dispScrollView = true
          }
          .font(.system(size: 17))
          .foregroundColor(Color("BlueCustom"))
          Spacer()
        }
        Spacer()
      }
      .padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
      .foregroundColor(Color("BlackCustom"))
    }
  }
}
