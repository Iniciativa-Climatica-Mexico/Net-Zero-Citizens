//
//  OpenQuestion.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct OpenQuestion: View {
  @State private var text = ""
  private let characterLimit = 255
  
  let question: SurveyQuestion
  
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
    OpenQuestion(question: SurveyQuestion (
      questionType: .open,
      questionText: "What did you like about our service?",
      options: nil
    ))
  }
}
