//
//  ScaleQuestion.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct ScaleQuestion: View {
  var question: SurveyQuestion
  @Binding var answer: Answer 
  @State private var isSelected: Int = -1
  
  var body: some View {
    VStack(alignment: .leading) {
      
      HStack {
        Spacer()
        ForEach(1..<6, id: \.self) { rating in
          Button(action: {
            self.isSelected = rating
            answer.scaleValue = rating
          }) {
            Text("\(rating)")
              .frame(width: 30, height: 30)
              .foregroundColor(isSelected == rating ? Color(red: 0.33, green: 0.49, blue: 0.55) : Color(red: 0.54, green: 0.54, blue: 0.54))
          }
          .padding()
          .clipShape(RoundedRectangle(cornerRadius: 9))
          .overlay(
            RoundedRectangle(cornerRadius: 9)
              .stroke(lineWidth: isSelected == rating ? 2 : 1)
              .foregroundColor(isSelected == rating ? Color(red: 0.33, green: 0.49, blue: 0.55) : Color(red: 0.54, green: 0.54, blue: 0.54))
          )
          .padding(.bottom, 4)
        }
        Spacer()
      }
    }
  }
}
