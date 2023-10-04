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
  
  let backEndService: ReviewService
  let nService = NetworkAPIService.shared
  let lService = LocalService.shared
  static let shared = ReviewRepository()
  
  init(backEndService: ReviewService = ReviewService.shared){
      self.backEndService = backEndService
      
  }

    func fetchReviewByCompanyId(companyId: String) async -> PaginatedQuery<Review>? {
        return await backEndService.fetchReviewByCompanyId(url: URL(string: "\(ReviewAPI.base)\(ReviewAPI.Routes.companyReview)/\(companyId)")!)
    }
    
  func fetchReviewByUserId(userId: String) async -> PaginatedQuery<Review>? {
      return await backEndService.fetchReviewByUserId(url: URL(string: "\(ReviewAPI.base)\(ReviewAPI.Routes.userReview)/\(userId)")!)
  }
}
