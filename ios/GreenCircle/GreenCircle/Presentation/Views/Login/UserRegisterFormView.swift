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
  
  var goMainMenu: () -> Void
  
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
                       options: viewModel.states)
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
            .putUserInformation(userData: userData)
          if(success) {
            goMainMenu()
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
    UserRegisterFormView(goMainMenu: {})
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

struct RegisterHeaderView: View {
  var mail: String
  var name: String
  
  var body: some View {
    VStack(alignment: .leading, spacing: 10) {
      Image(systemName: "leaf")
        .font(.largeTitle)
        .foregroundColor(.green)
      Text("Bienvenido, \(name)")
        .font(.system(size: 40, weight: .bold))
      VStack(alignment: .leading) {
        Text("Te registraste con el correo")
        Text(mail).bold()
      }
      .foregroundColor(Color("SecondaryText"))
      .font(.system(size: 20))
    }
    .padding(.horizontal)
    .frame(maxWidth: .infinity,
           alignment: .leading)
  }
}

struct InputFormView: View {
  var bindingValue: Binding<String>
  var label: String
  var prompt: String
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(label)
        .foregroundColor(Color("SecondaryText"))
      TextField(prompt, text: bindingValue)
        .padding(10)
        .overlay {
          RoundedRectangle(cornerRadius: 10)
            .stroke(.gray, lineWidth: 1)
        }
      
    }.font(.system(size: 20, weight: .medium))
  }
  
}

struct PickerFormView: View {
  @Binding var selectedOption: String
  var label: String
  var options: [String]
  
  var body: some View {
    VStack(alignment: .leading) {
      Text(label)
        .foregroundColor(Color("SecondaryText"))
      HStack {
        Menu {
          Picker(selection: $selectedOption) {
            ForEach(options, id: \.self) { option in
              Text(option).tag(option)
            }
          } label: {}
        } label: {
          if selectedOption.isEmpty {
            Text("Selecciona una opción...")
              .opacity(0.3)
          } else {
            Text(selectedOption)
          }
          Spacer()
          Image(systemName: "chevron.down")
        }
        .padding(10)
        Spacer()
      }.overlay {
        RoundedRectangle(cornerRadius: 10)
          .stroke(.gray, lineWidth: 1)
      }
    }
    .font(.system(size: 20, weight: .medium))
  }
}
