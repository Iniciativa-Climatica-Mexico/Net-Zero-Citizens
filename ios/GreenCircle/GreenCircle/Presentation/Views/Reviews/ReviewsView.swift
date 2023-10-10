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
  
  var goOpinions: () -> Void
  var goScrollRating: () -> Void
  
  var body: some View {
    NavigationView {
      VStack(alignment: .leading) {
        Text("Califica al proveedor").font(.title)
        Text("Comparte tu opinion sobre este proveedor")
        
        HStack(alignment: .top, spacing: 10) {
          Spacer()
          
          StarRatingView().customSectionPadding()
          
          Spacer()
        }
        .customSectionPadding()
        
        VStack {
          Text("Escribe una opinión")
            .font(.headline)
            .foregroundColor(Color("GreenCustom"))
            .onTapGesture {
              goOpinions()
            }
        }
        .customSectionPadding()
        
        Text("Opiniones del proveedor").font(.title)
        
        VStack {
          RatingView(numberOfReviews: 123)
        }
      }
      padding()
    }
  }
}

struct OpinionsView: View {
    
    @State private var title: String = ""
    @State private var description: String = ""
    var goReviews: () -> Void
    var body: some View {
      NavigationView {
        VStack(alignment: .leading, spacing: 10) {
          Text("Comparte tu opinión").font(.title).bold()
          
          Text("¿Cómo calificarías la atención y servicio del proveedor?")
          
          StarRatingView().padding().customSectionPadding()
          
          Text("Escribe una opinión").font(.title2).bold().padding(.top, 20)
          
          Text("(Opcional)")
          
          Text("Tus comentarios ayudan a otros usuarios a conocer mejor a un proveedor").customTextPadding()
          
          VStack(alignment: .leading, spacing: 10) {
            Text("Escribe un título para la opinión").foregroundColor(Color.gray).bold().padding(.top, 20)
            
            TextField("¿Cuál es la idea general?", text: $title)
              .padding()
              .background(RoundedRectangle(cornerRadius: 10).stroke(Color.gray, lineWidth: 1))
              .onTapGesture {
                goReviews()
              }
            
            Text("Danos tu opinión").foregroundColor(Color.gray).bold().padding(.top, 20)
            
            TextField("Describe tu experiencia", text: $description)
              .padding().frame(height: 150)
              .background(RoundedRectangle(cornerRadius: 10).stroke(Color.gray, lineWidth: 1))
            
            Button(action: {
              // Realiza la acción de envío del formulario
              print("Formulario enviado")
            }) {
              Text("Publicar")
                .padding().frame(maxWidth: .infinity).background(Color("BlueCustom"))
                .foregroundColor(.white).cornerRadius(10).customSectionPadding()
            }
          }
        }
        .padding(EdgeInsets(top: 20, leading: 20, bottom: 0, trailing: 20))
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

struct CompanyRating: View {
    @StateObject var reviewModel = ReviewViewModel()
    var body: some View {
        VStack {
            RatingView(numberOfReviews: reviewModel.totalReviews)
        }
    }
}

struct RatingView: View {
    @StateObject var reviewModel = ReviewViewModel()
    var numberOfReviews: Int
    var body: some View {
        VStack {
            HStack {
                VStack(alignment: .center) {
                    Text(String(format: "%.1f", reviewModel.reviewFields.score))
                        .font(.system(size: 60, weight: .bold, design: .default)).foregroundColor(Color("GreenCustom"))
    
                    Spacer()
                }
    
                VStack(alignment: .leading) {
                    HStack {
                        ForEach(0..<5) { index in
                            Image(systemName: index < Int(reviewModel.reviewFields.score) ? "star.fill" : "star")
                                .foregroundColor(Color("GreenCustom"))
                        }
                    }
                    .font(.headline)
    
                    Text("\(numberOfReviews) opiniones")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }
        }
        .onAppear{
            Task {
                await reviewModel.fetchReviewByUserId()
            }
        }
    }
}

struct StarView: View {
    @StateObject var reviewModel = ReviewViewModel()
    let index: Double
    let label: String

    var body: some View {
        ZStack {
            VStack {
                Image(systemName: reviewModel.reviewFields.score >= index ? "star.fill" : "star")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 40, height: 40)
                    .foregroundColor(Color("GreenCustom"))
                    .padding(.trailing, 20)
                    .onTapGesture {
                        reviewModel.reviewFields.score = index
                    }
            }

            Text(label)
                .font(.caption)
                .offset(x: -10, y: 35)
        }.onAppear{
            Task {
                await reviewModel.fetchReviewByUserId()
            }
        }
    }
}

struct StarRatingView: View {

    var body: some View {
            HStack {
                StarView(index: 1, label: "Malo")
                ForEach(2...4, id: \.self) { index in
                    StarView(index: Double(index), label: "")
                }
                StarView(index: 5, label: "Excelente")
            }
        }
}

// Utilities

extension View {
    func customSectionPadding() -> some View {
        return self.padding(EdgeInsets(top: 10, leading: 0, bottom: 10, trailing: 0))
    }
    func customTextPadding() -> some View {
        return self.padding(EdgeInsets(top: 7, leading: 0, bottom: 7, trailing: 0))
    }
}
