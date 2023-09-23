//
//  fetchAllCompanies.swift
//  GreenCircle
//
//  Created by Dan FuPo on 21/09/23.
//

import SwiftUI

protocol FetchAllCompaniesUseCaseProtocol {
  func fetchAllCompanies() async -> PaginatedQuery<Company>?
}

class FetchAllCompaniesUseCase: FetchAllCompaniesUseCaseProtocol {
  let companyRepository: CompanyRepository
  
  static let shared = FetchAllCompaniesUseCase()
  
  init(companyRepository: CompanyRepository = CompanyRepository.shared) {
    self.companyRepository = companyRepository
  }
  
  func fetchAllCompanies() async -> PaginatedQuery<Company>? {
    return await companyRepository.fetchAllCompanies()
  }
}

