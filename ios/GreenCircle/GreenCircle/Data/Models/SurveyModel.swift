//
//  SurveyModel.swift
//  GreenCircle
//
//  Created by Dan FuPo on 14/09/23.
//

import Foundation

struct SurveyModel: Codable {
  let surveyId: String
  let title: String
  let description: String
  var questions: [SurveyQuestion]
}

struct SurveyQuestion: Codable {
  let questionId: String
  let questionOptions: [QuestionOption]
  let questionText: String
  let questionType: QuestionType
  let isRequired: Bool
  
  enum QuestionType: Codable {
    case open
    case scale
    case multiple_choice
  }
}

struct QuestionOption: Codable {
  let questionOptionId: String
  let textOption: String
}
