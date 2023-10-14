//
//  ReviewViewModel.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 27/09/23.
//

import Foundation


struct ReviewPostData {
    let reviewTitle: String
    let review: String
    let score: Int
}

class ReviewViewModel: ObservableObject {
    private let fetchReviewUseCase: ReviewUseCase
    
    @Published var contentReview =  [Review]()
    @Published var reviewFields : Review = Review(
        reviewId: UUID(uuidString: "") ?? UUID(),
        userId: UUID(),
        companyId: UUID(),
        reviewTitle: "",
        score: 0,
        review: "",
        createdAt: "",
        updatedAt: ""
    )
    @Published var totalReviews: Int = 0
    @Published var responsePost : String = ""
    
    init (reviewUseCase: ReviewUseCase = ReviewUseCase.shared) {
        self.fetchReviewUseCase = reviewUseCase
    }
    
    @MainActor
    func fetchReviewByCompanyId(companyId: UUID) async {
        let resultReview = await fetchReviewUseCase.fetchReviewByCompanyId(cmpyId: companyId.uuidString.lowercased())
        if let resultReview = resultReview {
            print("Review recibida: \(resultReview)")
            contentReview = resultReview.rows
            totalReviews = resultReview.total
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
    
    @MainActor
    func addReview(companyId: UUID, reviewTitle: String, review: String, score: Int) async {
        let userId: String = fetchReviewUseCase.lService?.user.id ?? ""
        let reviewBody = ReviewPostData(reviewTitle: reviewTitle, review: review, score: score)
        if let resposePost = await fetchReviewUseCase.addReview(usId: userId, cmpyId: companyId.uuidString.lowercased(), reviewBody: reviewBody)
        {
            responsePost = responsePost
        }
    }
}
