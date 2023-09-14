//
//  ScaleQuestion.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct ScaleQuestion: View {
  let question: SurveyQuestion
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(question.questionText)
        .font(.headline)
      
      Text("Scale Question: Rate from 1 to 5")
        .font(.subheadline)
      
      HStack {
        ForEach(1..<6, id: \.self) { rating in
          Text("\(rating)")
            .font(.body)
        }
      }
    }
    .padding()
  }
}

