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
  private let fetchCompanyInfoUseCase: FetchCompanyInfoUseCase
  
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
    streetNumber: 0,
    city: "",
    state: "",
    zipCode: 0,
    latitude: 0.0,
    longitude: 0.0,
    profilePicture: "",
    pdfCurriculumUrl: "",
    pdfDicCdmxUrl: "",
    pdfPeeFideUrl: "",
    pdfGuaranteeSecurityUrl: "",
    pdfActaConstitutivaUrl: "",
    pdfIneUrl: "",
    status: .approved,
    createdAt: "",
    updatedAt: "",
    products: [],
    score: 0.0,
    oneComment: "",
    images: []
    )
  /// Para implementar el caso de uso en la vista que llame al ViewModel Compañía
  init(fetchCompanyInfoUseCase: FetchCompanyInfoUseCase = FetchCompanyInfoUseCaseImpl.shared) {
    self.fetchCompanyInfoUseCase = fetchCompanyInfoUseCase
  }
  @MainActor
  /// Obtener información de la compañía mediante el caso de uso
  /// Actualización de la compañía si existe el UUID en base de datos
  func fetchCompanyById(idCompany: UUID) async {
    let resultCompany = await fetchCompanyInfoUseCase.fetchCompanyById(id: idCompany)
    if let resultCompany = resultCompany {
        contentCompany = resultCompany
    }
  }
}
