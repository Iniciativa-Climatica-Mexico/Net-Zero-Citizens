//
//  ContactCompany.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/09/23.
//

import SwiftUI

struct TabViewImages: View {
  @State private var index = 0
  var body: some View {
    VStack {
      TabView(selection: $index) {
        ForEach((0..<3), id: \.self) { index in
          Image(index > 0 ? "panel-solar\(index)" : "panel-solar")
            .resizable()
            .scaledToFit()
            .aspectRatio(contentMode: .fit)
            .cornerRadius(10)
        }
    }
    .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))

      HStack(spacing: 7) {
         ForEach((0..<3), id: \.self) { index in
           Circle()
           .fill(index == self.index ? Color("BlackCustom") : Color("BlackCustom").opacity(0.5))
           .frame(width: 7, height: 7)
         }
      }
    .padding()
    }
    .frame(maxHeight: 180)
    .padding(.top, 15)
  }
}

struct ContactCompanyRatingView: View {
  @Binding var dispScrollView: Bool
  var body: some View {
    if !dispScrollView {
      VStack(alignment: .leading) {
        Text("Rating")
          .font(.system(size: 15))
          .padding(.bottom, 3).bold()
        HStack {
          Image(systemName: "star.fill").resizable().frame(width: 11, height: 11)
          Image(systemName: "star.fill").resizable().frame(width: 11, height: 11)
          Image(systemName: "star.fill").resizable().frame(width: 11, height: 11)
          Image(systemName: "star.fill").resizable().frame(width: 11, height: 11)
          Image(systemName: "star.fill").resizable().frame(width: 11, height: 11)
        }
          .padding(.bottom, 5)
          .foregroundColor(Color("GreenCustom"))
        
        Divider()
        Text("Reviews")
          .font(.system(size: 15))
          .padding(.bottom, 3).bold()
        VStack {
          Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua.")
            .font(.system(size: 13))
            .foregroundColor(Color("BlackCustom")).contrast(12.6)
          Text("Ver mas...").onTapGesture {
            dispScrollView = true
          }
          .font(.system(size: 13))
          .foregroundColor(Color("BlueCustom"))
        }
        Spacer()
      }
      .padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
      .foregroundColor(Color("BlackCustom"))
    }
  }
}

struct ContactCompanyComponentView: View {
  @ObservedObject var modelCompany: CompanyViewModel
  var body: some View {
    VStack(alignment: .leading) {
      Text("Conecta")
        .font(.system(size: 15))
        .padding(.bottom, 3).bold()
      VStack(alignment: .leading, spacing: 5) {
        Text("Página web").font(.system(size: 13))
          .foregroundColor(Color("BlackCustom")).contrast(12.6)
        Text(modelCompany.contentCompany.webPage ?? "No hay página web disponible")
          .font(.system(size: 10))
          .foregroundColor(Color("GreenCustom"))
      }

      Divider()

      VStack(alignment: .leading, spacing: 5) {
        Text("Correo electrónico").font(.system(size: 13))
          .foregroundColor(Color("BlackCustom")).contrast(12.6)
        Text(modelCompany.contentCompany.email).font(.system(size: 10))
          .foregroundColor(Color("GreenCustom"))
      }

      Divider()

      VStack(alignment: .leading, spacing: 5) {
        Text("Dirección")
          .font(.system(size: 13))
          .foregroundColor(Color("BlackCustom"))
          .contrast(12.6)
        HStack(spacing: 5) {
          Text("\(modelCompany.contentCompany.state), ")
            .font(.system(size: 10))
            .foregroundColor(Color("GreenCustom"))

          Text("\(modelCompany.contentCompany.street), ")
            .font(.system(size: 10))
            .foregroundColor(Color("GreenCustom"))
          
          Text(String(modelCompany.contentCompany.streetNumber))
            .font(.system(size: 10))
            .foregroundColor(Color("GreenCustom"))
        }
      }
      Divider()

      VStack(alignment: .leading, spacing: 5) {
        Text("Número telefónico").font(.system(size: 13))
          .foregroundColor(Color("BlackCustom")).contrast(12.6)
        Text(modelCompany.contentCompany.phone)
          .font(.system(size: 10))
          .foregroundColor(Color("GreenCustom"))
      }

      Spacer()
    }
    .padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
    .foregroundColor(Color("BlackCustom"))
  }
}
struct ServiceComponentView: View {
  var body: some View {
    VStack {
      HStack {
        VStack(alignment: .leading) {
          Text("Description").bold()
            .font(.system(size: 14))
            .padding(EdgeInsets(top: 5, leading: 0, bottom: 6, trailing: 0))
          Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua.")
            .font(.system(size: 12))
            .multilineTextAlignment(.leading).foregroundColor(Color("BlackCustom")).contrast(12.6)
        }
        .padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 9))
      }
      Spacer()
    }
  }
}

struct CustomButtonOption: View {
  @Binding var isPressed: [String: Bool]
  var content: String
  var body: some View {
    Button(action: {
      isPressed[content] = true
          
      for (key, _) in (isPressed.filter { $0.key != content }) {
          isPressed[key] = false
      }
      
      }, label: {
      Text(content)
        .font(.system(size: 15))
        .scaleEffect(isPressed[content] ?? false ? 1.1 : 1.0)
        .shadow(color: isPressed[content] ?? false ? Color("GreenCustom") : Color.clear, radius: 10, y: 9)
        .foregroundColor(isPressed[content] ?? false ? Color("GreenCustom") : Color("BlackCustom"))
      })
    .frame(maxWidth: .infinity, maxHeight: 20) // Expand horizontally
  }
}

struct ContactCompanyView: View {
  @StateObject var contactCompanyViewModel = CompanyViewModel()
  @State var isPressed: [String: Bool] = ["Producto": true]
  @State var selectedPage: Int = 0
  @State var dispScrollView: Bool = false
    
  var body: some View {
    if !dispScrollView {
      NavigationStack {
        VStack(alignment: .leading) {
          HStack {
            Image("Enterprise-Centre-Solar-Panels")
              .resizable()
              .scaledToFill()
              .frame(maxWidth: .infinity, maxHeight: 165)
              .roundedCorner(10, corners: [.bottomLeft, .bottomRight])
            }
            .padding(.bottom, 10)
          HStack {
            CustomButtonOption(isPressed: $isPressed, content: "Producto")
            CustomButtonOption(isPressed: $isPressed, content: "Contacto")
            CustomButtonOption(isPressed: $isPressed, content: "Reviews")
          }
          Spacer()
          TabViewImages()
          ForEach(Array(isPressed.keys), id: \.self) { key in
            if let value: Bool = isPressed[key], value == true {
              if key == "Producto" {
                ServiceComponentView()
              }
              if key == "Contacto" {
                ContactCompanyComponentView(modelCompany: contactCompanyViewModel)
              }
              if key == "Reviews" {
                ContactCompanyRatingView(dispScrollView: $dispScrollView)
              }
            }
          }
          Spacer()
          }.onAppear {
            Task {
              let specificUUIDString = "a3c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e"
              if let specificUUID = UUID(uuidString: specificUUIDString) {
                await contactCompanyViewModel.fetchCompanyById(idCompany: specificUUID)
              } else {
                print("Invalid UUID string: \(specificUUIDString)")
              }
            }
          }
          .navigationTitle(contactCompanyViewModel.contentCompany.name)
          .navigationBarTitleDisplayMode(.inline)
          .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
              Image(systemName: "chevron.left").foregroundColor(.white)
            }
          }
        }
    } else {
      ScrollViewRating(dispScrollView: $dispScrollView, isPressed: $isPressed)
        .onAppear {
          isPressed = ["Producto": false, "Contacto": false, "Reviews": true]
      }
    }
  }
}

