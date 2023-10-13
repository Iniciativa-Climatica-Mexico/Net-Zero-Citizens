//
//  ReviewUseCase.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 27/09/23.
//

import Foundation

protocol ReviewUseCaseProtocol {
    func fetchReviewByCompanyId(cmpyId: String) async -> PaginatedQuery<Review>?
    func fetchReviewByUserId(usId: String) async -> PaginatedQuery<Review>?
}

class ReviewUseCase {
    var repository = ReviewRepository.shared
    static var shared = ReviewUseCase()
    let uRepository = UserRepository.shared
    
    let lService = LocalService.shared.getUserInformation()
    
    func getLocalUserData() -> AuthResponse? {
      return uRepository.getAuthData()
    }
    
    @MainActor
    func fetchReviewByCompanyId(cmpyId: String) async -> PaginatedQuery<Review>? {
        return await repository.fetchReviewByCompanyId(companyId: cmpyId)
    }
    
    @MainActor
    func fetchReviewByUserId(usId: String) async -> PaginatedQuery<Review>? {
        return await repository.fetchReviewByUserId(userId: usId)
    }
    
    @MainActor
    func addReview(usId: String, cmpyId: String, reviewBody: ReviewPostData) async -> String? {
        return await repository.addReview(userId: usId, companyId: cmpyId, reviewBody: reviewBody)
    }
}
