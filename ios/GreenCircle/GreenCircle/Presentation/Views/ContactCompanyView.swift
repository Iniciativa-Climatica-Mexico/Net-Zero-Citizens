//
//  ContactCompany.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/09/23.
//

import Foundation
import SwiftUI

struct ServiceComponentView: View {
    var body: some View {
        VStack {
            HStack {
                TabView {
                    Text("Img1")
                    Text("Img2")
                    Text("Img3")
                    Text("Img4")
            }.tabViewStyle(.page)
                .indexViewStyle(.page(backgroundDisplayMode: .always))
            }.frame(maxHeight: 200).foregroundColor(Color("BlackCustom"))
            Divider()
            HStack {
                VStack(alignment: .leading) {
                    Text("Description").bold().font(.system(size: 14))
                        .padding(EdgeInsets(top: 5, leading: 0, bottom: 6, trailing: 0))
                    Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua.")
                        .font(.system(size: 12))
                        .multilineTextAlignment(.leading)
                }.padding(EdgeInsets(top: 0, leading: 9, bottom: 0, trailing: 9))
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
            
            Text(content).foregroundColor(Color("GreenCustom"))
            .scaleEffect(isPressed[content] ?? false ? 1.1 : 1.0) // Increase scale when pressed

        }).frame(maxWidth: .infinity) // Expand horizontally
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
                    
                }.padding().frame(maxWidth: .infinity, maxHeight: 200).foregroundColor(.blue)
                Text(contactCompanyViewModel.contentCompany.name)
                    .foregroundColor(Color("BlackCustom"))
                    .padding(.leading, 25).bold() // Align the text to the leading edge
                Divider()
                HStack {
                    CustomButtonOption(isPressed: $isPressed, content: "Servicio")
                    CustomButtonOption(isPressed: $isPressed, content: "Contacto")
                    CustomButtonOption(isPressed: $isPressed, content: "Reviews")
                }.padding()
                Divider()
                Spacer()
                ForEach(Array(isPressed.keys), id: \.self) { key in
                    if let value: Bool = isPressed[key], value == true {
                        if key == "Servicio" {
                            ServiceComponentView()
                        }
                        if key == "Contacto" {
                            VStack {
                                Text("Contacto")
                                Spacer()
                            }
                        }
                        if key == "Reviews" {
                            VStack {
                                Text("Reviews")
                                Spacer()
                            }
                        }
                    }
                }
                Spacer()
            }.onAppear {
                Task {
                    await contactCompanyViewModel.getCompanyById(idCompany: 2)
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
