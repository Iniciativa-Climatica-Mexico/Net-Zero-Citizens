//
//  RegisterView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import SwiftUI
import GoogleSignInSwift

struct UserRegisterView: View {
  @ObservedObject var viewModel = UserRegisterViewModel()
  var goLogin: () -> Void
  var goForm: () -> Void
  var goMainMenu: () -> Void
  @State var loadingGoogle = false
  var body: some View {
    ScrollView {
      VStack(spacing: 40) {
        HeaderView(
          title: "Crear cuenta",
          subTitle: "Regístrate con tu cuenta preferida")
        
        VStack(spacing: 10) {
          InputFormView(bindingValue: $viewModel.formState.name,
                        label: "Nombre",
                        prompt: "Juan")
          InputFormView(bindingValue: $viewModel.formState.lastName,
                        label: "Apellidos",
                        prompt: "Pérez")
          InputFormView(bindingValue: $viewModel.formState.email,
                        label: "Correo electrónico",
                        prompt: "juan@ejemplo.com")
          .keyboardType(.emailAddress)
          .autocorrectionDisabled()
          .textInputAutocapitalization(.never)
          SecureInputFormView(bindingValue: $viewModel.formState.password,
                        label: "Contraseña",
                        prompt: "Contraseña")
          SecureInputFormView(bindingValue: $viewModel.formState.confirmPassword,
                        label: "Confimar contraseña", prompt: "Contraseña")
          .padding(.bottom)
          MainButton("Crear Cuenta") {
            Task {
              let res = await viewModel.registerUser()
              if res == .newUser {
                goForm()
              }
            }
          }
        }
        .padding(.horizontal)
        
        ButtonDividerView(text: "Registrate con")
        
        VStack {
          GoogleSignInButton(style: .wide) {
              loadingGoogle = true
            Task {
              let state = await viewModel
                .handleGoogleSignIn()
              switch state {
              case .newUser:
                goForm()
              case .success:
                goMainMenu()
              case .fail:
                  loadingGoogle = false
                break
              }
            }
          }
          .overlay(LoadingScreen2View()
            .opacity(loadingGoogle ? 1.0 : 0.00)
          )
          .alert("Algo salió mal",
                  isPresented: $viewModel.showAlert) {
            Button("Entendido", role: .cancel) {}
          } message: {
            Text(viewModel.alertMessage)
          }
        }
        .padding(.horizontal)
        
        Spacer()
        Divider().padding(.horizontal)
        
        HStack {
          Text("¿Ya tienes una cuenta?")
          Spacer()
          LinkButton("Inicia Sesión", buttonColor: .blue){
            goLogin()
          }
        }.padding(.horizontal)
        
        LinkButton("Aviso de privacidad",
                   buttonColor: .blue, action: {})
        .padding(.bottom)
      }.foregroundColor(Color("MainText"))
    }
  }
}

struct RegisterView_Previews: PreviewProvider {
  static var previews: some View {
    UserRegisterView(goLogin: {}, goForm: {}, goMainMenu: {})
  }
}
