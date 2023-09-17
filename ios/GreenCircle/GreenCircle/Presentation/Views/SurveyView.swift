//
//  SurveyView.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct SurveyView: View {
  @State private var responses: [SurveyQuestion] = []
  @State private var survey: SurveyModel // Declarar survey como una propiedad de estado
  @State private var isSendButtonPressed = false // Agregar una propiedad para rastrear si se presionó el botón "Enviar"
  @State private var showAlert = false
  
  init(survey: SurveyModel) {
    self._survey = State(initialValue: survey) // Inicializar survey como una propiedad de estado
  }
  
  var body: some View {
    NavigationView {
      ScrollView {
        VStack(alignment: .leading) {
          Text(survey.description)
            .font(.subheadline)
            .padding(.bottom)
          
          ForEach($survey.questions) { $question in // Usar $survey para enlazar a la propiedad de estado
            switch question.questionType {
            case .open:
              OpenQuestion(question: $question)
            case .scale:
              ScaleQuestion(question: $question)
            case .multipleChoice:
              MultipleChoice(question: $question)
            }
          }
          
          HStack {
            Spacer()
            SendButton(action: {
              self.responses = self.survey.questions
              print(self.responses)
              
              })
            Spacer()
          }
          .frame(maxWidth: .infinity)
          .padding()
          
        }
        .padding([.leading, .trailing])
        
      }
      .navigationBarTitle(Text(survey.title))
      
    }
  }
}


struct Previews_SurveyView_Previews: PreviewProvider {
  static var previews: some View {
    SurveyView(survey: sampleSurvey)
  }
}
