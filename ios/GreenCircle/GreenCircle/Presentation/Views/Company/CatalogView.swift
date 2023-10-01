//
//  CardView.swift
//  catalogo
//
//  Created by Diego Iturbe on 18/09/23.
//  Modified by Daniel Gutiérrez Gómez 26/09/23

import SwiftUI

struct CardCatalogView: View {
  @StateObject var viewModel: CompanyViewModel
  var companyId: UUID
  var companyName: String
  var city: String
  var state: String

  init(companyId: UUID, companyName: String, city: String, state: String) {
    _viewModel = StateObject(wrappedValue: CompanyViewModel())
    self.companyId = companyId
    self.companyName = companyName
    self.city = city
    self.state = state
  }
  
  var body: some View {
    NavigationLink(destination: ContactCompanyView(idCompany: companyId)){
    ZStack {
      RoundedRectangle(cornerRadius: 10, style:.continuous)
        .fill(.white)
        .frame(width: 335, height: 150)
        .shadow(color: Color("BlueCustom"), radius: 1)
        HStack {
          VStack (alignment: .leading) {
            if let imageURL = URL(string: viewModel.contentCompany.images?.first?.imageUrl ?? "") {
              AsyncImage(url: imageURL) { phase in
                switch phase {
                  case .empty:
                    Image(systemName: "square.fill")
                      .resizable()
                      .frame(width: 100, height: 100)
                      .foregroundColor(.gray)
                      .opacity(0.3)
                  case .success(let image):
                    image
                      .resizable()
                      .scaledToFit()
                      .cornerRadius(10, corners: [.bottomLeft, .bottomRight, .topLeft, .topRight])
                      .frame(width: 100, height: 100)
                  case .failure:
                    Text("Failed to load Image!!")
                  @unknown default:
                    fatalError()
                }
              }
            } else {
              Image(systemName: "square.fill")
                .resizable()
                .frame(width: 100, height: 100)
                .foregroundColor(.gray)
                .opacity(0.3)
            }
          }
          Spacer()
          VStack(alignment: .leading, spacing: 7) {
            HStack(alignment: .top) {
              Text(companyName)
                .font(.system(size: 17))
                .lineLimit(2)
                .foregroundColor(Color("MainText"))
                .fontWeight(.bold)
            }
            HStack {
              Image(systemName: "location.fill")
                .foregroundColor(Color("BlueCustom"))
              Text("\(city), \(state)")
                .font(.system(size: 13))
                .lineSpacing(2)
            }.foregroundColor(Color("MainText"))
              .padding(.bottom, 3)
            
            HStack {
              ForEach(0..<5, id: \.self) { index in
                Image(systemName: index < Int(viewModel.contentCompany.score!) ? "star.fill" : "star")
              }.foregroundColor(Color("GreenCustom"))
              Text("\(Int(viewModel.contentCompany.score!))")
            }.font(.system(size: 13))
              .foregroundColor(Color("GreenCustom"))
          }
          .frame(maxWidth: 180, maxHeight: 120)
          .multilineTextAlignment(.leading)
          Spacer()
          VStack {
            Image(systemName: "heart")
              .foregroundColor(Color("BlueCustom"))
              .font(.system(size: 24))
              .padding(.top, 20)
            Spacer()
          }.frame(maxWidth: 25)
        }
        .frame(maxWidth: 300, maxHeight: 140)
      }
    }.onAppear {
      Task {
        await viewModel.fetchCompanyById(idCompany: companyId)
      }
    }
    .navigationTitle("Proveedores")
    .navigationBarTitleDisplayMode(.inline)
  }
}

struct CatalogView: View {
  @StateObject var viewModel = CompanyViewModel()
  var body: some View {
    NavigationStack {
      ScrollView {
        LazyVStack{
          ForEach(viewModel.companies, id: \.id) { company in
            CardCatalogView(companyId: company.companyId,
                            companyName: company.name, city: company.city, state: company.state)
          }.padding(.top, 5)
        }.padding(.top, 10)
      }
      .onAppear {
        Task {
          await viewModel.fetchAllCompanies()
        }
      }
    }
    .accentColor(.white)
  }
}
    


