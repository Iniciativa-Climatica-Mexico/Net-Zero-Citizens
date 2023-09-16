//
//  SampleSurevyData.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import Foundation

let sampleSurvey: SurveyModel = SurveyModel(
  title: "Customer Feedback",
  description: "Please provide feedback on our services.",
  questions: [
    SurveyQuestion(questionType: .open, questionText: "What did you like about our service?", options: nil),
    SurveyQuestion(questionType: .scale, questionText: "Rate our website usability from 1 to 5 (1 being the worst, 5 being the best).", options: nil),
    SurveyQuestion(
      questionType: .multipleChoice,
      questionText: "Which of the following features do you find most useful?",
      options: ["Fast Delivery", "Easy Returns", "Wide Product Range"]
    ),
    SurveyQuestion(questionType: .open, questionText: "Any additional comments or suggestions?", options: nil),
    SurveyQuestion(
      questionType: .multipleChoice,
      questionText: "Which of the following features do you find most useful?",
      options: ["5", "w Returns", "w w Range"]
    ),
    SurveyQuestion(questionType: .open, questionText: "What did you like about our service?", options: nil),
    SurveyQuestion(questionType: .open, questionText: "What did you like about our service?", options: nil),
    SurveyQuestion(questionType: .scale, questionText: "Rate our website usability from 1 to 5 (1 being the worst, 5 being the best).", options: nil)
  ]
)

