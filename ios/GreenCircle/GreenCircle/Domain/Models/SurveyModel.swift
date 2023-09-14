//
//  SurveyModel.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import Foundation

struct SurveyModel {
    let title: String
    let description: String
    let questions: [SurveyQuestion]
}

struct SurveyQuestion : Hashable{
    let questionType: QuestionType
    let questionText: String
    let options: [String]? // Only for multiple-choice questions
    
    enum QuestionType {
        case open
        case scale
        case multipleChoice
    }
}

