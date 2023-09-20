//
//  ContentViewModel.swift
//  catalogo
//
//  Created by Diego Iturbe on 18/09/23.
//

import Foundation

class ContentViewModel: ObservableObject {
  @Published var companies = [Company]()
  var repository = CompanyRepository.shared
  
  @MainActor
  func getCompanies() async {
    guard let companies =
            await repository.getCompanies(authToken: "") else { return }
    
    self.companies = companies.rows
  }
}

