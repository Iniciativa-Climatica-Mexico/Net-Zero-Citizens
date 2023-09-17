// 
// SurveyViewModel.swift
//  GreenCircle
//
//  Created by Dan FuPo on 16/09/23.
//

import Foundation

class SurveyViewModel: ObservableObject {
  private let getPendingSurveyUseCase: GetPendingSurveyUseCase
  
  @Published var survey: SurveyModel = SurveyModel(surveyId: "", title: "", description: "", questions: [])
  
  init(getPendingSurveyUseCase: GetPendingSurveyUseCaseProtocol = GetPendingSurveyUseCase.shared) {
    self.getPendingSurveyUseCase = getPendingSurveyUseCase as! GetPendingSurveyUseCase
  }
  
  @MainActor
  func getPendingSurvey() async {
    guard let survey = await getPendingSurveyUseCase.getPendingSurvey() else { return }
    self.survey = survey
  }
  
}
