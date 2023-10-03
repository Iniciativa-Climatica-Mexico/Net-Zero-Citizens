//
//  ReviewViewModel.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 27/09/23.
//

import Foundation

class ReviewViewModel: ObservableObject {
    private let fetchReviewUseCase: ReviewUseCase
    
    @Published var contentReview =  [Review]()
    
    init (
        reviewUseCase: ReviewUseCase = ReviewUseCase.shared
    ) {
        self.fetchReviewUseCase = reviewUseCase
    }
    
    @MainActor
    
    func fetchReviewByCompanyId(companyId: String) async {
        let resultReview = await fetchReviewUseCase.fetchReviewByCompanyId(cmpyId: companyId)
        if let resultReview = resultReview {
            print("Review recibida: \(resultReview)")
            contentReview = resultReview.rows
        } else {
            print("No se pudo obtener la review por Company")
        }
    }
    
    func fetchReviewByUserId(userId: String) async {
        let resultReview = await fetchReviewUseCase.fetchReviewByUserId(usId: userId)
        if let resultReview = resultReview {
            print("Review recibida: \(resultReview)")
            contentReview = resultReview.rows
        } else {
            print("No se pudo obtener la review por User")
        }
    }
}
