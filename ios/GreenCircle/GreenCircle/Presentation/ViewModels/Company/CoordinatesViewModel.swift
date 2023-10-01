//
//  CompanyViewModel.swift
//  GreenCircle
//
//  Created by Juan Pablo Cabrera on 06/09/23.
//

import Foundation

/// Implementación de view model de modelo de Compañía
class CoordinatesCompanyViewModel: ObservableObject {
  /// Caso de uso para hacer fetch de los datos de compañía
  private let getCoordinatesRepository: GetCoordinatesRepository
        

  @Published var companiesCoordinates: PaginatedQuery<CompanyCoordinates>?
  
  /// La compañía puede cambiar en la vista (se construye .onAppear())
    @Published var coordinates = [CompanyCoordinates]()


  init(getCoordinatesRepository: GetCoordinatesRepository = .shared) {
    self.getCoordinatesRepository = getCoordinatesRepository
  }
    
  @MainActor
    func getCoordinates() async {
        let listCompanies = await getCoordinatesRepository.getCoordinates()
        self.coordinates = listCompanies!.rows
        
    }
}
