//
//  CompanyViewModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation

/// Implementación de view model de modelo de Compañía
class CompanyViewModel: ObservableObject {
  /// Caso de uso para hacer fetch de los datos de compañía
  private let useCase: CompanyUseCase
  private let repository: CompanyRepository
  
  @Published var currentCompany: Company?
  
  @Published var order: String = ""
  @Published var state: String = ""
  @Published var product: String = ""
  
  @Published var sheet: Bool = false
  
  @Published var companies = [Company]()
    
    enum CompanyViewModelError: Error {
        case failedToFetchCompanies
    }

  
  @Published var searchCompany = ""
  
  /// La compañía puede cambiar en la vista (se construye .onAppear())
  @Published var contentCompany: Company = Company(
    companyId: UUID(uuidString: "") ?? UUID(),
    userId: "",
    name: "",
    description: "",
    email: "",
    phone: "",
    webPage: "",
    street: "",
    streetNumber: "",
    city: "",
    state: "",
    zipCode: "",
    profilePicture: "",
    status: .approved,
    createdAt: "",
    updatedAt: "",
    products: [],
    score: 0.0,
    oneComment: "",
    files: []
    )
  
  /// Para implementar el caso de uso en la vista que llame al ViewModel Compañía
    init(useCase: CompanyUseCase = CompanyUseCase.shared, repository: CompanyRepository = CompanyRepository.shared) {
        self.useCase = useCase
        self.repository = repository
    }
  
  @MainActor
  /// Obtener información de la compañía mediante el caso de uso
  /// Actualización de la compañía si existe el UUID en base de datos
  func fetchCompanyById(idCompany: UUID) async {
    let resultCompany = await useCase.fetchCompanyById(id: idCompany)
    if let resultCompany = resultCompany {
      contentCompany = resultCompany
    }
  }
    
    @MainActor
    func uploadFile(file: Data, fileDescription: String, mimeType: String) async {
        let mimeType = "application/pdf"
        let fileFormat = "pdf"
        
        if let response = await repository.uploadCompanyFile(file: file, fileDescription: fileDescription, fileFormat: fileFormat, mimeType: mimeType) {
            // Maneja el valor 'response' según sea necesario
            // Por ejemplo: mostrar una notificación de éxito, actualizar la interfaz, etc.
        } else {
            // El resultado fue nil, manejar según sea necesario
            print("No se recibió respuesta o hubo un error al cargar el archivo.")
            // Por ejemplo: mostrar una notificación de error
        }
    }
    
  @MainActor
  func fetchAllCompanies() async {
    self.companies = await useCase.fetchAllCompanies()!.rows
  }
  
  
  @MainActor
  func fetchFilteredCompanies() async {
    self.companies = await useCase.filterCompany(order: order, product: product, state: state)
  }
  
  var filteredCompanies: [Company] {
    if searchCompany.isEmpty {
      return companies
    } else {
      return companies.filter { company in
        return company.name.localizedCaseInsensitiveContains(searchCompany)
      }
    }
  }

}
