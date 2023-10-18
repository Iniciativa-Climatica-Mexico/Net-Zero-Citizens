//
//  CompanyRegisterFormView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//  Modified by Daniel Gutiérrez Gómez on 25/09/23

import SwiftUI

struct CompanyRegisterFormView: View {
  var goCompanyRegisterDivider: () -> Void
  var goPending: () -> Void
  
  @ObservedObject var viewModel =
  CompanyRegisterFormViewModel()
  
  var body: some View {
    ScrollView{
      VStack {
        RegisterHeaderView(
          mail: viewModel.userData.email,
          name: "\(viewModel.userData.first_name) \(viewModel.userData.last_name)")
        .padding(.bottom)
        VStack(alignment: .leading, spacing: 10) {
          VStack(alignment: .leading, spacing: 20) {
            Text("Registra los datos de tu empresa")
              .font(.system(size: 24))
            InputFormView(bindingValue:
                            $viewModel.formState.name,
                          label: "Nombre de la empresa*",
                          prompt: "Ingresa el nombre...")
            .autocorrectionDisabled()
            VStack(alignment: .leading) {
              Text("Descripción*")
                .foregroundColor(Color("Secondary"))
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
            .textInputAutocapitalization(.never)
            .autocorrectionDisabled()
            .keyboardType(.emailAddress)
            InputFormView(bindingValue:
                            $viewModel.formState.phone,
                          label: "Teléfono de contacto*",
                          prompt: "123-123-1234")
            .keyboardType(.phonePad)
            .onChange(of: viewModel.formState.phone) { newValue in
              if newValue.hasPrefix("55") {
                viewModel.formState.phone =
                Utils.formatNumber(with: "XX-XXXX-XXXX",
                                   for: newValue)
              } else {
                viewModel.formState.phone =
                Utils.formatNumber(with: "XXX-XXX-XXXX",
                                   for: newValue)
              }
            }
            InputFormView(bindingValue:
                            $viewModel.formState.webPage,
                          label: "Sitio Web",
                          prompt: "empresa.com.mx")
            .keyboardType(.URL)
            .autocorrectionDisabled()
            .textInputAutocapitalization(.never)
          }
          
          VStack(alignment: .leading, spacing: 20) {
            Text("Dirección de la empresa")
              .font(.system(size: 24))
            InputFormView(bindingValue: $viewModel.formState.street,
                          label: "Calle*",
                          prompt: "Calle Asombrosa")
            InputFormView(bindingValue: $viewModel.formState.streetNumber,
                          label: "Número*",
                          prompt: "111")
            .onChange(of: viewModel.formState.streetNumber) { newValue in
              viewModel.formState.streetNumber =
              Utils.formatNumber(with: "XXXXX",
                                 for: newValue)
              
            }
            .keyboardType(.numberPad)
            InputFormView(bindingValue: $viewModel.formState.city,
                          label: "Ciudad*",
                          prompt: "Ciudad")
            PickerFormView(selectedOption: $viewModel.formState.state,
                           label: "Estado*",
                           options: Constants.states)
            InputFormView(bindingValue: $viewModel.formState.zipCode,
                                label: "Código postal*",
                                prompt: "12345")
            .onChange(of: viewModel.formState.zipCode) { newValue in
              viewModel.formState.zipCode =
              Utils.formatNumber(with: "XXXXX",
                                 for: newValue)
              
            }
            .keyboardType(.numberPad)
            
          }
        }
        .padding(.horizontal)
        .alert("Oops! Algo salió mal",
                 isPresented: $viewModel.showAlert) {
          Button("Ok", role: .cancel){}
        } message: {
          Text(viewModel.errorMessage)
        }
      }.padding(.bottom, 50)
      MainButton("Continuar", action: {
        Task {
          let success = await viewModel.handleSubmit()
          
          if success {
            goCompanyRegisterDivider()
          }
        }
      }).padding(.horizontal)
    }.foregroundColor(Color("MainText"))
  }
}

struct CompanyRegisterFormView_Previews: PreviewProvider {
  static var previews: some View {
    CompanyRegisterFormView(goCompanyRegisterDivider: {}, goPending: {})
  }
}
