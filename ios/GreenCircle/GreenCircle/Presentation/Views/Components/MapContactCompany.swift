//
//  MapContactCompany.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/10/23.
//

import Foundation
import SwiftUI
import MapKit

struct MapContactCompanyView: View {
  var companyName: String
  var places: [IdentifiablePlace]
  var phone: String
  var mail: String
  @Binding var region: MKCoordinateRegion
  @Binding var isMapVisible: Bool
  @State private var isMarkerVisible: Bool = false
  var body: some View {
    ZStack {
      VStack {
        Spacer()
        Text(companyName)
          .foregroundColor(Color("MainText"))
          .font(.system(size: 24))
          .padding(.bottom, 10)
          .textSelection(.enabled)
          .lineLimit(/*@START_MENU_TOKEN@*/2/*@END_MENU_TOKEN@*/)
          .padding(EdgeInsets(top: 10, leading: 15, bottom: 10, trailing: 15))
        Divider()
          .padding(EdgeInsets(top: 10, leading: 15, bottom: 10, trailing: 15))
        VStack(alignment: .leading) {
          CallTextMenuView(phone: phone)
            .font(.system(size: 20))
            .foregroundColor(Color("MainText"))
          Divider()
            .padding(EdgeInsets(top: 10, leading: 0, bottom: 10, trailing: 15))
          MailContactCompanyView(email: mail)
            .font(.system(size: 20))
            .foregroundColor(Color("MainText"))
        }.padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
        Divider()
          .padding(EdgeInsets(top: 10, leading: 15, bottom: 10, trailing: 15))
        Map(coordinateRegion: $region, showsUserLocation: true, annotationItems: places)
        { place in
          MapAnnotation(coordinate: place.location, content: {
            if place.name != "Tú marcador" {
              VStack(spacing: 0) {
                Image(systemName: "mappin.circle.fill")
                .font(.title)
                .foregroundColor(.red)
                Image(systemName: "arrowtriangle.down.fill")
                  .font(.caption)
                  .foregroundColor(.red)
                  .offset(x: 0, y: -5)
              }.onTapGesture {
                isMarkerVisible.toggle()
              }
            }
            if region.span.latitudeDelta < 0.3 || isMarkerVisible && place.name != "Tú marcador" {
              Text(place.name ?? "")
                .font(.headline)
                .padding(4)
                .background(Color.white)
                .clipShape(RoundedRectangle(cornerRadius: 4))
                .shadow(radius: 4)
                .fixedSize(horizontal: true, vertical: true)
                .frame(maxWidth: 250)
                .offset(y: (isMarkerVisible && place.name != "Tú marcador") ? 0 : 30)
            }
          })
        }.frame(width: 350, height: 400)
          .cornerRadius(10, corners: .allCorners)
        Spacer()
        Button("Regresar") {
          isMapVisible = false
        }.foregroundColor(Color("Primary"))
      }
    }
  }
}
