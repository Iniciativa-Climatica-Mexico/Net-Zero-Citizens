//
//  ReviewCards.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 29/09/23.
//

import Foundation
import SwiftUI

struct ReviewCardProvider: View {
    @StateObject var reviewViewModel: ReviewViewModel
    var profilePicture: Image
    
    var body: some View {
        VStack {
            ForEach(reviewViewModel.contentReview) { review in
                    ReviewCompanyCard(review: review, profilePicture: profilePicture)
            }
        }
        .background(Color.white)
        .cornerRadius(10)
        .shadow(radius: 3)
        .padding()
        
        Divider()
        
        .onAppear {
            Task {
                await reviewViewModel.fetchReviewByCompanyId(companyId: "c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e")
            }
        }
    }
}

struct ReviewCompanyCard: View {
    var review: Review
    var profilePicture: Image
    
    var formattedDate: String {
        return dateFormatter.string(from: review.createdAt)
    }
    
    let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "dd/MM/yyyy"
        return formatter
    }()
    
    var body: some View {
        VStack {
            HStack {
                
                profilePicture
                    .resizable()
                    .frame(width: 50, height: 50)
                
                VStack(alignment: .leading) {
                    //                    Text(reviewViewModel.contentReview.user.firstName + " " + reviewViewModel.contentReview.user.lastName)
                    //                        .font(.headline)
                    Text(formattedDate)
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
                                .foregroundColor(Color("GreenCustom"))
                        }
                    }
                    .font(.headline)
                    
                    Text(String(format: "%.1f de 5", review.score))
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }
            }
            .padding(EdgeInsets(top: 15, leading: 15, bottom: 0, trailing: 15))
            
            VStack(alignment: .leading) {
                Text(review.reviewTitle)
                    .font(.headline).customTextPadding()
                
                Text(review.review)
                    .font(.body)
                    .foregroundColor(Color("BlackCustom"))
            }
            .padding(EdgeInsets(top: 0, leading: 15, bottom: 15, trailing: 15))
        }
    }
}

/*
struct ReviewCardClient: View {
    @State private var isExpanded: Bool = false
    @StateObject var reviewViewModel: ReviewViewModel
    
    // Crear un DateFormatter
    let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "dd/MM/yyyy"
        return formatter
    }()
    
    var formattedDate: String {
        return dateFormatter.string(from: reviewViewModel.contentReview.createdAt)
    }
    
    var showSeeMore: Bool {
        return reviewViewModel.contentReview.review.count > 30
    }
    
    var body: some View {
        VStack {
            HStack {
                
                VStack(alignment: .leading) {
                    
                    Text(reviewViewModel.contentReview.reviewTitle)
                        .font(.headline)
                    
                    HStack {
                        ForEach(0..<5) { index in
                            Image(systemName: index < reviewViewModel.contentReview.score ? "star.fill" : "star")
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(width: 10, height: 10)
                                .foregroundColor(Color("GreenCustom"))
                        }
                        
                        Text(String(format: "%.1f de 5", Double(reviewViewModel.contentReview.score)))
                            .font(.subheadline)
                            .foregroundColor(.gray)
                            
                    }
                    .font(.headline)
                    
                }
                
                Spacer()
                
                VStack(alignment: .leading) {
                    
                    Text(formattedDate)
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
                            .foregroundColor(Color("GreenCustom"))
                            .padding(EdgeInsets(top: 0, leading: 55, bottom: 0, trailing: 0))
                    }
                }
            }
            .padding()
        
            VStack(alignment: .leading, spacing: 10) {
                
                Text(reviewViewModel.contentReview.review)
                    .font(.body)
                    .padding(EdgeInsets(top: 0, leading: 15, bottom: 0, trailing: 15))
                    .lineLimit(isExpanded ? nil : 3)
                
                if !isExpanded {
                    HStack {
                        Spacer()
                        Text("See more...")
                            .font(.body)
                            .padding(EdgeInsets(top: 0, leading: 0, bottom: 15, trailing: 15))
                            .foregroundColor(Color("BlueCustom"))
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
                            .foregroundColor(Color("BlueCustom"))
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
*/
