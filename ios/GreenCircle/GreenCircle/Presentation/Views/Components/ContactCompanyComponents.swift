//
//  ContactCompanyComponents.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 01/10/23.
//

import Foundation
import SwiftUI

struct ContactCompanyProductView: View {
  var productDescription: String
  var productName: String
  var body: some View {
    VStack(alignment: .leading, spacing: 10) {
      Text(productName)
        .foregroundColor(Color("MainText"))
        .font(.system(size: 24)).bold()
      VStack {
        Text(productDescription)
          .foregroundColor(Color("MainText"))
          .font(.system(size: 17))
          .padding(EdgeInsets(top: 5, leading: 0, bottom: 6, trailing: 0))
          .lineSpacing(8)
      }
      Spacer()
    }.padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
  }
}

struct ContactCompanyComponentView: View {
  @ObservedObject var modelCompany: CompanyViewModel
  var body: some View {
    VStack(alignment: .leading, spacing: 7) {
      Text("Conecta")
        .font(.system(size: 24))
        .foregroundColor(Color("MainText"))
        .padding(.bottom, 5).bold()
      VStack(alignment: .leading, spacing: 6) {
        Text("Página web").font(.system(size: 17))
          .foregroundColor(Color("BlackCustom"))
        Text(modelCompany.contentCompany.webPage ?? "")
          .font(.system(size: 15))
          .foregroundColor(Color("MainText"))
      }

      Divider()

      VStack(alignment: .leading, spacing: 6) {
        Text("Correo electrónico").font(.system(size: 17))
          .foregroundColor(Color("BlackCustom"))
        Text(modelCompany.contentCompany.email).font(.system(size: 15))
          .foregroundColor(Color("MainText"))
      }

      Divider()

      VStack(alignment: .leading, spacing: 6) {
        Text("Dirección")
          .font(.system(size: 17))
          .foregroundColor(Color("BlackCustom"))
        HStack(spacing: 5) {
          Text("\(modelCompany.contentCompany.state ?? ""), ")
            .font(.system(size: 15))
            .foregroundColor(Color("MainText"))

          Text("\(modelCompany.contentCompany.street ?? ""), ")
            .font(.system(size: 15))
            .foregroundColor(Color("MainText"))
          
          Text(String(modelCompany.contentCompany.streetNumber ?? ""))
            .font(.system(size: 15))
            .foregroundColor(Color("MainText"))
        }
      }
      Divider()

      VStack(alignment: .leading, spacing: 6) {
        Text("Número telefónico").font(.system(size: 17))
          .foregroundColor(Color("BlackCustom"))
        Text(modelCompany.contentCompany.phone)
          .font(.system(size: 15))
          .foregroundColor(Color("MainText"))
      }

      Spacer()
    }
    .padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
    .foregroundColor(Color("BlackCustom"))
  }
}

struct ContactCompanyRatingView: View {
  @ObservedObject var modelCompanyRating: CompanyViewModel
  @Binding var dispScrollView: Bool
  
  var goReviews: () -> Void
  var goOpinions: () -> Void
  var goScrollRating: () -> Void
  
  var body: some View {
    if !dispScrollView {
      VStack(alignment: .leading, spacing: 5) {
        Text("Rating")
          .font(.system(size: 18))
          .padding(.bottom, 5).bold()
        HStack {
          ForEach(0..<5) { index in
            if index < Int(modelCompanyRating.contentCompany.score ?? 0.0) {
              Image(systemName: "star.fill")
                .resizable()
                .frame(width: 11, height: 11)
            } else if index == Int(modelCompanyRating.contentCompany.score ?? 0.0) {
              Image(systemName: "star.leadinghalf.fill")
                .resizable()
                .frame(width: 11, height: 11)
            } else {
              Image(systemName: "star")
                .resizable()
                .frame(width: 11, height: 11)
            }
          }
          Text(String(modelCompanyRating.contentCompany.score ?? 0.0))
        }
          .padding(.bottom, 5)
          .foregroundColor(Color("GreenCustom"))
        
        Divider()
        Text("Reviews")
          .font(.system(size: 16))
          .foregroundColor(Color("BlackCustom")).contrast(12.6)
          .padding(.bottom, 3).bold()
        VStack(spacing: 6) {
          Text(modelCompanyRating.contentCompany.oneComment ?? "No hay comentarios")
            .font(.system(size: 13))
            .foregroundColor(Color("BlackCustom")).contrast(12.6)
        }.padding(.bottom, 10)
        HStack {
          Spacer()
          NavigationLink(destination: ScrollViewRating(goOpinions: goOpinions, goScrollRating: goScrollRating), label: {
            Text("Ver mas...")
              .font(.system(size: 13))
              .foregroundColor(Color("BlueCustom"))
              .onTapGesture {
                goReviews()
              }
          })
          Spacer()
        }
        Spacer()
      }
      .padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))
      .foregroundColor(Color("BlackCustom"))
    }
  }
}
