//
//  RatingCompanyView.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 13/09/23.
//  Modified by Diego Vega on 28/09/23.
//

import SwiftUI

struct ScrollViewRating: View {
  var idCompany: UUID
  @Binding var dispScrollView: Bool
  @Binding var isPressed: [String: Bool]
  
  var body: some View {
    NavigationStack {
      if dispScrollView && !isPressed["Producto", default: false] && !isPressed["Contacto", default: false] {
        ScrollView {
          VStack {
            HStack {
                CustomButtonOption(isPressed: $isPressed, content: "Producto")
                CustomButtonOption(isPressed: $isPressed, content: "Contacto")
                CustomButtonOption(isPressed: $isPressed, content: "Reviews")
            }
          }
          .padding(.top, 10)
//            ReviewsView(userRating: 3, reviewViewModel: ReviewViewModel())
        }
        .navigationTitle("Reviews!")
          .navigationBarTitleDisplayMode(.inline)
      } else {
        ContactCompanyView(idCompany: idCompany).onAppear { dispScrollView = false }
      }
        
    }
  }
}

//struct ScrollViewRating_Previews: PreviewProvider {
//    static var previews: some View {
//        ScrollViewRating(idCompany: UUID(), dispScrollView: .constant(true), isPressed: .constant(["Producto": false, "Contacto": false]))
//    }
//}
