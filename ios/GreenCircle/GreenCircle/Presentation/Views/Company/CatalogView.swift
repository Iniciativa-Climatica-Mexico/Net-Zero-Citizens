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
    
  var goReviews: () -> Void
  var goOpinions: () -> Void
  var goScrollRating: () -> Void
  
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
                .frame(minWidth: 0, maxWidth: .infinity)
                .padding(.trailing, 5)
              
              Button(action: {
                viewModel.sheet = true
              }) {
                Image(systemName: "slider.horizontal.3")
                  .resizable()
                  .aspectRatio(contentMode: .fill)
                  .frame(width: 25, height: 25)
                  .foregroundColor(Color("Primary"))
                  .padding(.leading, 10)
              }
              .foregroundColor(.blue)
              .sheet(isPresented: $viewModel.sheet) {
                FilterView(vm: viewModel)
              }
              Spacer()
            } .padding(.horizontal, 13)
              .onTapGesture {
                hideKeyboard()
              }
            
            
            ForEach(viewModel.filteredCompanies, id: \.id) { company in
              CardCatalogView(companyId: company.companyId,
                              companyName: company.name, city: company.city,
                              state: company.state, goReviews: goReviews, goOpinions: goOpinions, goScrollRating: goScrollRating)
            }
            .padding([.trailing, .leading], 20)
            .padding([.top, .bottom], 3)
            
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

//#Preview {
//  CatalogView(goReviews: {}, goOpinions: {}, goScrollRating: {})
//}
