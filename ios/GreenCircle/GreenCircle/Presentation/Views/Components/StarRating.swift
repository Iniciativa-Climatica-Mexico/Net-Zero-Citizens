//
//  StarRatingView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 10/10/23.
//

import SwiftUI

struct StarRating: View {
  var value: Float
  var maxValue = 5
  var wholeStars: Int
  var halfStar = false
  var emptyStars: Int
  
  init(_ value: Float) {
    self.value = value
    self.wholeStars = Int(floor(value))
    
    if value - Float(wholeStars) >= 0.5 {
      self.halfStar = true
    }
    
    if self.halfStar {
      emptyStars = maxValue - wholeStars - 1
    } else {
      emptyStars = maxValue - wholeStars
    }
  }
  
  var body: some View {
    HStack(alignment: .center, spacing: 2) {
      ForEach(0..<wholeStars,
              id: \.self) { star in
        Image(systemName: "star.fill")
          .resizable()
          .scaledToFit()
      }
      
      if halfStar {
        Image(systemName: "star.leadinghalf.fill")
          .resizable()
          .scaledToFit()
      }
      
      ForEach(0..<emptyStars,
              id: \.self) { star in
        Image(systemName: "star")
          .resizable()
          .scaledToFit()
      }
    }
    .foregroundStyle(.yellow)
  }
}

#Preview {
  StarRating(5)
}
