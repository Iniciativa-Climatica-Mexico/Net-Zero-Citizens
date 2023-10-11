//
//  RatingCompanyView.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 13/09/23.
//  Modified by Diego Vega on 28/09/23.
//

import SwiftUI

struct ScrollViewRating: View {
    var body: some View {
        NavigationStack {
            ScrollView{
                VStack {
                    HStack{
                        ReviewsView()
                        ReviewCardProvider(reviewViewModel: ReviewViewModel(), profilePicture: Image(systemName: "person.circle.fill"))
                    }
                }
                .navigationTitle("Reviews!")
                .navigationBarTitleDisplayMode(.inline)
            }
        }
    }
}

