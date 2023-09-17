//
//  SampleSurevyData.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import Foundation

let sampleSurvey: SurveyModel = SurveyModel(
  
  surveyId: "surv-012",
  title: "Customer Feedback",
  description: "Please provide feedback on our services.",
  questions: [
    SurveyQuestion(
      questionId: "qst-001",
      questionOptions: [],
      questionText: "What did you like about our service?",
      questionType: .open,
      isRequired: true
    ),
    SurveyQuestion(
      questionId: "qst-002",
      questionOptions: [],
      questionText: "Rate our website usability from 1 to 5 (1 being the worst, 5 being the best).",
      questionType: .scale,
      isRequired: true
    ),
    SurveyQuestion(
      questionId: "qst-003",
      questionOptions: [
        QuestionOption(questionOptionId: "opt-001", textOption: "Fast Delivery"),
        QuestionOption(questionOptionId: "opt-002", textOption: "Easy Returns"),
        QuestionOption(questionOptionId: "opt-003", textOption: "Wide Product Range"),
      ],
      questionText: "Which of the following features do you find most useful?",
      questionType: .multiple_choice,
      isRequired: false
    ),
    SurveyQuestion(
      questionId: "qst-004",
      questionOptions: [],
      questionText: "Any additional comments or suggestions?",
      questionType: .open,
      isRequired: false
    ),
    SurveyQuestion(
      questionId: "qst-005",
      questionOptions: [
        QuestionOption(questionOptionId: "opt-004", textOption: "5"),
        QuestionOption(questionOptionId: "opt-005", textOption: "w Returns"),
        QuestionOption(questionOptionId: "opt-006", textOption: "w w Range"),
      ],
      questionText: "Which of the following features do you find most useful?",
      questionType: .multiple_choice,
      isRequired: false
    ),
    SurveyQuestion(
      questionId: "qst-006",
      questionOptions: [],
      questionText: "What did you like about our service?",
      questionType: .open,
      isRequired: true
    ),
    SurveyQuestion(
      questionId: "qst-007",
      questionOptions: [],
      questionText: "What did you like about our service?",
      questionType: .open,
      isRequired: true
    ),
    SurveyQuestion(
      questionId: "qst-008",
      questionOptions: [],
      questionText: "Rate our website usability from 1 to 5 (1 being the worst, 5 being the best).",
      questionType: .scale,
      isRequired: true
    )
  ]
)
