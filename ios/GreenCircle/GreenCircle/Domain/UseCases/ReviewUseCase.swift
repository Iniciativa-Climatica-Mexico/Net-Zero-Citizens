//
//  ReviewUseCase.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 27/09/23.
//

import Foundation

protocol ReviewUseCaseProtocol {
    func fetchReviewByCompanyId(cmpyId: String) async -> Review?
    func fetchReviewByUserId(usId: String) async -> Review?
}

class ReviewUseCase {
    var repository = ReviewRepository.shared
    static var shared = ReviewUseCase()
    
    @MainActor
    func fetchReviewByCompanyId(cmpyId: String) async -> Review? {
        return await repository.fetchReviewByCompanyId(companyId: cmpyId)
    }
    
    @MainActor
    func fetchReviewByUserId(usId: String) async -> Review? {
        return await repository.fetchReviewByUserId(userId: usId)
    }
}
