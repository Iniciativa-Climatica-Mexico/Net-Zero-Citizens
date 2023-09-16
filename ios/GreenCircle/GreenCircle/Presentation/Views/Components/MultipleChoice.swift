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
      
      ForEach(0..<question.options!.count, id: \.self) { index in
        Button(action: {
          self.selectedOption = index
        }) {
          HStack {
            Text(question.options![index])
            Spacer()
            if selectedOption == index {
              Image(systemName: "checkmark.circle.fill")
            } else {
              Image(systemName: "circle")
            }
          }
        }
        //.padding(.vertical, 5)
        .foregroundColor(.white)
        .frame(width: 178, height: 40)
        .background(Color(red: 0.33, green: 0.49, blue: 0.55))
        .cornerRadius(9)
        .offset(x: 0, y: 0)
      }
    }
    //.padding()
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
