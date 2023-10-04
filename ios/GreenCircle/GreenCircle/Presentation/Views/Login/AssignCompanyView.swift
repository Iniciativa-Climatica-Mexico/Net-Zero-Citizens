//
//  AssignCompanyView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 02/10/23.
//

import SwiftUI

struct AssignCompanyView: View {
  var goForm: () -> Void
  var goMainMenu: () -> Void
  
  @ObservedObject var viewModel =
  AssignCompanyViewModel()
  
  var body: some View {
    VStack {
      HeaderView(title: "Ingresa el código de registro de tu compañía")
        .padding(.bottom)
      
      VStack {
        InputFormView(bindingValue: $viewModel.companyId,
                      label: "Token de registro",
                      prompt:
                        "6CCC2720-2F96-48DB-AB55-14ABB4E2E9AD")
        .padding()
        MainButton("Continuar", width: 320) {
          Task {
            let res = await
              viewModel.handleSubmit()
            
            if res {
              goMainMenu()
            }
          }
        }
      }
      Spacer()
      VStack {
        Text("¿No cuentas con token de registro?")
          .foregroundColor(Color("MainText"))
          .padding(.bottom, 6)
        LinkButton("Ingreso manual", buttonColor: .blue){
          goForm()
        }
      }
    }
    .padding(.horizontal, 20)
    .alert("Algo salió mal",
            isPresented: $viewModel.showAlert) {
      Button("Entendido", role: .cancel) {}
    } message: {
      Text(viewModel.errorMessage)
    }
  }
}

//#Preview {
//  AssignCompanyView(goForm: {}, goMainMenu: {})
//}
