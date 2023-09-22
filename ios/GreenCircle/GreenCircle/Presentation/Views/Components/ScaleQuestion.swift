//
//  ScaleQuestion.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct ScaleQuestion: View {
  @Binding var question: SurveyQuestion
  @State private var isSelected: Int = -1
  
  var body: some View {
    VStack(alignment: .leading) {
      VStack(alignment: .leading) {
        if question.isRequired == false {
          Text(question.questionText)
            .font(.headline)
        } else {
          Text(question.questionText)
            .font(.headline)
            .padding(.bottom, 1)
          Text("* Required")
            .font(.system(size: 15))
            .font(.title)
            .foregroundColor(Color(red: 0.33, green: 0.49, blue: 0.55))
            .padding(.bottom, 10)
        }
      }
      HStack {
        Spacer()
        ForEach(1..<6, id: \.self) { rating in
          Button(action: {
            self.isSelected = rating
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
