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
      Text(question.questionText)
        .font(.headline)
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
