//
//  ScaleQuestion.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct ScaleQuestion: View {
  var question: SurveyQuestion
  @State private var isSelected: Int = -1
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(question.questionText)
        .font(.headline)
      HStack {
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
      }
    }
  }
}

struct ScaleQuestion_Previews: PreviewProvider {
  static var previews: some View {
    ScaleQuestion(question: SurveyQuestion (
      questionId: "qst-002",
      questionOptions: [],
      questionText: "Rate our website usability from 1 to 5 (1 being the worst, 5 being the best).",
      questionType: .scale,
      isRequired: true
    ))
  }
}

