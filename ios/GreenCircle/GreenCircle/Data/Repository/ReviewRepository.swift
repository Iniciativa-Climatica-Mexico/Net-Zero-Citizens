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
    static let companyReview = "/company/" //:companyId
    static let userReview = "/user/" //:userId
  }
}

/// Protocolo con la declaración del repositorio del usuario
protocol ReviewRepositoryProtocol {
  func fetchReviewByCompanyId(companyId: String) async -> Review?
    func fetchReviewByUserId(userId: String) async -> Review?
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

    func fetchReviewByCompanyId(companyId: String) async -> Review? {
      return await backEndService.fetchReviewByCompanyId(url: URL(string: "\(ReviewAPI.base)/\(companyId)")!)
    }
    
  func fetchReviewByUserId(userId: String) async -> Review? {
    return await backEndService.fetchReviewByUserId(url: URL(string: "\(ReviewAPI.base)/\(userId)")!)
  }
}
