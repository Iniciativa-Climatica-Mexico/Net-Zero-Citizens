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
        .padding(.vertical, 5)
      }
    }
    .padding()
  }
}
