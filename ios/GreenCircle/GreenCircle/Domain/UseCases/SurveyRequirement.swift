// 
// SurveyRequirement.swift
//  GreenCircle
//
// Created by Dan FuPo on 16/09/23.
//

import Foundation

protocol SurveyRequirementProtocol {
    func getSurvey() async -> SurveyModel?
}

class SurveyRequirement: SurveyRequirementProtocol {
  func getSurvey() async -> SurveyModel? {
    <#code#>
  }
  
  let surveyRepository = SurveyRepository().self

    static let shared = SurveyRequirement()
    init(surveyRepository: SurveyRepository = SurveyRepository.shared) {
        self.surveyRepository = surveyRepository
    }

    func getSurvey() async -> SurveyModel {
      return await surveyRepository.getSurvey() ?? <#default value#>!
    }
}
