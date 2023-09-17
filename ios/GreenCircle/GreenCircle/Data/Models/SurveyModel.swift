//
//  SurveyModel.swift
//  GreenCircle
//
//  Created by Dan FuPo on 14/09/23.
//

import Foundation

struct SurveyModel {
  let surveyId: String
  let title: String
  let description: String
  var questions: [SurveyQuestion]
}

struct SurveyQuestion {
  let questionId: String
  let questionOptions: [QuestionOption]
  let questionText: String
  let questionType: QuestionType
  let isRequired: Bool
  
  enum QuestionType {
    case open
    case scale
    case multiple_choice
  }
}

struct QuestionOption {
  let questionOptionId: String
  let textOption: String
}