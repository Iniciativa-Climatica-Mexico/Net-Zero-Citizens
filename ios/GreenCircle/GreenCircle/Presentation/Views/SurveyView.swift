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
  
  var body: some View {
  NavigationView {
    ScrollView {
      VStack(alignment: .leading) {
        Text(vm.survey.title)
          .font(.title).bold()
          .padding([.top, .bottom])
        
        ForEach(Array(vm.survey.questions.enumerated()), id: \.offset) { index, question in
          QuestionView(question: question, answer: $vm.answers[index])
        }
      }
      .padding([.leading, .trailing], 22)
      Button("Enviar", action: {
        Task {
          let submissionResult = await vm.submitAnswers()
          
          if(submissionResult) {
            showSuccessAlert = true
          }
          else {
            showErrorAlert = true
          }
          vm.answers.forEach { answer in
            if answer.scaleValue != nil {
              print(answer.scaleValue)
            } else {
              print(answer.answerText)
            }
          }
        }
      })
      .foregroundColor(.white)
      .frame(width: 178, height: 40)
      .background(Color(red: 0.33, green: 0.49, blue: 0.55))
      .cornerRadius(9)
      
    }
    .navigationBarTitle("Encuesta")
    .navigationBarTitleDisplayMode(.inline)
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

struct QuestionView: View {
  var question: SurveyQuestion
  @Binding var answer: Answer
  
  var body: some View {
    switch question.questionType {
    case .open:
      OpenQuestion(question: question, answer: $answer)
        .padding(.bottom, 15)
    case .scale:
      ScaleQuestion(question: question, answer: $answer)
        .padding(.bottom, 15)
    case .multiple_choice:
      MultipleChoice(question: question, answer: $answer)
        .padding(.bottom, 15)
    }
  }
}
