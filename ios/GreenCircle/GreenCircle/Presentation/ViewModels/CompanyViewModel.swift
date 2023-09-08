//
//  CompanyViewModel.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation

class CompanyViewModel: ObservableObject {
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
    var companyInfoRequirement: CompanyInfoRequirementProtocol
    init(companyInfoRequirement: CompanyInfoRequirementProtocol = CompanyInfoRequirement.shared) {
        self.companyInfoRequirement = companyInfoRequirement
    }
    @MainActor
    func getCompanyById(idCompany: UUID) async {
        let resultCompany = await companyInfoRequirement.getCompanyById(id: idCompany)
        if let resultCompany = resultCompany {
            contentCompany = resultCompany
        }
    }
}
