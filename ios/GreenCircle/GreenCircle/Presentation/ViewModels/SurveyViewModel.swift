// 
// SurveyViewModel.swift
//  GreenCircle
//
//  Created by Dan FuPo on 16/09/23.
//

import Foundation

class SurveyViewModel: ObservableObject {
    private let SurveyRequirement: SurveyRequirementProtocol

    @Published var survey: SurveyModel

    init(SurveyRequirement: SurveyRequirementProtocol = SurveyRequirement.shared) {
        self.SurveyRequirement = SurveyRequirement
        self.survey = SurveyModel(surveyId: "", title: "", description: "", questions: [])
    }

    @MainActor
    func getSurvey() async {
        self.survey = await SurveyRequirement.getSurvey()
    }
}