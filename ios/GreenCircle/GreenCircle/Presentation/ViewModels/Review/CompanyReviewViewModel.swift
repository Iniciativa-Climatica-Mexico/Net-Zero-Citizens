//
//  CompanyReviewViewModel.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 10/10/23.
//

import Foundation

struct CompanyReviewId {
    var companyId: UUID
}

class CompanyReviewViewModel: ObservableObject {
    @Published var companyReviewId: CompanyReviewId = CompanyReviewId(
        companyId: UUID(uuidString: "") ?? UUID()
    )
    
    func setCompanyId (companyId: UUID) {
        companyReviewId.companyId = companyId
    }
}
