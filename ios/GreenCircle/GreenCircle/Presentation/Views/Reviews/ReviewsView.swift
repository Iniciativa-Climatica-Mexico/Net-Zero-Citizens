//
//  ReviewsView.swift
//  GreenCircle
//
//  Created by Diego Vega Camacho on 29/09/23.
//

import Foundation
import SwiftUI

struct ReviewsView: View {
  @State private var isSecondViewPresented = false
  @State private var scoreRating: Int = 0
  @StateObject var reviewViewModel: ReviewViewModel = ReviewViewModel()
  @EnvironmentObject var companyId: CompanyReviewViewModel
    
  var goOpinions: () -> Void
  var goScrollRating: () -> Void
  
  var body: some View {
      NavigationView {
          VStack {
              VStack(alignment: .leading, spacing: 10) {
                  Text("Califica al proveedor")
                      .font(.system(size: 24))
                      .foregroundColor(Color("MainText"))
                      .bold()
                  Text("Comparte tu opinion sobre este proveedor")
                      .font(.system(size: 15))
                      .foregroundColor(Color("BlackCustom"))
                  
                  MainButton("Crear Reseña") {  
                    goOpinions()
                  }.padding()
                  
                  
                  Text("Opiniones del proveedor")
                      .font(.system(size: 24))
                      .foregroundColor(Color("MainText"))
                      .bold()
                  
                  VStack {
                      RatingView(reviewViewModel: reviewViewModel)
                  }
              }
              Spacer()
          }
      }.onAppear {
          Task {
              await reviewViewModel.fetchReviewByCompanyId(companyId: companyId.companyReviewId.companyId)
          }
      }
  }
}

struct OpinionsView: View {
    
    @State private var title: String = ""
    @State private var description: String = ""
    @State private var score: Int = 0
    @State private var isPresented: Bool = false
    @State private var isError: Bool = false
    @StateObject var opinionsViewModel: ReviewViewModel = ReviewViewModel()
    @EnvironmentObject var companyId: CompanyReviewViewModel
    
    var goReviews: () -> Void
    var goOpinions: () -> Void
    
    var body: some View {
      NavigationView {
        VStack(alignment: .leading, spacing: 10) {
          Text("Comparte tu opinión")
                .font(.system(size: 24))
                .foregroundColor(Color("MainText"))
                .bold()
          
          Text("¿Cómo calificarías la atención y servicio del proveedor?")
                .font(.system(size: 15))
                .foregroundColor(Color("BlackCustom"))
          
          StarRatingView(score: $score).customSectionPadding()
          
          Text("Escribe una opinión")
                .font(.system(size: 24))
                .foregroundColor(Color("MainText"))
                .bold()
          
          Text("(Opcional)")
                .font(.system(size: 15))
                .foregroundColor(Color("BlackCustom"))
          
          Text("Tus comentarios ayudan a otros usuarios a conocer mejor a un proveedor")
                .font(.system(size: 15))
                .foregroundColor(Color("BlackCustom"))
          
          VStack(alignment: .leading, spacing: 10) {
            Text("Escribe un título para la opinión").foregroundColor(Color("BlackCustom")).bold().padding(.top, 10)
            
            TextField("¿Cuál es la idea general?", text: $title)
              .padding()
              .background(RoundedRectangle(cornerRadius: 10).stroke(Color.gray, lineWidth: 1))
            
            Text("Danos tu opinión").foregroundColor(Color("BlackCustom")).bold().padding(.top, 20)
            
            TextField("Describe tu experiencia", text: $description)
              .padding().frame(height: 150)
              .background(RoundedRectangle(cornerRadius: 10).stroke(Color.gray, lineWidth: 1))
            
            MainButton("Publicar") {
                Task {
                    
                    await opinionsViewModel.addReview(companyId: companyId.companyReviewId.companyId , reviewTitle: title, review: description, score: score)
                    if opinionsViewModel.responsePost == "Added review" {
                        isPresented = true
                    } else {
                        isError = true
                        isPresented = true
                    }
                }

            }
            .padding(.top)
            .disabled(score == 0)
            .buttonStyle(PlainButtonStyle())
            .alert(isPresented: $isPresented) {
                Alert(
                    title: Text(isError ? "Reseña enviada con éxito" : "Reseña no enviada"),
                    message: Text(isError ? "La reseña se ha publicado exitosamente." : "La reseña no se pudo enviar."),
                    dismissButton: .default(Text("Aceptar")) {
                        isError = false
                        goReviews()
                    }
                )
            }
          }
        }
        .padding(EdgeInsets(top: 10, leading: 20, bottom: 0, trailing: 20))
        .navigationBarTitle(Text("Opiniones"))
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
          ToolbarItem(placement: .topBarLeading) {
            Button {
              goReviews()
            } label: {
              Image(systemName: "chevron.left")
                .foregroundColor(.white)
          }
        }
      }
    }
  }
}


struct RatingView: View {
    @ObservedObject var reviewViewModel: ReviewViewModel
    @EnvironmentObject var CompanyReview: CompanyReviewViewModel
    @State private var totalReviews: Int = 0
    
    var averageScore: Double {
        if reviewViewModel.contentReview.isEmpty {
            return 0.0
        } else {
            let totalScore = reviewViewModel.contentReview.reduce(0) { $0 + Int($1.score) }
            return Double(totalScore) / Double(reviewViewModel.contentReview.count)
        }
    }
    
    var body: some View {
        VStack {
            HStack {
                VStack(alignment: .center) {
                    Text(String(format: "%.1f", averageScore))
                        .font(.system(size: 60, weight: .bold, design: .default)).foregroundColor(Color("Secondary"))
                }
                
                VStack(alignment: .leading) {
                    HStack {
                        ForEach(0..<5) { index in
                            if index < Int(averageScore) {
                                Image(systemName: "star.fill")
                                    .resizable()
                                    .frame(width: 15, height: 15)
                            } else if index == Int(averageScore) && averageScore.truncatingRemainder(dividingBy: 1) > 0 {
                                Image(systemName: "star.leadinghalf.fill")
                                    .resizable()
                                    .frame(width: 15, height: 15)
                            } else {
                                Image(systemName: "star")
                                    .resizable()
                                    .frame(width: 15, height: 15)
                            }
                        }
                        .foregroundColor(Color("Secondary"))
                    }
                    .font(.headline)
    
                    Text("\(reviewViewModel.contentReview.count) opiniones")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }
        }
    }
}

struct StaticStarView: View {
    @State private var isTapped = false
    let index: Int
    let label: String
    var goOpinions: () -> Void
    
    var body: some View {
        Image(systemName: "star")
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: 40, height: 40)
            .foregroundColor(Color("Secondary"))
            .padding(.trailing, 20)
            .onTapGesture {
                isTapped.toggle()
                goOpinions()
            }
    }
}

struct StaticStarRatingView: View {
    var goOpinions: () -> Void
    
    var body: some View {
        HStack {
            ForEach(1...5, id: \.self) { index in
                StaticStarView(index: index, label: index == 1 ? "Malo" : (index == 5 ? "Excelente" : ""), goOpinions: goOpinions)
            }
        }
        
    }
}

struct StarView: View {
    @Binding var score: Int
    let index: Int
    let label: String
    
    var body: some View {
        Image(systemName: index <= score ? "star.fill" : "star")
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: 40, height: 40)
            .foregroundColor(Color("Secondary"))
            .padding(.trailing, 20)
            .onTapGesture {
                score = index
            }
            .accessibility(label: Text(label))
    }
}

struct StarRatingView: View {
    @StateObject var reviewViewModel = ReviewViewModel()
    @Binding var score: Int
    
    var body: some View {
        HStack {
            ForEach(1...5, id: \.self) { index in
                StarView(score: $score, index: index, label: index == 1 ? "Malo" : (index == 5 ? "Excelente" : ""))
            }
        }
        .environmentObject(reviewViewModel)
    }
}

// Utilities

extension View {
    func customSectionPadding() -> some View {
        self.padding(EdgeInsets(top: 10, leading: 0, bottom: 10, trailing: 0))
    }
    func customTextPadding() -> some View {
        return self.padding(EdgeInsets(top: 7, leading: 0, bottom: 7, trailing: 0))
    }
}
