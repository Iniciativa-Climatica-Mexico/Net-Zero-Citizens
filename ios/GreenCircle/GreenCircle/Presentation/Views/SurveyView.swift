//
//  SurveyView.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct SurveyView: View {
  @StateObject var vm = SurveyViewModel()
  @State private var showSuccessAlert = false
  @State private var showErrorAlert = false
  
  init() {
    for var question in vm.survey.questions {
      question.answer = Answer(scaleValue: nil, answerText: nil, questionId: question.questionId)
    }
  }
  
  var body: some View {
    NavigationView {
      ScrollView {
        VStack(alignment: .leading) {
          Text(vm.survey.description)
            .font(.subheadline)
            .padding(.bottom)
          
          ForEach($vm.survey.questions, id: \.self) { $question in
            switch question.questionType {
            case .open:
              OpenQuestion(question: $question)
                .padding(.bottom, 15)
            case .scale:
              ScaleQuestion(question: $question)
                .padding(.bottom, 15)
            case .multiple_choice:
              MultipleChoice(question: $question)
                .padding(.bottom, 15)
            }
          }
        }
        .padding([.leading, .trailing], 22)
        Button("Enviar", action: {
          Task {
            let answers = vm.survey.questions.map({ question in
              return question.answer ?? Answer()
            })
            let submissionResult = await vm.submitAnswers(answers: answers)
            
            if(submissionResult) {
              showSuccessAlert = true
            }
            else {
              showErrorAlert = true
            }
          }
          print(vm.survey.questions.map({ (question) -> String? in
            if(question.answer?.answerText != nil){
              return question.answer?.answerText
            }
            else {
              return question.answer?.scaleValue?.description
            }
          }))
        })
        .foregroundColor(.white)
        .frame(width: 178, height: 40)
        .background(Color(red: 0.33, green: 0.49, blue: 0.55))
        .cornerRadius(9)
        
      }
      .navigationBarTitle(Text(vm.survey.title))
    }
    .onAppear {
      Task {
        await vm.getPendingSurvey()
      }
    }
    .alert(isPresented: $showSuccessAlert) {
      Alert(title: Text("Éxito"), message: Text("Tu encuesta fue enviada con éxito"), dismissButton: .default(Text("OK")))
    }
    .alert(isPresented: $showErrorAlert) {
      Alert(title: Text("Error"), message: Text("Error enviando tu encuesta, intenta de nuevo más tarde"), dismissButton: .default(Text("OK")))
    }
  }
}
