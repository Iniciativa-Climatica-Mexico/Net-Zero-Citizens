//
//  CompanyViewModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation

/// Implementación de view model de modelo de Compañía
class CompanyViewModel: ObservableObject {
    /// La compañía puede cambiar en la vista (se construye .onAppear())
    @Published var contentCompany: Company = Company(
            companyId: UUID(uuidString: "") ?? UUID(),
            userId: "",
            name: "",
            description: "",
            email: "",
            location: "",
            profilePicture: nil,
            status: .approved,
            phoneNumber: "",
            webPage: nil,
            createdAt: "",
            updatedAt: ""
            // product: Products(
               //  poductId: 0,
               //  companyId: 0,
               //  name: "",
               //  description: ""
            // ),
            // reviews: Reviews(
               //  idReview: 0,
               //  UUID: "",
               //  idCompany: 0,
               //  review: "",
               //  score: 0
            // )
        )
    /// Requerimientos para hacer fetch de los datos de compañía
    var companyInfoRequirement: CompanyInfoRequirementProtocol
    /// Para implementar el requerimiento en la vista que llame al ViewModel Compañía
    init(companyInfoRequirement: CompanyInfoRequirementProtocol = CompanyInfoRequirement.shared) {
        self.companyInfoRequirement = companyInfoRequirement
    }
    /// Obtener información de la compañía mediante el requerimiento
    @MainActor
    /// Actualización de la compañía si existe el UUID en base de datos
    func getCompanyById(idCompany: UUID) async {
        let resultCompany = await companyInfoRequirement.getCompanyById(id: idCompany)
        if let resultCompany = resultCompany {
            contentCompany = resultCompany
        }
    }
}
