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
    @Published var reviewFields : Review = Review(
        reviewId: UUID(uuidString: "") ?? UUID(),
        userId: UUID(),
        companyId: UUID(),
        reviewTitle: "",
        score: 0.0,
        review: "",
        createdAt: "",
        updatedAt: ""
//        user: User()
    )
    @Published var totalReviews = Int ()
    
    init (reviewUseCase: ReviewUseCase = ReviewUseCase.shared) {
        self.fetchReviewUseCase = reviewUseCase
    }
    
    @MainActor
    
    func fetchReviewByCompanyId(companyId: String) async {
        let resultReview = await fetchReviewUseCase.fetchReviewByCompanyId(cmpyId: companyId)
        if let resultReview = resultReview {
            print("Review recibida: \(resultReview)")
            contentReview = resultReview.rows
            let totalReviews = resultReview.total
            print("Total de reseñas: \(totalReviews)")
        } else {
            print("No se pudo obtener la review por Company")
        }
    }
    
    @MainActor
    func fetchReviewByUserId() async {
        let userId: String = fetchReviewUseCase.lService?.user.id ?? ""
        let resultReview = await fetchReviewUseCase.fetchReviewByUserId(usId: userId)
        if let resultReview = resultReview {
            print("Review recibida: \(resultReview)")
            contentReview = resultReview.rows
            let totalReviews = resultReview.total
            print("Total de reseñas: \(totalReviews)")
        } else {
            print("No se pudo obtener la review por User")
        }
    }
}
