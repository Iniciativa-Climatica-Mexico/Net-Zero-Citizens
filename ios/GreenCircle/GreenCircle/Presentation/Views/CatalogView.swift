//
//  CardView.swift
//  catalogo
//
//  Created by Diego Iturbe on 18/09/23.
//

import SwiftUI


struct CatalogView: View {
  @StateObject var viewModel = CompanyViewModel()
  var body: some View {
    
    NavigationStack {
      List(viewModel.companies) { company in
        NavigationLink(destination: ContactCompanyView()) {
          ZStack{
            RoundedRectangle(cornerRadius: 25, style: .continuous)
              .fill(.white)
              .shadow(color: .gray, radius: 2)
            HStack{
              Image(systemName: "square.fill")
                .resizable()
                .frame(width: 90, height: 90.0)
                .foregroundColor(.gray)
              
              VStack(spacing: 10) {
                Text(company.name)
                  .font(.title)
                
                  .fontWeight(.bold)
                  .foregroundColor(.black)
                HStack{
                  Image(systemName: "location.fill")
                    .foregroundColor(.green)
                  Text("\(company.streetNumber) \(company.street)")
                    .foregroundColor(.green)
                }
                HStack{
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
            
            
            .frame(width: 380, height: 180)
          }
          .listRowSeparator(.hidden)
          .listRowInsets(.init(top: 10, leading:10, bottom:0, trailing:10))
          .padding(.vertical, 5)
        }
        
        .listRowInsets(.init(top: 10, leading:10, bottom:0, trailing:10))
        
        .listStyle(.plain)
        .navigationTitle("Proveedores")
        
        
      }
    }
    .onAppear {
      
      Task {
        await viewModel.fetchAllCompanies()
      }
    }
  }
}

