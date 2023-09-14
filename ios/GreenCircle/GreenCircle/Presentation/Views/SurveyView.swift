//
//  SurveyView.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct SurveyView: View {
  let survey: SurveyModel
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(survey.title)
        .font(.title)
      Text(survey.description)
        .font(.subheadline)
      
      ForEach(survey.questions, id: \.self) { question in
        switch question.questionType {
        case .open:
          OpenQuestion(question: question)
        case .scale:
          ScaleQuestion(question: question)
        case .multipleChoice:
          MultipleChoice(question: question)
        }
      }
    }
  }
}
