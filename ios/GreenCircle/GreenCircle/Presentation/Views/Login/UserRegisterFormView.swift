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
  @State private var showingDetail = false
  
  var goMainMenu: () -> Void
  
  var body: some View {
    VStack(spacing: 10) {
      RegisterHeaderView(
        mail: viewModel.userData.email,
        name: "\(viewModel.userData.first_name) \(viewModel.userData.last_name)")
      Spacer()
      VStack(alignment: .leading, spacing: 10) {
        Text("Completa tu registro por favor")
          .font(.system(size: 24))
        InputFormView(bindingValue:
                        $viewModel.formState.phone,
                      label: "Teléfono",
                      prompt: "123-456-7890")
        .onChange(of: viewModel.formState.phone) { newValue in
          if newValue.hasPrefix("55") {
            viewModel.formState.phone =
            viewModel.format(with: "XX-XXXX-XXXX",
                             for: newValue)
          } else {
            viewModel.formState.phone =
            viewModel.format(with: "XXX-XXX-XXXX",
                             for: newValue)
          }
        }
        .keyboardType(.phonePad)
        InputFormView(bindingValue:
                        $viewModel.formState.age,
                      label: "Edad",
                      prompt: "Ingresa tu edad...")
        .onChange(of: viewModel.formState.age) { newValue in
          viewModel.formState.age =
          viewModel.format(with: "XXX", for: newValue)
        }
        .keyboardType(.numberPad)
        PickerFormView(selectedOption:
                        $viewModel.formState.state,
                       label: "Estado",
                       options: Constants.states)
        PickerFormView(selectedOption:
                        $viewModel.formState.gender,
                       label: "Género",
                       options: viewModel.genders)
        HStack {
          HStack {
            Text("Acepto las")
            Button("políticas de privacidad"){
              showingDetail = true
            }
            .foregroundColor(.blue)
            .sheet(isPresented: $showingDetail) {
              PrivacyUserView()
            }
            
          }.frame(width: 270)
          
          Toggle("", isOn: $viewModel.formState.privacy)
        }
        Spacer()
      }.padding(.horizontal)
      Spacer()
      MainButton("Continuar", action: {
        Task {
          let success = await viewModel
            .handleSubmit()
          if(success) {
            goMainMenu()
          }
        }
      }).alert("Oops! Algo salió mal",
               isPresented: $viewModel.showAlert) {
        Button("Ok", role: .cancel){}
      } message: {
        Text(viewModel.errorMessage)
      }
      Spacer()
      
    }
    .foregroundColor(Color("MainText"))
  }
}

struct UserRegisterFormView_Previews: PreviewProvider {
  
  static var previews: some View {
    UserRegisterFormView(goMainMenu: {})
      .environmentObject(UserData(
        UserAuth(first_name: "Ricardo",
                 last_name: "Fernandez",
                 uuid: "1",
                 email: "ricardo@mail.com",
                 login_type: "google",
                 picture: "picture",
                 roles: "new_user")))
  }
}
