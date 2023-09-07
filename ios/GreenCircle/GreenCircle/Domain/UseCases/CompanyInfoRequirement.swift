//
//  CompanyInfoRequirement.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation

protocol CompanyInfoRequirementProtocol {
    func getCompanyById(id: Int) async -> Company?
}

class CompanyInfoRequirement: CompanyInfoRequirementProtocol {
    let companyDataRepository: CompanyRepository
    static let shared = CompanyInfoRequirement() // Creacion de singleton
    
    init(companyDataRepository: CompanyRepository = CompanyRepository.shared) {
        self.companyDataRepository = companyDataRepository
    }
    func getCompanyById(id: Int) async -> Company? {
        return await companyDataRepository.getCompanyById(companyId: id)
    }
    
}
