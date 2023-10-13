//
//  SurveyView.swift
//  GreenCircle
//
//  Created by Dan FuPo on 13/09/23.
//

import SwiftUI

struct SurveyView: View {
  @StateObject var vm = SurveyViewModel()
  @State private var showAlert = false
  @State private var submissionResult: Bool = false
  @State private var requiredQuestion: Bool = false
  
  var goBack: () -> Void
  
  var body: some View {
    NavigationView {
      ScrollView {
        VStack(alignment: .leading) {
          Text(vm.survey.title)
            .font(.title).bold()
            .padding(.top)
          Text("Queremos conocer más de ti en esta breve encuesta")
            .padding(.top, 4)
            .padding(.bottom)
          
          ForEach(Array(vm.survey.questions.enumerated()), id: \.offset) { index, question in
            VStack(alignment: .leading) {
              if question.isRequired == false {
                Text(question.questionText)
                  .font(.headline)
              } else {
                Text(question.questionText)
                  .font(.headline)
                  .padding(.bottom, 1)
                Text("* Obligatoria")
                  .font(.system(size: 15))
                  .font(.title)
                  .foregroundColor(Color("Secondary"))
                  .padding(.bottom, 10)
              }
            }
            QuestionView(question: question, answer: $vm.answers[index])
          }
          
        }
        .padding([.leading, .trailing], 22)
        
        
        MainButton("Enviar") {
          Task {
            await vm.handleSubmit()
          }
        }
        .alert("Mensaje",
               isPresented: $vm.showAlert) {
          Button("Ok", role: .cancel){
            if vm.success {
              goBack()
            }
          }
        } message: {
          Text(vm.errMessage)
        }
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
    .onTapGesture {
      hideKeyboard()
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


