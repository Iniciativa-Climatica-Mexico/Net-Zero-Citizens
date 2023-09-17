//
//  OpenQuestion.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct OpenQuestion: View {
  @Binding var question: SurveyQuestion
  
  var responseBinding: Binding<String> {
    Binding<String>(
      get: { question.response ?? "" },
      set: { newValue in
        if newValue.count <= 255 {
          question.response = newValue
        }
      }
    )
  }
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(question.questionText)
        .font(.headline)
      TextField("Respuesta", text: responseBinding, axis: .vertical)
        .lineLimit(5, reservesSpace: true)
        .multilineTextAlignment(.leading)
        .textFieldStyle(.roundedBorder)
    }
  }
}

struct OpenQuestion_Previews: PreviewProvider {
  static var previews: some View {
    OpenQuestion(question: .constant(SurveyQuestion (
      questionType: .open,
      questionText: "What did you like about our service?",
      options: nil,
      response: nil
    )))
  }
}

