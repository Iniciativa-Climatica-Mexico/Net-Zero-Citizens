//
//  UserRegisterFormView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/09/23.
//

import SwiftUI

struct UserRegisterFormView: View {
  @ObservedObject var viewModel =
  UserRegisterFormViewModel()
  @EnvironmentObject var userData: UserData
  
  var goSurvey: () -> Void
  
  var body: some View {
    VStack(spacing: 10) {
      RegisterHeaderView(
        mail: userData.user!.email,
        name: "\(userData.user!.first_name) \(userData.user!.last_name)")
      Spacer()
      VStack(alignment: .leading, spacing: 10) {
        Text("Completa tu registro por favor")
          .font(.system(size: 24))
        InputFormView(bindingValue: $viewModel.phone,
                      label: "Teléfono",
                      prompt: "123-456-7890")
        .keyboardType(.phonePad)
        InputFormView(bindingValue: $viewModel.age,
                      label: "Edad",
                      prompt: "Ingresa tu edad...")
        .keyboardType(.numberPad)
        PickerFormView(selectedOption: $viewModel.state,
                       label: "Estado",
                       options: Constants.states)
        PickerFormView(selectedOption: $viewModel.gender,
                       label: "Género",
                       options: viewModel.genders)
        HStack {
          HStack {
            Text("Acepto las")
            LinkButton("políticas de privacidad", buttonColor: .blue){}
          }.frame(width: 270)
          
          Toggle("", isOn: $viewModel.privacy)
        }
        Spacer()
      }.padding(.horizontal)
      Spacer()
      MainButton("Continuar", action: {
        Task {
          let success = await viewModel
            .handleSubmit(userData: userData)
          if(success) {
            goSurvey()
          }
        }
      }).alert("Oops! Algo salió mal",
               isPresented: $viewModel.showAlert) {
        Button("Ok", role: .cancel){}
      }
      Spacer()
      
    }
    .foregroundColor(Color("MainText"))
  }
}

struct UserRegisterFormView_Previews: PreviewProvider {
  
  static var previews: some View {
    UserRegisterFormView(goSurvey: {})
      .environmentObject(UserData(
        User(first_name: "Ricardo",
             last_name: "Fernandez",
             uuid: "1",
             email: "ricardo@mail.com",
             login_type: "google",
             picture: "picture",
             roles: "new_user")))
  }
}
