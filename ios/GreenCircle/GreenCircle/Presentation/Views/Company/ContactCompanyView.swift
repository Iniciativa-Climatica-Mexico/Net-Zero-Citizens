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
                    .frame(maxWidth: 230, maxHeight: 180)
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
      }
    if bindImageToDescription {
        ContactCompanyProductView(productDescription: descriptionBind[index] ?? "", productName: nameBind[index] ?? "")
        .frame(height: 180)
      }
    }
}


struct ContactCompanyProductView: View {
  var productDescription: String
  var productName: String
  var body: some View {
    VStack(alignment: .leading, spacing: 5) {
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
      VStack(alignment: .leading, spacing: 5) {
        Text("Rating")
          .font(.system(size: 18))
          .padding(.bottom, 5).bold()
        HStack {
          ForEach(0..<5) { index in
            if index < Int(modelCompanyRating.contentCompany.score ?? 0.0) {
              Image(systemName: "star.fill")
                .resizable()
                .frame(width: 11, height: 11)
            } else if index == Int(modelCompanyRating.contentCompany.score ?? 0.0) {
              Image(systemName: "star.leadinghalf.fill")
                .resizable()
                .frame(width: 11, height: 11)
            } else {
              Image(systemName: "star")
                .resizable()
                .frame(width: 11, height: 11)
            }
          }
          Text(String(modelCompanyRating.contentCompany.score ?? 0.0))
        }
          .padding(.bottom, 5)
          .foregroundColor(Color("GreenCustom"))
        
        Divider()
        Text("Reviews")
          .font(.system(size: 16))
          .foregroundColor(Color("BlackCustom")).contrast(12.6)
          .padding(.bottom, 3).bold()
        VStack(spacing: 6) {
          Text(modelCompanyRating.contentCompany.oneComment ?? "No hay comentarios")
            .font(.system(size: 13))
            .foregroundColor(Color("BlackCustom")).contrast(12.6)
        }.padding(.bottom, 10)
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
    VStack(alignment: .leading, spacing: 5) {
      Text("Conecta")
        .font(.system(size: 18))
        .foregroundColor(Color("BlackCustom")).contrast(12.6).bold()
        .padding(.bottom, 5)
      VStack(alignment: .leading, spacing: 6) {
        Text("Página web").font(.system(size: 13))
          .foregroundColor(Color("BlackCustom")).contrast(12.6)
        Text(modelCompany.contentCompany.webPage ?? "")
          .font(.system(size: 10))
          .foregroundColor(Color("GreenCustom"))
      }

      Divider()

      VStack(alignment: .leading, spacing: 6) {
        Text("Correo electrónico").font(.system(size: 13))
          .foregroundColor(Color("BlackCustom")).contrast(12.6)
        Text(modelCompany.contentCompany.email).font(.system(size: 10))
          .foregroundColor(Color("GreenCustom"))
      }

      Divider()

      VStack(alignment: .leading, spacing: 6) {
        Text("Dirección")
          .font(.system(size: 13))
          .foregroundColor(Color("BlackCustom"))
          .contrast(12.6)
        HStack(spacing: 5) {
          Text("\(modelCompany.contentCompany.state ?? ""), ")
            .font(.system(size: 10))
            .foregroundColor(Color("GreenCustom"))

          Text("\(modelCompany.contentCompany.street ?? ""), ")
            .font(.system(size: 10))
            .foregroundColor(Color("GreenCustom"))
          
          Text(String(modelCompany.contentCompany.streetNumber ?? ""))
            .font(.system(size: 10))
            .foregroundColor(Color("GreenCustom"))
        }
      }
      Divider()

      VStack(alignment: .leading, spacing: 6) {
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
        if content == "Report"{
          Image(systemName: "exclamationmark.bubble")
          .shadow(color: isPressed[content] ?? false ? Color("GreenCustom") : Color.clear, radius: 10, y: 9)
          .foregroundColor(isPressed[content] ?? false ? Color("GreenCustom") : Color("BlackCustom"))
          
        } else {
          Text(content)
          .font(.system(size: 15))
          .scaleEffect(isPressed[content] ?? false ? 1.1 : 1.0)
          .shadow(color: isPressed[content] ?? false ? Color("GreenCustom") : Color.clear, radius: 10, y: 9)
          .foregroundColor(isPressed[content] ?? false ? Color("GreenCustom") : Color("BlackCustom"))
        }
      })
    .frame(maxWidth: .infinity, maxHeight: 20)
  }
}

struct ReportReasonView: View {
    var reason: String
    @Binding var selectedReason: String?

    var body: some View {
        Button(action: {
            selectedReason = reason
        }) {
            HStack {
                Text(reason)
                    .lineLimit(nil)
                    .fixedSize(horizontal: false, vertical: true)
                
                Spacer()
                if reason == selectedReason {
                    Image(systemName: "checkmark")
                        .foregroundColor(Color("GreenCustom"))
                }
            }
        }
        .padding()
    }
}

struct CompanyReportView: View {

    //@ObservedObject var modelCompanyRating: CompanyViewModel
    @ObservedObject var modelComplaint: CompanyViewModel
    @ObservedObject var viewModel: ComplaintViewModel
    @Binding var dispScrollView: Bool
    @State var hasTriedToSubmit: Bool = false
    @State var selectedReportReason: String? = nil
    @State var description: String = ""
    @State private var showAlert: Bool = false
    @State private var showReportAlert: Bool = false

    let reportReasons = ["Productos defectuosos.",
                         "Inconformidad con el producto/servicio.",
                         "Comportamiento inapropiado.",
                         "Mal servicio.",
                         "Fraudes o estafas.",
                         "Violación legal o ética."]

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            Text("Reportar Proveedor")
                .font(.system(size: 18))
                .padding(.bottom, 5).bold()

            Divider()

            Text("Seleccione la opción por la que desea reportar:")
                .font(.system(size: 12))
                .foregroundColor(Color("BlackCustom")).contrast(12.6)
                .padding(.bottom, 20).bold()
            
            if hasTriedToSubmit && (selectedReportReason == nil || selectedReportReason!.isEmpty) {
                Text("Por favor, selecciona una razón para reportar.")
                    .font(.system(size: 14))
                    .foregroundColor(.red)
                    .padding(.bottom, 10)
            }

            ScrollView {
                ForEach(reportReasons, id: \.self) { reason in
                    ReportReasonView(reason: reason, selectedReason: $selectedReportReason)
                        .background(Color.gray.opacity(0.1))
                        .cornerRadius(8)
                        .padding(.vertical, 2)
                }

                Divider()
                    .padding(.top, 20)

                Text(" Añade un comentario adicional (opcional)")
                    .font(.system(size: 12))
                    .foregroundColor(Color("BlackCustom")).contrast(12.6)
                    .padding(.top ,10).bold()
                    .padding(.leading ,-100)

                TextField("Comentario adicional al reporte...", text: $description)
                    .disableAutocorrection(true)
                    .padding(.top, 3)
                    .font(.system(size: 16))
                    .textFieldStyle(RoundedBorderTextFieldStyle())

                HStack {
                    Spacer()
                    Button(action: {
                        if selectedReportReason == nil || selectedReportReason!.isEmpty {
                            hasTriedToSubmit = true
//                            showReportAlert = true
                        } else {
                            Task {
                                print("print.......")
                                print(await viewModel.handleSubmit(complaintSubject: selectedReportReason ?? "", complaintDescription: description.isEmpty ? nil : description))
                                showAlert = true
                            }
                        }
                    })  {
                        Text("Mandar Reporte")
                            .foregroundColor(.white)
                            .padding(.vertical, 12)
                            .padding(.horizontal, 36)
                            .background(TitleBarColor.TitleBarColor)
                            .cornerRadius(8)
                    }
                    Spacer()
                }
                .padding(.top, 30)
            }
            .frame(height: 300)
        }
        .padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
        .foregroundColor(Color("BlackCustom"))
        .alert(isPresented: $showAlert) {
            Alert(title: Text("Confirmación"), message: Text("El reporte ha sido enviado con éxito."), dismissButton: .default(Text("Ok")))
        }
//        .alert(isPresented: $showReportAlert) {
//            Alert(title: Text("Atención"), message: Text("Por favor, selecciona una razón para reportar."), dismissButton: .default(Text("Entendido")))
//        }
    }
}



struct ContactCompanyView: View {
  var idCompany: UUID
  @StateObject var contactCompanyViewModel = CompanyViewModel()
  @StateObject var viewModel = ComplaintViewModel()
  @State private var showAlert = false
  @State var isPressed: [String: Bool] = ["Producto": true]
  @State var selectedPage: Int = 0
  @State var dispScrollView: Bool = false
  @State var bindImageToDescription: Bool = false
  @State var stringDescription: String = ""

  @Environment(\.presentationMode) var presentationMode

  var body: some View {
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
                        .frame(maxWidth: .infinity, maxHeight: 155)
                        .cornerRadius(10, corners: [.bottomLeft, .bottomRight])
                    case .failure:
                      Text("Failed to load Image!!")
                    @unknown default:
                      fatalError()
                  }
                }
              }
            }
          }.tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
            .frame(height: 155)
            .padding(.bottom, 15)
          HStack {
            CustomButtonOption(isPressed: $isPressed, content: "Producto")
            CustomButtonOption(isPressed: $isPressed, content: "Contacto")
            CustomButtonOption(isPressed: $isPressed, content: "Reviews")
            CustomButtonOption(isPressed: $isPressed, content: "Report")
              .frame(maxWidth: 35).padding(.trailing, 10)
          }
          Spacer()
          if isPressed["Producto"] ?? false || isPressed["Contacto"] ?? false
              || isPressed["Reviews"] ?? false {
            TabViewImagesProducts(productImages: contactCompanyViewModel, bindImageToDescription: $bindImageToDescription)
          }
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
              if key == "Report" {
                CompanyReportView(modelComplaint: contactCompanyViewModel, viewModel: viewModel, dispScrollView: $dispScrollView).onAppear {
                    bindImageToDescription = false
                  }

              }
            }
          }.frame(height: bindImageToDescription ? 33 : 220)
          Spacer()
        }.onAppear {
          Task {
            await contactCompanyViewModel.fetchCompanyById(idCompany: idCompany)
            if contactCompanyViewModel.contentCompany.products!.isEmpty {
              showAlert = true
            }
          }
        }
      .navigationTitle(contactCompanyViewModel.contentCompany.name)
      .navigationBarTitleDisplayMode(.inline)
      Spacer()
          .alert(isPresented: $showAlert) {
            Alert(title: Text("Error"),
                  message: Text("No contamos con products aún"),
                  dismissButton: .default(Text("Ok")) {
              presentationMode.wrappedValue.dismiss()
              
            }
        )
          }
    }
      } else {
        ScrollViewRating(idCompany: idCompany, dispScrollView: $dispScrollView, isPressed: $isPressed)
          .onAppear {
            isPressed = ["Producto": false, "Contacto": false, "Reviews": true]
          }
      }
    }
}
