//
//  CompanyRegisterFormView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import SwiftUI

struct CompanyRegisterFormView: View {
  var goPending: () -> Void
  
  @ObservedObject var viewModel =
  CompanyRegisterFormViewModel()
  @EnvironmentObject var userData: UserData
  
  var body: some View {
    ScrollView{
      VStack {
        RegisterHeaderView(
          mail: userData.user!.email,
          name: "\(userData.user!.first_name) \(userData.user!.last_name)")
        .padding(.bottom)
        VStack(alignment: .leading, spacing: 10) {
          VStack(alignment: .leading, spacing: 20) {
            Text("Registra los datos de tu empresa")
              .font(.system(size: 24))
            InputFormView(bindingValue:
                            $viewModel.formState.name,
                          label: "Nombre de la empresa*",
                          prompt: "Ingresa el nombre...")
            VStack(alignment: .leading) {
              Text("Descripción*")
                .foregroundColor(Color("SecondaryText"))
              TextField("Ingresa tu descripción",
                        text: $viewModel.formState.description,
                        axis: .vertical)
              .lineLimit(5, reservesSpace: true)
              .padding(10)
              .overlay {
                RoundedRectangle(cornerRadius: 10)
                  .stroke(.gray, lineWidth: 1)
              }
              
            }.font(.system(size: 20, weight: .medium))
          }
          VStack(alignment: .leading, spacing: 20) {
            Text("Datos de contacto")
              .font(.system(size: 24))
            InputFormView(bindingValue:
                            $viewModel.formState.email,
                          label: "Email de contacto*",
                          prompt: "empresa@ejemplo.com")
            .keyboardType(.emailAddress)
            InputFormView(bindingValue:
                          $viewModel.formState.phone,
                          label: "Teléfono de contacto*",
                          prompt: "123-123-1234")
            .keyboardType(.phonePad)
            InputFormView(bindingValue:
                            $viewModel.formState.webPage,
                          label: "Sitio Web",
                          prompt: "empresa.com.mx")
            .keyboardType(.URL)
            
          }
          VStack(alignment: .leading, spacing: 20) {
            Text("Dirección de la empresa")
              .font(.system(size: 24))
            InputFormView(bindingValue: $viewModel.formState.street,
                          label: "Calle*",
                          prompt: "Calle Asombrosa")
            NumberInputFormView(bindingValue: $viewModel.formState.streetNumber,
                          label: "Número*",
                          prompt: "111")
            .keyboardType(.numberPad)
            InputFormView(bindingValue: $viewModel.formState.city,
                          label: "Ciudad*",
                          prompt: "Ciudad Gótica")
            PickerFormView(selectedOption: $viewModel.formState.state,
                           label: "Estado*",
                           options: Constants.states)
            NumberInputFormView(bindingValue: $viewModel.formState.zipCode,
                          label: "Código postal*",
                          prompt: "12345")
            .keyboardType(.numberPad)
            
          }
        }.padding(.horizontal)
      }.padding(.bottom, 50)
      MainButton("Continuar", action: {
        Task {
          await viewModel.handleSubmit(userData: userData)
          goPending()
        }
      })
    }.foregroundColor(Color("MainText"))
  }
}

struct CompanyRegisterFormView_Previews: PreviewProvider {
  static var previews: some View {
    CompanyRegisterFormView(goPending: {})
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
