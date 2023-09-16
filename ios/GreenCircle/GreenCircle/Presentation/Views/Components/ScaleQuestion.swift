//
//  ScaleQuestion.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct ScaleQuestion: View {
  let question: SurveyQuestion
  
  @State private var selectedOption: Int = -1
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(question.questionText)
        .font(.headline)
      Text("Scale Question: Rate from 1 to 5")
        .font(.subheadline)
      ForEach(1..<6, id: \.self) { rating in
        Button(action: {
          self.selectedOption = rating
        }) {
          Text("\(rating)")
            .frame(maxWidth: .infinity)
            .foregroundColor(selectedOption == rating ? Color(red: 0.33, green: 0.49, blue: 0.55) : Color(red: 0.54, green: 0.54, blue: 0.54))
        }
        .padding()
        .clipShape(RoundedRectangle(cornerRadius: 9))
        .overlay(
          RoundedRectangle(cornerRadius: 9)
            .stroke(lineWidth: 1)
            .foregroundColor(selectedOption == rating ? Color(red: 0.33, green: 0.49, blue: 0.55) : Color(red: 0.54, green: 0.54, blue: 0.54))
        )
        .padding(.bottom, 4)
      }
    }
  }
}

struct ScaleQuestion_Previews: PreviewProvider {
  static var previews: some View {
    ScaleQuestion(question: SurveyQuestion(
      questionType: .scale,
      questionText: "Rate our website usability from 1 to 5 (1 being the worst, 5 being the best).",
      options: nil
    ))
  }
}
