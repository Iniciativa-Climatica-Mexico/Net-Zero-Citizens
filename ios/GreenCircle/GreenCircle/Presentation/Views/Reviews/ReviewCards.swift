//
//  ReviewCards.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 29/09/23.
//

import Foundation
import SwiftUI

//
struct ReviewCardProvider: View {
    @StateObject var reviewViewModel: ReviewViewModel
    
    var profilePicture: Image
    
    var body: some View {
        VStack {
            ForEach(reviewViewModel.contentReview) { review in
                Divider()
                ReviewCompanyCard(review: review, profilePicture: profilePicture )
            }
            .padding(EdgeInsets(top: 0, leading: 15, bottom: 0, trailing: 15))
        }
        
        .onAppear {
            Task {
                await reviewViewModel.fetchReviewByCompanyId(companyId: "c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e")
            }
        }
    }
}

//
struct ReviewCompanyCard: View {
    var review: Review
    var profilePicture: Image
    
    func formatDate(_ dateString: String) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        dateFormatter.locale = Locale(identifier: "en_US_POSIX")
        
        if let date = dateFormatter.date(from: dateString) {
            dateFormatter.dateFormat = "dd/MM/yyyy"
            return dateFormatter.string(from: date)
        }
        
        return "Fecha no válida"
    }

    
    var body: some View {
        VStack (alignment: .leading) {
            HStack {
                
                profilePicture
                    .resizable()
                    .frame(width: 50, height: 50)
                
                VStack(alignment: .leading) {
//                    Text(review.user.firstName + " " + review.user.lastName)
//                        .font(.headline)
                    Text(formatDate(review.createdAt))
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                VStack(alignment: .trailing) {
                    HStack {
                        ForEach(0..<5) { index in
                            Image(systemName: index < Int(review.score) ? "star.fill" : "star")
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(width: 15, height: 15)
                                .foregroundColor(Color("Secondary"))
                        }
                    }
                    .font(.headline)
                    
                    Text(String(format: "%.1f de 5", review.score))
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }
            }
            .padding(EdgeInsets(top: 15, leading: 15, bottom: 0, trailing: 15))
            
            VStack (alignment: .leading) {
                Text(review.reviewTitle)
                    .font(.headline)
                
                Text(review.review)
                    .font(.body)
                    .foregroundColor(Color("BlackCustom"))
                    .padding(.top, 10)
            }
            .padding()
        }
    }
}

//
struct ReviewCardClient: View {
    @StateObject var reviewViewModel: ReviewViewModel
    
    var body: some View {
        VStack {
            ForEach(reviewViewModel.contentReview) { review in
                    ReviewClientCard(review: review)
            }
        }
        .background(Color.white)
        .cornerRadius(10)
        .padding()
        
        Divider()
        
        .onAppear {
            Task {
                await reviewViewModel.fetchReviewByUserId()
            }
        }
    }
}

//
struct ReviewClientCard: View {
    
    @State private var isExpanded: Bool = false
    var review: Review
    
    var showSeeMore: Bool {
        return review.review.count > 30
    }
    
    func formatDate(_ dateString: String) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        dateFormatter.locale = Locale(identifier: "en_US_POSIX")
        
        if let date = dateFormatter.date(from: dateString) {
            dateFormatter.dateFormat = "dd/MM/yyyy"
            return dateFormatter.string(from: date)
        }
        
        return "Fecha no válida"
    }
    
    var body: some View {
        VStack {
            HStack {
                
                VStack(alignment: .leading) {
                    
                    Text(review.reviewTitle)
                        .font(.headline)
                    
                    HStack {
                        ForEach(0..<5) { index in
                            Image(systemName: index < Int(review.score) ? "star.fill" : "star")
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(width: 10, height: 10)
                                .foregroundColor(Color("Secondary"))
                        }
                        
                        Text(String(format: "%.1f de 5", Double(review.score)))
                            .font(.subheadline)
                            .foregroundColor(.gray)
                        
                    }
                    .font(.headline)
                    
                }
                
                Spacer()
                
                VStack(alignment: .leading) {
                    
                    Text(formatDate(review.createdAt))
                        .font(.subheadline)
                        .foregroundColor(.gray)
                    
                    Menu {
                        Button(action: {
                            //                            editReview()
                        }) {
                            Label("Editar", systemImage: "pencil")
                        }
                        Button(action: {
                            //                            deleteReview()
                        }) {
                            Label("Eliminar", systemImage: "trash")
                        }
                    } label: {
                        Image(systemName: "ellipsis.circle")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 17, height: 17)
                            .foregroundColor(Color("Secondary"))
                            .padding(EdgeInsets(top: 0, leading: 55, bottom: 0, trailing: 0))
                    }
                }
            }
            .padding()
            
            VStack(alignment: .leading, spacing: 10) {
                
                Text(review.review)
                    .font(.body)
                    .padding(EdgeInsets(top: 0, leading: 15, bottom: 0, trailing: 15))
                    .lineLimit(isExpanded ? nil : 3)
                
                if !isExpanded {
                    HStack {
                        Spacer()
                        Text("See more...")
                            .font(.body)
                            .padding(EdgeInsets(top: 0, leading: 0, bottom: 15, trailing: 15))
                            .foregroundColor(Color("Primary"))
                            .onTapGesture {
                                isExpanded.toggle()
                            }
                    }
                } else {
                    HStack {
                        Spacer()
                        Text("Show less")
                            .font(.body)
                            .padding(EdgeInsets(top: 0, leading: 0, bottom: 15, trailing: 15))
                            .foregroundColor(Color("Primary"))
                            .onTapGesture {
                                isExpanded.toggle()
                            }
                    }
                }
            }
        }
        .background(Color.white)
        .cornerRadius(10)
        .shadow(radius: 1)
        .padding()
    }
}
