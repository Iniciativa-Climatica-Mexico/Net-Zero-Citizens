//
//  CardView.swift
//  catalogo
//
//  Created by Diego Iturbe on 18/09/23.
//

import SwiftUI


struct CatalogView: View {
  @StateObject var viewModel = CompanyViewModel()
  @State var availableProducts = false
  var body: some View {
    
    NavigationStack {
      List(viewModel.companies) { company in
          ZStack {
            NavigationLink(destination: ContactCompanyView(idCompany: company.companyId)) {
              EmptyView()
            }.buttonStyle(PlainButtonStyle())
            RoundedRectangle(cornerRadius: 25, style: .continuous)
              .fill(.white)
              .shadow(color: .gray, radius: 2)
              .frame(width: 350, height: 160) // Adjusted card size

            HStack {
              if let imageURL = URL(string: company.images?.first?.imageUrl ?? "") {
                AsyncImage(url: imageURL) { phase in
                  switch phase {
                    case .empty:
                      Image(systemName: "square.fill")
                        .resizable()
                        .frame(width: 90, height: 100)
                        .foregroundColor(.gray)
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
                  .frame(width: 90, height: 90)
                  .foregroundColor(.gray)
              }

              VStack(spacing: 10) {
                Text(company.name)
                  .font(.title)
                
                  .fontWeight(.bold)
                  .foregroundColor(.black)
                HStack {
                    Image(systemName: "location.fill")
                      .foregroundColor(.green)
                    Text("\(company.streetNumber) \(company.street)")
                      .foregroundColor(.green)
                }
                HStack {
                  Image(systemName: "star.fill")
                    .foregroundColor(.green)
                  Image(systemName: "star.fill")
                    .foregroundColor(.green)
                  Image(systemName: "star")
                    .foregroundColor(.green)
                  Image(systemName: "star")
                    .foregroundColor(.green)
                  Image(systemName: "star")
                    .foregroundColor(.green)
                  Text(String(0))
                    .foregroundColor(.green)
                }
              }
              .multilineTextAlignment(.center)
              Image(systemName: "heart")
                .foregroundColor(.gray)
              
            }
            .frame(width: 330, height: 180)
          }

          .listRowSeparator(.hidden)
          .listRowInsets(.init(top: 10, leading:10, bottom:0, trailing:10))
          .padding(.vertical, 5)
        }
      .padding(EdgeInsets(top: 0, leading: 2, bottom: 0, trailing: 2))

        .listRowInsets(.init(top: 10, leading:10, bottom:0, trailing:10))
        
        .listStyle(.plain)
        .navigationTitle("Proveedores")
        .navigationBarTitleDisplayMode(.inline)

    }
      .onAppear {
      Task {
        await viewModel.fetchAllCompanies()
      }
    }
  }
}

