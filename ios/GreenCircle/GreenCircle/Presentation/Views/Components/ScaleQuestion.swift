//
//  ScaleQuestion.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct ScaleQuestion: View {
  @Binding var question: SurveyQuestion
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(question.questionText)
        .font(.headline)
      Text("Scale Question: Rate from 1 to 5")
        .font(.subheadline)
      ForEach(1..<6, id: \.self) { rating in
        Button(action: {
          question.response = String(rating)
        }) {
          Text("\(rating)")
            .frame(maxWidth: .infinity, alignment: .leading)
            .foregroundColor(question.response == String(rating) ? Color.blue : Color.black)
        }
        .padding()
        .background(question.response == String(rating) ? Color.yellow : Color.clear)
        .clipShape(RoundedRectangle(cornerRadius: 9))
        .overlay(
          RoundedRectangle(cornerRadius: 9)
            .stroke(lineWidth: 1)
        )
        .padding(.bottom, 4)
      }
    }
  }
}

struct ScaleQuestion_Previews: PreviewProvider {
  static var previews: some View {
    ScaleQuestion(question: .constant(SurveyQuestion (
      questionType: .scale,
      questionText: "Rate our website usability from 1 to 5 (1 being the worst, 5 being the best).",
      options: nil,
      response: nil
    )))
  }
}

