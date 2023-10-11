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
  let lService = LocalService.shared


  @Published var companiesCoordinates: PaginatedQuery<CompanyCoordinates>?
  
  /// La compañía puede cambiar en la vista (se construye .onAppear())
    @Published var coordinates = [CompanyCoordinates]()

  @Published var companyLocalization: CompanyCoordinates = CompanyCoordinates(companyId: "", name: "", latitude: 0.0, longitude: 0.0)

  init(getCoordinatesRepository: GetCoordinatesRepository = .shared) {
    self.getCoordinatesRepository = getCoordinatesRepository
  }
    
  @MainActor
    func getCoordinates() async {
        let listCompanies = await getCoordinatesRepository.getCoordinates()
        self.coordinates = listCompanies!.rows
    }
  
  /// - Description: Obtener las coordenadas de una sola compañía
  /// - Parameters: companyId: UUID
  @MainActor
  func getCoordinatesById(companyId: UUID) async {
    if let filterCompany = self.coordinates.first(where:{ $0.companyId == companyId.uuidString.lowercased() }) {
      self.companyLocalization = filterCompany
    }
  }
}
