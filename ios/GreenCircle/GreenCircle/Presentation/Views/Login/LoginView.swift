//
//  LoginView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import GoogleSignInSwift
import SwiftUI

struct LoginView: View {
  var goUserRegister: () -> Void
  var goForm: () -> Void
  var goMainMenu: () -> Void
  var goCompanyRegister: () -> Void
  
  @StateObject var viewModel = LoginViewModel()
  
  var body: some View {
    
    VStack {
      HeaderView(
        title: "Inicia sesión con tu cuenta",
        subTitle: "Nos da gusto verte")
      .padding(.bottom)
      Spacer()
      
      VStack {
        
        VStack(spacing: 20) {
          InputFormView(bindingValue: $viewModel.user,
                        label: "Usuario",
                        prompt: "Usuario")
          .keyboardType(.emailAddress)
          .autocorrectionDisabled()
          .textInputAutocapitalization(.never)
          SecureInputFormView(bindingValue: $viewModel.password,
                              label: "Contraseña",
                              prompt: "Contraseña")
          .padding(.bottom)
          MainButton("Iniciar Sesión", width: 400) {
            Task {
              let res = await viewModel.handleSignIn()
              
              switch res {
              case .success:
                goMainMenu()
              default:
                break
              }
            }
          }
        }.padding(.bottom)
        
        ButtonDividerView(text: "O continúa con")
        
        GoogleSignInButton(style: .wide) {
          Task {
            let state = await viewModel
              .handleGoogleSignIn()
            switch state {
            case .fail:
              break
            case .newUser:
              goForm()
            case .success:
              goMainMenu()
            }
          }
        }
        .alert("Algo salió mal",
               isPresented: $viewModel.showAlert) {
          Button("Entendido", role: .cancel) {}
        } message: {
          Text(viewModel.alertMessage)
        }
      }
      .padding(.horizontal)
      
      Divider().padding()
      
      HStack {
        Text("¿No tienes una cuenta?")
        Spacer()
        LinkButton("Regístrate", buttonColor: .blue){
          goUserRegister()
        }
      }
      .padding()
      
      LinkButton("Soy Proveedor", buttonColor: .blue, action: goCompanyRegister)
        .padding(.bottom, 8)
    }
    .foregroundColor(Color("MainText"))
    .onTapGesture {
      hideKeyboard()
    }
  }
}

#Preview {
  LoginView(goUserRegister: {}, goForm: {}, goMainMenu: {}, goCompanyRegister: {})
}
