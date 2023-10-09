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
                    .frame(maxWidth: 230, maxHeight: 150)
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
           .fill(productIndex == self.index ? Color("MainText") : Color("MainText").opacity(0.5))
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
    @ObservedObject var companyViewModel: CompanyViewModel
    @ObservedObject var complaintViewModel: ComplaintViewModel
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
                                print(await complaintViewModel.handleSubmit(complaintSubject: selectedReportReason ?? "", complaintDescription: description.isEmpty ? nil : description, companyId: companyViewModel.contentCompany.companyId.uuidString))
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
        .padding(EdgeInsets(top: 230, leading: 20, bottom: 0, trailing: 20))
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
  @StateObject var favouriteViewModel = FavouriteViewModel()
  @State private var showAlert = false
  @State var isPressed: [String: Bool] = ["Producto": true]
  @State var selectedPage: Int = 0
  @State var dispScrollView: Bool = false
  @State var bindImageToDescription: Bool = false
  @State var stringDescription: String = ""
  @State var showingAlert: Bool = false
  @State var showingAlertHeart: Bool = false
  @State var deleteOperation: Bool = false
  @State var messageAlert: String = ""
  @Binding var emptyHeartFill: Bool

  @Environment(\.presentationMode) var presentationMode

  var body: some View {
    if !dispScrollView {
      NavigationStack {
        VStack(alignment: .leading) {
          TabView {
              ForEach(contactCompanyViewModel.contentCompany.files ?? [], id: \.self) { image in
              if let imageUrl = image.fileUrl {
                AsyncImage(url: URL(string: imageUrl)) { phase in
                  switch phase {
                    case .empty:
                      ProgressView()
                    case .success(let image):
                      ZStack {
                        image
                          .resizable()
                          .scaledToFill()
                          .frame(maxWidth: .infinity, maxHeight: 155)
                          .cornerRadius(10, corners: [.bottomLeft, .bottomRight])
                        VStack {
                          Spacer()
                          HStack {
                            Spacer()
                            Button(action: {
                              Task {
                                if !emptyHeartFill {
                                  showingAlertHeart = true
                                  await favouriteViewModel.postFavouriteById(companyId: contactCompanyViewModel.contentCompany.companyId)
                                  if favouriteViewModel.contentFavourite.message ==
                                      "Favourite created" {
                                    messageAlert = "Se ha agregado a: " + contactCompanyViewModel.contentCompany.name + " a tus favoritos!"
                                    emptyHeartFill = true
                                    deleteOperation = false
                                  }
                                } else {
                                  deleteOperation = true
                                  showingAlertHeart = true
                                  messageAlert = "¿Eliminar a: " + contactCompanyViewModel.contentCompany.name + " de tus favoritos?"
                                }
                              }
                            }, label: {
                              Image(systemName: emptyHeartFill ? "heart.fill" : "heart")
                                .foregroundColor(.white)
                                .font(.system(size: 24))
                                .padding(EdgeInsets(top: 40, leading: 40, bottom: 0, trailing: 0))
                                .padding()
                            })
                            .alert(isPresented: $showingAlertHeart) {
                              if !deleteOperation {
                                return Alert(title: Text("Éxito"), message: Text(messageAlert))
                              }
                              else {
                                return Alert(title: Text("Confirmar borrar favoritos"), message: Text(messageAlert),
                                   primaryButton: .destructive(Text("Borrar")) {
                                  Task {
                                    emptyHeartFill = false
                                    try await favouriteViewModel.deleteFavouriteById(companyId: contactCompanyViewModel.contentCompany.companyId)
                                  }
                                   },
                                   secondaryButton: .cancel())
                              }
                            }
                          }
                        }
                      }
                     
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
          }.frame(maxHeight: 15)
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
                CompanyReportView(companyViewModel: contactCompanyViewModel, complaintViewModel: viewModel, dispScrollView: $dispScrollView).onAppear {
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
        ScrollViewRating(idCompany: idCompany, emptyHeartFill: emptyHeartFill, dispScrollView: $dispScrollView, isPressed: $isPressed)
          .onAppear {
            isPressed = ["Producto": false, "Contacto": false, "Reviews": true]
          }
      }
    }
}

