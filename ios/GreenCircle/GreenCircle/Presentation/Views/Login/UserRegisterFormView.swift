//
//  UserRegisterFormView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 13/09/23.
//

import SwiftUI

struct UserRegisterFormView: View {
    @ObservedObject var viewModel = UserRegisterFormViewModel()
    @EnvironmentObject var userData: UserData
    
    var goMainMenu: () -> Void
    
    @State private var isPopoverPresented = false // Add this line
    
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
                        LinkButton("políticas de privacidad", buttonColor: .blue) {
                            isPopoverPresented.toggle()
                        }
                    }.frame(width: 270)
                    
                    Toggle("", isOn: $viewModel.privacy)
                }
                Spacer()
            }
            .padding(.horizontal)
            Spacer()
            
            MainButton("Continuar", action: {
                Task {
                    let success = await viewModel.handleSubmit(userData: userData)
                    if success {
                        goMainMenu()
                    }
                }
            }).disabled(!viewModel.privacy)
            .alert("Oops! Algo salió mal",
                   isPresented: $viewModel.showAlert) {
                Button("Ok", role: .cancel){}
            }
            Spacer()
        }
        .foregroundColor(Color("MainText"))
        
        // Popover
        .popover(isPresented: $isPopoverPresented, content: {
            VStack {
                Text("Políticas de Privacidad")
                    .font(.title)
                    .padding(.bottom)
                
                Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula sem vitae urna rhoncus, in efficitur nulla mattis. Sed placerat tortor sit amet dui efficitur, sed vulputate odio euismod. Phasellus in orci sit amet ante volutpat semper. Nunc congue felis non vestibulum. Integer nec tellus nec arcu pellentesque fermentum. Vivamus at bibendum leo. Sed vestibulum hendrerit urna, vel suscipit libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin nec lorem at nisi mattis tincidunt. Maecenas sed facilisis ligula, at tincidunt neque.")
                    .padding()
                
                Button("Cerrar", action: {
                    isPopoverPresented.toggle()
                })
                .padding(.top)
            }
            .padding()
        })
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
