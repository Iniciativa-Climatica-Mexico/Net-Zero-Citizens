//
//  MultipleChoice.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct MultipleChoice: View {
  let question: SurveyQuestion
  
  @State private var selectedOption: Int = -1
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(question.questionText)
        .font(.headline)
      
      ForEach(0..<question.options!.count, id: \.self) { answer in
        Button(action: {
          self.selectedOption = answer
        }) {
          Text(question.options![answer])
            .frame(maxWidth: .infinity)
            .foregroundColor(selectedOption == answer ? Color(red: 0.33, green: 0.49, blue: 0.55) : Color(red: 0.54, green: 0.54, blue: 0.54))
        }
        .padding()
        .clipShape(RoundedRectangle(cornerRadius: 9))
        .overlay(
          RoundedRectangle(cornerRadius: 9)
            .stroke(lineWidth: 1)
            .foregroundColor(selectedOption == answer ? Color(red: 0.33, green: 0.49, blue: 0.55) : Color(red: 0.54, green: 0.54, blue: 0.54))
        )
        .padding(.bottom, 4)
      }
    }
  }
}

struct MultipleChoice_Previews: PreviewProvider {
  static var previews: some View {
    MultipleChoice(question: SurveyQuestion(
      questionType: .multipleChoice,
      questionText: "Which of the following features do you find most useful?",
      options: ["Fast Delivery", "Easy Returns", "Wide Product Range"]
    ))
  }
}
