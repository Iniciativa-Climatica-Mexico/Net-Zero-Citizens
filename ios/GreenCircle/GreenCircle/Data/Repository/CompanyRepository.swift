//
//  CompanyRepository.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation
import Alamofire

struct Api {
    static let baseCompany = "http://localhost:3000/api/v1/company"
    struct Routes {
        static let company = "/company/"
    }
}

protocol CompanyAPIProtocol {
    // GET all companies
    
    func getCompanyById(companyId: Int) async -> Company?
}

class CompanyRepository: CompanyAPIProtocol {
    let backEndService: BackEndService
    static let shared = CompanyRepository()
    
    init(backEndService: BackEndService = BackEndService.shared) {
        self.backEndService = backEndService
    }
    
    func getCompanyById(companyId: Int) async -> Company? {
        print(URL(string: "\(Api.baseCompany)/\(companyId)")!)
        return await backEndService.getCompanyById(url: URL(string: "\(Api.baseCompany)/\(companyId)")!)
    }
}
