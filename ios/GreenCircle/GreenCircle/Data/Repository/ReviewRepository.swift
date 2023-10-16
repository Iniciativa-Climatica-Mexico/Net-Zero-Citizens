//
//  ReviewRepository.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 27/09/23.
//

import Foundation

/// Clase con la estructura de la API de autenticación
class ReviewAPI {
    static let base = APIRoutes.Review.base
  struct Routes {
    static let companyReview = "/company"
    static let userReview = "/user"
    static let postReview = "/:userId/:companyId"
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
    
    func addReview(userId: String, companyId: String, reviewBody: ReviewPostData) async -> String? {
        let jsonObjetct: [String: Any] = [
            "reviewTitle": reviewBody.reviewTitle,
            "review": reviewBody.review,
            "score": reviewBody.score
            ]
        
        let endpoint = ReviewAPI.base + ReviewAPI.Routes.postReview.replacingOccurrences(of: ":userId", with: userId)
            .replacingOccurrences(of: ":companyId", with: companyId)
        
        return await NetworkAPIService.shared.postRequest(URL(string: endpoint)!, body: jsonObjetct)
    }
}