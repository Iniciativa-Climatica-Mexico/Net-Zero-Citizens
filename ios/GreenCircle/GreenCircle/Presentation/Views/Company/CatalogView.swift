//
//  CardView.swift
//  catalogo
//
//  Created by Diego Iturbe on 18/09/23.
//  Modified by Daniel Gutiérrez Gómez 26/09/23

import SwiftUI

struct CatalogView: View {
  @StateObject var viewModel = CompanyViewModel()
  @State var searchQuery  = ""
  @State var filtered = CompanyViewModel().companies
  
  var body: some View {
    ZStack {
      NavigationStack {
        ScrollView {
          LazyVStack{
            HStack {
              TextField("Search...", text: $searchQuery)
                .padding(7)
                .background(Color(.systemGray6))
                .cornerRadius(10)
                .frame(width: 340)
                .padding(.trailing, 10)
              Button(action: {
              }) {
                Image(systemName: "slider.horizontal.3")
                  .resizable()
                  .aspectRatio(contentMode: .fill)
                  .frame(width: 25, height: 25 )
                  .foregroundColor(Color("Primary"))
                  .padding(.trailing, 9)
              }
            }
            
            ForEach(viewModel.companies, id: \.id) { company in
              CardCatalogView(companyId: company.companyId,
                              companyName: company.name, city: company.city,
                              state: company.state)
            }.padding(.top, 10)
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
  
  func filteredCompanies() {
    if searchQuery.isEmpty {
      filtered = viewModel.companies
    } else {
      filtered = viewModel.companies.filter {
        $0.name.localizedCaseInsensitiveContains(searchQuery)
      }
    }
  }
}
