//
//  ReviewRepository.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 27/09/23.
//

import Foundation

/// Clase con la estructura de la API de autenticación
class ReviewAPI {
  static let base = "http://localhost:4000/api/v1/review"
  struct Routes {
    static let companyReview = "/company" //:companyId
    static let userReview = "/user" //:userId
  }
}

/// Protocolo con la declaración del repositorio del usuario2
protocol ReviewRepositoryProtocol {
  func fetchReviewByCompanyId(companyId: String) async -> PaginatedQuery<Review>?
    func fetchReviewByUserId(userId: String) async -> PaginatedQuery<Review>?
}


/// Clase con la funcionalidad del repositorio de usuario
class ReviewRepository: ReviewRepositoryProtocol {

    let service : NetworkAPIService
  let lService = LocalService.shared
  static let shared = ReviewRepository()
  
  init(service: NetworkAPIService = NetworkAPIService.shared){
      self.service = service
      
  }

    func fetchReviewByCompanyId(companyId: String) async -> PaginatedQuery<Review>? {
        return await NetworkAPIService.shared.getRequest(URL(string: "\(ReviewAPI.base)\(ReviewAPI.Routes.companyReview)/\(companyId)")!)
    }
    
    
  func fetchReviewByUserId(userId: String) async -> PaginatedQuery<Review>? {
      return await NetworkAPIService.shared.getRequest(URL(string: "\(ReviewAPI.base)\(ReviewAPI.Routes.userReview)/\(userId)")!)
  }
}
