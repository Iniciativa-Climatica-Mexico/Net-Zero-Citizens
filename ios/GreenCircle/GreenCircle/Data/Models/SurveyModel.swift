//
//  SurveyModel.swift
//  GreenCircle
//
//  Created by Dan FuPo on 14/09/23.
//

import Foundation

struct SurveyModel: Decodable, Identifiable {
  let surveyId: String
  let title: String
  let description: String
  var questions: [SurveyQuestion]
  
  var id: String {
    return surveyId
  }
}

struct SurveyQuestion: Decodable, Identifiable, Hashable {
  var questionId: String
  let questionOptions: [QuestionOption]
  let questionText: String
  let questionType: QuestionType
  let isRequired: Bool
  var answer: Answer?
  
  var id: String {
    return questionId
  }
  
  enum QuestionType: String, Decodable, Hashable {
    case open = "open"
    case scale = "scale"
    case multiple_choice = "multiple_choice"
  }
}

struct QuestionOption: Decodable, Identifiable, Hashable {
  let questionOptionId: String
  let textOption: String
  
  var id: String {
    return questionOptionId
  }
}

struct Answer: Codable, Hashable {
  var scaleValue: Int {-1}
  var answerText: String {""}
  var questionId: String
}
