//
//  CompanyRegisterDividerViewModel.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/10/23.
//

import Foundation

class CompanyRegisterDividerViewModel: ObservableObject {
  let useCase = CompanyUseCase.shared
  
  @MainActor
  func handleContinue(photoVoltaicToggle: Bool, solarToggle: Bool) async -> Bool{
    var products = [String]()

    if photoVoltaicToggle {
      products.append("Paneles Solares")
    }
    
    if solarToggle {
      products.append("Calentadores Solares")
    }
    
    return await useCase.addProductsToCompany(products: products)
  }
  
}
