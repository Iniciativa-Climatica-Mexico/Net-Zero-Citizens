//
//  CompanyRepository.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import Foundation

class CompanyAPI {
  static let base = "http://localhost:3000/api/v1/company"
  struct Routes {
    static let create = "/create"
  }
}

protocol CompanyRepositoryProtocol {
  func postCompany(authToken: String, company: PostCompanyData) async
}

class CompanyRepository: CompanyRepositoryProtocol {
  static let shared = CompanyRepository()
  let nService: NetworkAPIService = NetworkAPIService()
  
  func postCompany(authToken: String, company: PostCompanyData) async {
    await nService
      .postCompany(url:
                    URL(
                      string: "\(CompanyAPI.base)\(CompanyAPI.Routes.create)")!,
                   authToken: authToken, company: company)
  }
}
