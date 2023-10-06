//
//  ReviewService.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 27/09/23.
//

import Foundation

import Alamofire

class ReviewService {

    static let shared = ReviewService()
    private let localService = LocalService.shared
        
    private let token = ""
    private let refreshToken = ""
    
    private let headers: HTTPHeaders

        private init() {
            self.headers = [
                "Authorization": "Bearer \(self.token)",
                "Refresh-Token": self.refreshToken,
                "Accept": "application/json"
            ]
        }
    
    func fetchReviewByCompanyId(url: URL) async -> PaginatedQuery<Review>? {

        let taskRequest = AF.request(url, method: .get, headers: headers).validate()
        let response = await taskRequest.serializingData().response

        switch response.result {
        case .success(let data):
            let decoder = JSONDecoder()
            decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
            if let jsonString = String(data: data, encoding: .utf8) {
                  print("JSON received: \(jsonString)")
              }
            do {
                        decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
                        return try decoder.decode(PaginatedQuery<Review>.self, from: data)
                    } catch {
                        // Log the error to help with debugging
                        print("Failed to decode JSON: \(error)")
                        return nil
                    }
        case .failure(let error):
            // Log the error to help with debugging
            print("HTTP request failed: \(error)")
            debugPrint(error.localizedDescription)
            return nil
        }
    }
    
    func fetchReviewByUserId(url: URL) async -> PaginatedQuery<Review>? {
        // Usando el nuevo authToken hardcodeado

        let taskRequest = AF.request(url, method: .get, headers: headers).validate()
        let response = await taskRequest.serializingData().response

        switch response.result {
        case .success(let data):
            let decoder = JSONDecoder()
            decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
            if let jsonString = String(data: data, encoding: .utf8) {
                  print("JSON received: \(jsonString)")
              }
            do {
                        decoder.dateDecodingStrategy = .iso8601WithFractionalSeconds
                        return try decoder.decode(PaginatedQuery<Review>.self, from: data)
                    } catch {
                        // Log the error to help with debugging
                        print("Failed to decode JSON: \(error)")
                        return nil
                    }
        case .failure(let error):
            // Log the error to help with debugging
            print("HTTP request failed: \(error)")
            debugPrint(error.localizedDescription)
            return nil
        }
    }
    
}
