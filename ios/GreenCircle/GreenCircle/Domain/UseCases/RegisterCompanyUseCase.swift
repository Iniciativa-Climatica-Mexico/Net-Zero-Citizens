//
//  RegisterCompanyUseCase.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import Foundation

class RegisterCompanyUseCase {
  static let shared = RegisterCompanyUseCase()
  let repository = CompanyRepository.shared
  
  @MainActor
  func registerCompany(authToken: String, company: PostCompanyData) async {
    await repository.postCompany(authToken: authToken, company: company)
  }
}
