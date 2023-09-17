//
//  OpenQuestion.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct OpenQuestion: View {
  @Binding var question: SurveyQuestion
  @State var text = ""
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(question.questionText)
        .font(.headline)
      TextField("Respuesta", text: $text, axis: .vertical)
        .lineLimit(5, reservesSpace: true)
        .multilineTextAlignment(.leading)
        .textFieldStyle(.roundedBorder)
    }
  }
}

struct OpenQuestion_Previews: PreviewProvider {
  static var previews: some View {
    OpenQuestion(question: .constant(SurveyQuestion (
      questionId: "qst-002",
      questionOptions: [],
      questionText: "What did you like about our service?",
      questionType: .open,
      isRequired: true
    )))
  }
}

