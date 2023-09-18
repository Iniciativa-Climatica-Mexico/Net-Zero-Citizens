//
//  MultipleChoice.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct MultipleChoice: View {
  var question: SurveyQuestion
  @State private var isSelected: Int = -1
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(question.questionText)
        .font(.headline)
      
      ForEach(0..<question.questionOptions.count, id: \.self) { answer in
        Button(action: {
          self.isSelected = answer
        }) {
          Text(question.questionOptions[answer].textOption)
            .frame(maxWidth: .infinity)
            .foregroundColor(isSelected == answer ? Color(red: 0.33, green: 0.49, blue: 0.55) : Color(red: 0.54, green: 0.54, blue: 0.54))
        }
        .padding()
        .clipShape(RoundedRectangle(cornerRadius: 9))
        .overlay(
          RoundedRectangle(cornerRadius: 9)
            .stroke(lineWidth: isSelected == answer ? 2 : 1)
            .foregroundColor(isSelected == answer ? Color(red: 0.33, green: 0.49, blue: 0.55) : Color(red: 0.54, green: 0.54, blue: 0.54))
        )
        .padding(.bottom, 4)
      }
    }
  }
}


struct MultipleChoice_Previews: PreviewProvider {
  static var previews: some View {
    MultipleChoice(question: SurveyQuestion (
      questionId: "qst-003",
      questionOptions: [
        QuestionOption(questionOptionId: "opt-001", textOption: "Fast Delivery"),
        QuestionOption(questionOptionId: "opt-002", textOption: "Easy Returns"),
        QuestionOption(questionOptionId: "opt-003", textOption: "Wide Product Range"),
      ],
      questionText: "Which of the following features do you find most useful?",
      questionType: .multiple_choice,
      isRequired: false
    ))
  }
}

