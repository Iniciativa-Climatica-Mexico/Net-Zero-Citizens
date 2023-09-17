//
//  SurveyView.swift
//  GreenCircle
//
//  Created by Dan FuPo on 16/09/23.
//

import SwiftUI

struct Survey: View {
    @StateObject private var viewModel = SurveyViewModel()

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(alignment: .leading) {
                    Text(viewModel.survey.description)
                        .font(.subheadline)
                        .padding(.bottom)

                    ForEach(viewModel.questions) { question in
                        switch question.questionType {
                        case .open:
                            OpenQuestion(question: question)
                        case .scale:
                            ScaleQuestion(question: question)
                        case .multipleChoice:
                            MultipleChoice(question: question)
                        }
                    }

                    HStack {
                        Spacer()
                        SendButton(action: {
                            viewModel.sendSurvey()
                        })
                        Spacer()
                    }
                    .frame(maxWidth: .infinity)
                    .padding()

                }
                .padding([.leading, .trailing])

            }
            .navigationBarTitle(Text(viewModel.survey.title))
            .alert(isPresented: $viewModel.showAlert) {
                Alert(title: Text("Survey"), message: Text("Survey sent"), dismissButton: .default(Text("OK")))
            }
        }
    }
}

struct Survey_Previews: PreviewProvider {
    static var previews: some View {
        Survey()
    }
}