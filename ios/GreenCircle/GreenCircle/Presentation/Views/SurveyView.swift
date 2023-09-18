//
//  SurveyView.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct SurveyView: View {
  @StateObject var vm = SurveyViewModel()
  
  var body: some View {
    NavigationView {
      ScrollView {
        VStack(alignment: .leading) {
          TitleBarView(title: "Example 2",
                       leftIcon: "chevron.left",
                       rightIcon: nil,
                       leftDestination: { SurveyView() },
                       rightDestination: { })
          .navigationBarBackButtonHidden(true)
          .offset(y: -60)
          Text(vm.survey.description)
            .font(.subheadline)
            .padding(.bottom)
          
          ForEach(vm.survey.questions, id: \.self) { question in
            switch question.questionType {
            case .open:
              OpenQuestion(question: question)
                .padding(.bottom, 15)
            case .scale:
              ScaleQuestion(question: question)
                .padding(.bottom, 15)
            case .multiple_choice:
              MultipleChoice(question: question)
                .padding(.bottom, 15)
            }
          }
        }
        .padding([.leading, .trailing], 22)
      }
      .navigationBarTitle(Text(vm.survey.title))
    }
    .onAppear {
      Task {
        await vm.getPendingSurvey()
      }
    }
  }
}

struct Previews_SurveyView_Previews: PreviewProvider {
  static var previews: some View {
    SurveyView()
  }
}
