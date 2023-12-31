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
    @EnvironmentObject var companyId: CompanyReviewViewModel
    
    var profilePicture: Image
    
    var body: some View {
        VStack {
            VStack {
                if !reviewViewModel.contentReview.isEmpty{
                    ForEach(reviewViewModel.contentReview) { review in
                        Divider()
                        ReviewCompanyCard(review: review, profilePicture: profilePicture )
                    }
                    .padding(EdgeInsets(top: 0, leading: 15, bottom: 0, trailing: 15))
                }else {
                    Divider()
                    Text("Aún no hay reviews para está compañia")
                      .foregroundColor(Color("MainText"))
                      .font(.system(size: 18))
                      .padding(.top, 30)
                  }
            }
        }
        Spacer()
        
        .onAppear {
            Task {
                await reviewViewModel.fetchReviewByCompanyId(companyId: companyId.companyReviewId.companyId)
            }
        }
    }
}

//
struct ReviewCompanyCard: View {
    @ObservedObject var modelUser = UserViewModel()
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
                    .frame(width: 60, height: 60)
                
                VStack(alignment: .leading) {
                    Text("\(modelUser.contentBaseUser?.firstName ?? "Cargando...") \(modelUser.contentBaseUser?.lastName ?? "")")
                        .font(.system(size: 13))
                        .padding(.bottom, 5)
                    Text(formatDate(review.createdAt))
                        .font(.system(size: 13))
                        .foregroundColor(Color("MainText"))
                }
                
                Spacer()
                
                VStack(alignment: .trailing) {
                    HStack {
                        ForEach(0..<5) { index in
                            Image(systemName: index < review.score ? "star.fill" : "star")
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(width: 15, height: 15)
                                .foregroundColor(Color("Secondary"))
                        }
                    }
                    .font(.headline)
                    
                    Text("\(Int(review.score)) de 5")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }
            }
            .padding(EdgeInsets(top: 15, leading: 15, bottom: 0, trailing: 15))
            
            VStack (alignment: .leading) {
                Text(review.reviewTitle)
                
                    .foregroundColor(Color("MainText"))
                    .fontWeight(.bold)
                
                Text(review.review)
                    .font(.system(size: 15))
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
            Divider()
            
            ForEach(reviewViewModel.contentReview) { review in
                    ReviewClientCard(review: review)
            }
        }
        .background(Color.white)
        .cornerRadius(10)
        .padding()
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
        return review.review.split(separator: " ").count > 10
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
                }
            }
            .padding()
            
            VStack(alignment: .leading) {
                
                Text(review.review)
                    .font(.body)
                    .padding(EdgeInsets(top: 0, leading: 15, bottom: 15, trailing: 15))
                    .lineLimit(isExpanded ? nil : 3)
                    .frame(maxWidth: .infinity, alignment: .leading)
                
                if showSeeMore {
                   HStack {
                       Spacer()
                       Text(isExpanded ? "Ver menos" : "Ver más...")
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

extension String {
    func height(withConstrainedWidth width: CGFloat, font: UIFont) -> CGFloat {
        let constraintRect = CGSize(width: width, height: .greatestFiniteMagnitude)
        let boundingBox = self.boundingRect(with: constraintRect, options: [.usesLineFragmentOrigin, .usesFontLeading], attributes: [NSAttributedString.Key.font: font], context: nil)
        return boundingBox.height
    }
}
