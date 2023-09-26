//
//  SurveyModel.swift
//  GreenCircle
//
//  Created by Dan FuPo on 14/09/23.
//

import Foundation

struct SurveyModel: Codable, Identifiable {
  let surveyId: String
  let title: String
  let description: String
  var questions: [SurveyQuestion]
  
  var id: String {
    return surveyId
  }
}

struct SurveyQuestion: Codable, Identifiable, Hashable {
  var questionId: String
  let questionOptions: [QuestionOption]
  let questionText: String
  let questionType: QuestionType
  let isRequired: Bool
  
  var id: String {
    return questionId
  }
  
  enum QuestionType: String, Codable, Hashable {
    case open = "open"
    case scale = "scale"
    case multiple_choice = "multiple_choice"
  }
}

struct QuestionOption: Codable, Identifiable, Hashable {
  let questionOptionId: String
  let textOption: String
  
  var id: String {
    return questionOptionId
  }
}

struct Answer: Codable, Hashable {
  var scaleValue: Int?
  var answerText: String?
  var questionId: String
} 
