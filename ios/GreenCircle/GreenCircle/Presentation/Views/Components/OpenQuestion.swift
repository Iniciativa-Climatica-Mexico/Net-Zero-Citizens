//
//  OpenQuestion.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct OpenQuestion: View {
  @Binding var question: SurveyQuestion
  let characterLimit = 20
  
  init(question: Binding<SurveyQuestion>) {
    self._question = question
  }
  
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
      TextField("Respuesta", text: Binding(
        get: { self.question.answer?.answerText ?? "" },
        set: { self.question.answer?.answerText = String($0.prefix(self.characterLimit))}
      ))
      .lineLimit(5, reservesSpace: true)
      .multilineTextAlignment(.leading)
      .textFieldStyle(.roundedBorder)
    }
  }
}
