//
//  BackEndService.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 06/09/23.
//

import Foundation
import Alamofire

class BackEndService {
    static let shared = BackEndService()
    // GET all companies
    func getCompanyById(url: URL) async -> Company? {
        let taskRequest = AF.request(url, method: .get).validate()
        let response = await taskRequest.serializingData().response

        switch response.result {
        case .success(let data):
            do {
                return try JSONDecoder().decode(Company.self, from: data)
            } catch {
                return nil
            }
        case let .failure(error):
            debugPrint(error.localizedDescription)
            return nil
        }
    }
}
