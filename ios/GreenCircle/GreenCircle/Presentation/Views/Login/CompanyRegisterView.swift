//
//  RegisterCompanyView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import SwiftUI
import GoogleSignInSwift

struct CompanyRegisterView: View {
  var goLogin: () -> Void
  var goForm: () -> Void
  var goMainMenu: () -> Void

  @StateObject var viewModel = LoginViewModel()
  @EnvironmentObject var user: UserData

  var body: some View {
    ZStack {

      BackgroundView()

      VStack(spacing: 40) {
        HeaderView(
          title: "Crear cuenta de empresa",
          subTitle: "Registrate con tu cuenta preferida")

        Spacer()

        VStack {
          GoogleSignInButton(style: .wide) {
            Task {
              let newUser = await viewModel
                .handleGoogleSignIn(userData: user)
              if newUser {
                goForm()
              } else {
                goMainMenu()
              }
            }
          }
        }
        .padding(.horizontal)

        Spacer()

        Divider().padding(.horizontal)

        HStack {
          Text("¿No eres un proveedor?")
          Spacer()
          LinkButton("Inicia Sesión",
                     buttonColor: .blue) {
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

struct CompanyRegisterView_Previews: PreviewProvider {
    static var previews: some View {
      CompanyRegisterView(goLogin: {}, goForm: {}, goMainMenu: {})
    }
}
