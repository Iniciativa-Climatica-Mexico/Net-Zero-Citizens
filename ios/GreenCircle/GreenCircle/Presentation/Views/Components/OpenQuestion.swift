//
//  OpenQuestion.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct OpenQuestion: View {
  @State var question: SurveyQuestion
  @Binding var answer: Answer
  let characterLimit = 20

  
  var body: some View {
    VStack(alignment: .leading) {
      
      TextField("Respuesta", text: Binding(get: {answer.answerText ?? ""}, set: {answer.answerText = $0}), axis: .vertical)
      .lineLimit(5, reservesSpace: true)
      .multilineTextAlignment(.leading)
      .textFieldStyle(.roundedBorder)
    }
  }
}
