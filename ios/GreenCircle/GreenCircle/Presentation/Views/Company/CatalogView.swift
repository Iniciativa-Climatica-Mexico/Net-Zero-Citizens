//
//  CardView.swift
//  catalogo
//
//  Created by Diego Iturbe on 18/09/23.
//  Modified by Daniel Gutiérrez Gómez 26/09/23

import SwiftUI

struct CatalogView: View {
  @StateObject var viewModel = CompanyViewModel()
  @State var filtered = CompanyViewModel().companies
  @State private var isFilteringEmpty = false
  
  var body: some View {
    ZStack {
      NavigationStack {
        ScrollView {
          LazyVStack{
            HStack {
              TextField("Search...", text: $viewModel.searchCompany)
                .padding(7)
                .background(Color(.systemGray6))
                .cornerRadius(10)
                .frame(width: 340)
                .padding(.trailing, 10)
              
              Button(action: { viewModel.sheet = true
              }) {
                Image(systemName: "slider.horizontal.3")
                  .resizable()
                  .aspectRatio(contentMode: .fill)
                  .frame(width: 25, height: 25 )
                  .foregroundColor(Color("Primary"))
                  .padding(.trailing, 9)
              }.foregroundColor(.blue)
                .sheet(isPresented: $viewModel.sheet) {
                  FilterView(vm: viewModel)
                }
            }
            
            ForEach(viewModel.filteredCompanies, id: \.id) { company in
              CardCatalogView(companyId: company.companyId,
                              companyName: company.name, city: company.city,
                              state: company.state)
            }.padding(.top, 10)
            
            if isFilteringEmpty {
              Text("No se encontraron compañías.")
                .foregroundColor(.gray)
                .padding(.top, 10)
            }
            
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
    .onChange(of: viewModel.filteredCompanies) { filteredCompanies in
      isFilteringEmpty = filteredCompanies.isEmpty
    }
  }
}
