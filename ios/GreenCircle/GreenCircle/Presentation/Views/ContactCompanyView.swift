//
//  ContactCompany.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/09/23.
//

import Foundation
import SwiftUI

struct TabViewImages: View {
    var body: some View {
        HStack {
            TabView {
                Image(systemName: "eraser")
                    .resizable()
                    .scaledToFit()
                    .aspectRatio(contentMode: .fit)
                Image(systemName: "eraser")
                    .resizable()
                    .scaledToFit()
                    .aspectRatio(contentMode: .fit)
                Image(systemName: "eraser")
                    .resizable()
                    .scaledToFit()
                    .aspectRatio(contentMode: .fit)
                Image(systemName: "eraser")
                    .resizable()
                    .scaledToFit()
                    .aspectRatio(contentMode: .fit)
            }.tabViewStyle(PageTabViewStyle(indexDisplayMode: .always))
                .onAppear {
                    UIPageControl.appearance().currentPageIndicatorTintColor = UIColor(Color("BlackCustom"))
                    UIPageControl.appearance().pageIndicatorTintColor = UIColor(Color("BlackCustom")).withAlphaComponent(0.3)
                }

        }.frame(maxHeight: 185)
    }
}

struct ContactCompanyRatingView: View {
    var body: some View {
        VStack(alignment: .leading) {
            Text("Rating")
                .font(.system(size: 15))
                .padding(.bottom, 3).bold().foregroundColor(Color("BlackCustom")).contrast(12.6)
            HStack {
                Image(systemName: "star.fill")
                Image(systemName: "star.fill")
                Image(systemName: "star.fill")
                Image(systemName: "star.fill")
                Image(systemName: "star.fill")
            }
            Divider()
            Text("Reviews")
                .font(.system(size: 15))
                .padding(.bottom, 3).bold().foregroundColor(Color("BlackCustom")).contrast(12.6)
            Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua.")
                .font(.system(size: 13)).foregroundColor(Color("BlackCustom")).contrast(12.6)
            Spacer()
        }.padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
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
                Text(modelCompany.contentCompany.webPage ?? "No hay página web disponible").font(.system(size: 10))
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
                Text("Dirección").font(.system(size: 13))
                    .foregroundColor(Color("BlackCustom")).contrast(12.6)
                Text(modelCompany.contentCompany.location).font(.system(size: 10))
                    .foregroundColor(Color("GreenCustom"))

            }
            Divider()

            VStack(alignment: .leading, spacing: 5) {
                Text("Número telefónico").font(.system(size: 13))
                    .foregroundColor(Color("BlackCustom")).contrast(12.6)
                Text(modelCompany.contentCompany.phoneNumber)
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
                    Text("Description").bold().font(.system(size: 14))
                        .padding(EdgeInsets(top: 5, leading: 0, bottom: 6, trailing: 0))
                    Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua.")
                        .font(.system(size: 12))
                        .multilineTextAlignment(.leading).foregroundColor(Color("BlackCustom")).contrast(12.6)
                }.padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 9))
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
        }).frame(maxWidth: .infinity, maxHeight: 20) // Expand horizontally
    }
}

struct ContactCompanyView: View {
    @StateObject var contactCompanyViewModel = CompanyViewModel()
    @State var isPressed: [String: Bool] = ["Servicio": true]
    @State var selectedPage: Int = 0
    
    init() {
        Theme.navigationBarColors(background: UIColor(Color("BlueCustom")), titleColor: .white)
    }
    
    var body: some View {
        NavigationStack {
            VStack(alignment: .leading) {
                HStack {
                    Image(systemName: "square.and.arrow.up.on.square")
                        .resizable()
                        .scaledToFit()
                        .aspectRatio(contentMode: .fit)
                    
                }.padding().frame(maxWidth: .infinity, maxHeight: 165).foregroundColor(.blue)
                Text(contactCompanyViewModel.contentCompany.name)
                    .foregroundColor(Color("BlackCustom"))
                    .padding(.leading, 25).bold() // Align the text to the leading edge
                Divider()
                HStack {
                    CustomButtonOption(isPressed: $isPressed, content: "Servicio")
                    CustomButtonOption(isPressed: $isPressed, content: "Contacto")
                    CustomButtonOption(isPressed: $isPressed, content: "Reviews")
                }
                Spacer()
                ForEach(Array(isPressed.keys), id: \.self) { key in
                    if let value: Bool = isPressed[key], value == true {
                        TabViewImages()
                        if key == "Servicio" {
                            ServiceComponentView()
                        }
                        if key == "Contacto" {
                           ContactCompanyComponentView(modelCompany: contactCompanyViewModel)
                        }
                        if key == "Reviews" {
                            ContactCompanyRatingView()
                        }
                    }
                }
                Spacer()
            }.onAppear {
                Task {
                    let specificUUIDString = "9b1d7e8a-fa5d-4e63-a5ca-6f7d40f1a2c8"
                    if let specificUUID = UUID(uuidString: specificUUIDString) {
                        await contactCompanyViewModel.getCompanyById(idCompany: specificUUID)
                    } else {
                        // Handle the case where the UUID string is not valid
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
    }
}
