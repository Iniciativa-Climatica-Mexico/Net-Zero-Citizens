//
//  ContactCompany.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 07/09/23.
//

import SwiftUI

struct TabViewImagesProducts: View {
  @ObservedObject var productImages: CompanyViewModel
  @State private var index = 0
  @Binding var bindImageToDescription: Bool
  @State private var descriptionBind: [Int: String] = [:]
  @State private var nameBind: [Int: String] = [:]
  
  var body: some View {
      VStack {
        TabView(selection: $index) {
          ForEach(productImages.contentCompany.products?.indices ?? 0..<1, id: \.self) { productIndex in
            if let product = productImages.contentCompany.products?[productIndex] {
              AsyncImage(url: URL(string: product.imageUrl)) { phase in
                switch phase {
                case .empty:
                  ProgressView()
                case .success(let imageProduct):
                  imageProduct
                    .resizable()
                    .scaledToFit()
                    .cornerRadius(10)
                    .frame(maxWidth: 230, maxHeight: 200)
                case .failure(_):
                    Text("Error cargando imagen")
                @unknown default:
                  EmptyView()
                }
              }
              .onAppear {
                descriptionBind[productIndex] = product.description
                nameBind[productIndex] = product.name
              }
            }
          }
      }
      .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
      HStack(spacing: 7) {
        ForEach(productImages.contentCompany.products?.indices ?? 0..<1, id: \.self) { productIndex in
           Circle()
           .fill(productIndex == self.index ? Color("BlackCustom") : Color("BlackCustom").opacity(0.5))
           .frame(width: 7, height: 7)
           
         }
        }
      }.frame(maxHeight: bindImageToDescription ? 190 : 190)
      .padding(.top, 10)
    if bindImageToDescription {
      ZStack {
        ContactCompanyProductView(productDescription: descriptionBind[index] ?? "", productName: nameBind[index] ?? "")
        }
      }
    }
}

struct ContactCompanyProductView: View {
  var productDescription: String
  var productName: String
  var body: some View {
    VStack(alignment: .leading) {
      Text(productName)
        .foregroundColor(Color("BlackCustom"))
        .contrast(12.6)
        .font(.system(size: 18)).bold()
      VStack {
        Text(productDescription)
          .foregroundColor(Color("BlackCustom"))
          .contrast(12.6)
          .font(.system(size: 13))
          .padding(EdgeInsets(top: 5, leading: 0, bottom: 6, trailing: 0))
          .lineSpacing(8)
      }
      Spacer()
    }.padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
  }
}

struct ContactCompanyRatingView: View {
  @ObservedObject var modelCompanyRating: CompanyViewModel
  @Binding var dispScrollView: Bool
  var body: some View {
    if !dispScrollView {
      VStack(alignment: .leading) {
        Text("Rating")
          .font(.system(size: 18))
          .padding(.bottom, 3).bold()
        HStack {
          ForEach(0..<5) { index in
            if index < Int($modelCompanyRating.contentCompany.score.wrappedValue) {
              Image(systemName: "star.fill")
                .resizable()
                .frame(width: 11, height: 11)
            } else if index == Int(modelCompanyRating.contentCompany.score) {
              Image(systemName: "star.leadinghalf.fill")
                .resizable()
                .frame(width: 11, height: 11)
            } else {
              Image(systemName: "star")
                .resizable()
                .frame(width: 11, height: 11)
            }
          }
          Text(String(modelCompanyRating.contentCompany.score))
        }
          .padding(.bottom, 5)
          .foregroundColor(Color("GreenCustom"))
        
        Divider()
        Text("Reviews")
          .font(.system(size: 16))
          .foregroundColor(Color("BlackCustom")).contrast(12.6)
          .padding(.bottom, 3).bold()
        VStack(spacing: 6) {
          Text(modelCompanyRating.contentCompany.oneComment)
            .font(.system(size: 13))
            .foregroundColor(Color("BlackCustom")).contrast(12.6)
        }
        HStack {
          Spacer()
          Text("Ver mas...").onTapGesture {
            dispScrollView = true
          }
          .font(.system(size: 13))
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

struct ContactCompanyComponentView: View {
  @ObservedObject var modelCompany: CompanyViewModel
  var body: some View {
    VStack(alignment: .leading, spacing: 6) {
      Text("Conecta")
        .font(.system(size: 18))
        .foregroundColor(Color("BlackCustom")).contrast(12.6).bold()
        .padding(.bottom, 5)
      VStack(alignment: .leading, spacing: 7) {
        Text("Página web").font(.system(size: 13))
          .foregroundColor(Color("BlackCustom")).contrast(12.6)
        Text(modelCompany.contentCompany.webPage ?? "")
          .font(.system(size: 10))
          .foregroundColor(Color("GreenCustom"))
      }

      Divider()

      VStack(alignment: .leading, spacing: 7) {
        Text("Correo electrónico").font(.system(size: 13))
          .foregroundColor(Color("BlackCustom")).contrast(12.6)
        Text(modelCompany.contentCompany.email).font(.system(size: 10))
          .foregroundColor(Color("GreenCustom"))
      }

      Divider()

      VStack(alignment: .leading, spacing: 7) {
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
    .frame(maxWidth: .infinity, maxHeight: 20)
  }
}

struct ContactCompanyView: View {
  @StateObject var contactCompanyViewModel = CompanyViewModel()
  @State var isPressed: [String: Bool] = ["Producto": true]
  @State var selectedPage: Int = 0
  @State var dispScrollView: Bool = false
  @State var bindImageToDescription: Bool = false
  @State var stringDescription: String = ""
  var body: some View {
    GeometryReader { geometry in
      if !dispScrollView {
        NavigationStack {
          VStack(alignment: .leading) {
            TabView {
              ForEach(contactCompanyViewModel.contentCompany.images ?? [], id: \.self) { image in
                if let imageUrl = image.imageUrl {
                  AsyncImage(url: URL(string: imageUrl)) { phase in
                    switch phase {
                    case .empty:
                      ProgressView()
                    case .success(let image):
                      image
                        .resizable()
                        .scaledToFill()
                        .frame(maxWidth: .infinity, maxHeight: bindImageToDescription ? 165 : 165)
                        .roundedCorner(10, corners: [.bottomLeft, .bottomRight])
                    case .failure:
                      Text("Failed to load Image!!")
                    @unknown default:
                      fatalError()
                    }
                  }
                }
              }
            }.tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
              .padding(.bottom, 15)
            HStack {
              CustomButtonOption(isPressed: $isPressed, content: "Producto")
              CustomButtonOption(isPressed: $isPressed, content: "Contacto")
              CustomButtonOption(isPressed: $isPressed, content: "Reviews")
            }
            TabViewImagesProducts(productImages: contactCompanyViewModel, bindImageToDescription: $bindImageToDescription)
            ForEach(Array(isPressed.keys), id: \.self) { key in
              if let value: Bool = isPressed[key], value == true {
                  if key == "Producto" {
                    Text("").onAppear {
                      bindImageToDescription = true
                    }
                  }
                  if key == "Contacto" {
                    ContactCompanyComponentView(modelCompany: contactCompanyViewModel).onAppear {
                      bindImageToDescription = false
                    }
                  }
                  if key == "Reviews" {
                    ContactCompanyRatingView(modelCompanyRating: contactCompanyViewModel, dispScrollView: $dispScrollView).onAppear {
                      bindImageToDescription = false
                    }
                }
              }
            }
          }.onAppear {
            Task {
              let specificUUIDString = "c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e"
              if let specificUUID = UUID(uuidString: specificUUIDString) {
                await contactCompanyViewModel.fetchCompanyById(idCompany: specificUUID)
              } else {
                print("Invalid UUID string: \(specificUUIDString)")
              }
            }
          }
          .offset(y: -geometry.safeAreaInsets.top)
          .navigationTitle($contactCompanyViewModel.contentCompany.name)
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
}
