//
//  RatingCompanyView.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 13/09/23.
//  Modified by Diego Vega on 28/09/23.
//

import SwiftUI

struct ScrollViewRating: View {
  
  /// Estas dos funciones permiten hacer el flujo de las vistas
  /// desde el contacto de compañía hasta vista de opiniones
  var goOpinions: () -> Void
  
  /// Esta función, toma el papel de regresar en una vista, o de regresar al ScrollViewRating
  var goScrollRating: () -> Void
  
  var body: some View {
    NavigationStack {
      ScrollView {
        VStack {
          ReviewsView(goOpinions: goOpinions, goScrollRating: goScrollRating)
          ReviewCardProvider(reviewViewModel: ReviewViewModel(), profilePicture: Image(systemName: "person.circle.fill"))
        }
        .padding(.top, 10)
      }.navigationTitle("Reviews")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
          ToolbarItem(placement: .topBarLeading) {
            Button {
              goScrollRating()
            } label: {
              Image(systemName: "chevron.left")
                .foregroundColor(.white)
            }
          }
        }
    }
  }
}

