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
  @EnvironmentObject var user: UserData

  var body: some View {
    ZStack {

      BackgroundView()
      
      VStack(spacing: 40) {
        HeaderView(
          title: "Inicia sesión con tu cuenta",
          subTitle: "Nos da gusto verte")
        
        Spacer()
        
        VStack {
          GoogleSignInButton(style: .wide) {
            Task {
              let state = await viewModel
                .handleGoogleSignIn(userData: user)
              switch state {
              case .fail:
                break
              case .newUser:
                goForm()
              case .success:
                goMainMenu()
              }
            }
          }.alert("Algo salió mal",
                  isPresented: $viewModel.showAlert) {
            Button("Entendido", role: .cancel) {}
          } message: {
            Text("Intenta de nuevo por favor")
          }
        }
        .padding(.horizontal)
        
        Spacer()
        
        Divider().padding(.horizontal)
        
        HStack {
          Text("¿No tienes una cuenta?")
          Spacer()
          LinkButton("Regístrate", buttonColor: .blue){
            goUserRegister()
          }
        }.padding(.horizontal)
        
        LinkButton("Soy Proveedor", buttonColor: .blue, action: goCompanyRegister)
          .padding(.bottom)
      }.foregroundColor(Color("MainText"))
    }
  }
}


struct LoginView_Previews: PreviewProvider {
  static var previews: some View {
    LoginView(goUserRegister: {},
              goForm: {},
              goMainMenu: {},
              goCompanyRegister: {})
  }
}
