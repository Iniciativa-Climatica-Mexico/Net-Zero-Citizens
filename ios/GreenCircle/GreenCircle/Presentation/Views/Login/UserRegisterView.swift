//
//  RegisterView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import SwiftUI
import GoogleSignInSwift

struct UserRegisterView: View {
  @EnvironmentObject var userData: UserData
  @ObservedObject var viewModel = UserRegisterViewModel()
  var goLogin: () -> Void
  var goForm: () -> Void
  var goMainMenu: () -> Void
  
  var body: some View {
    ZStack{
      
      BackgroundView()
      
      VStack(spacing: 40) {
        HeaderView(
          title: "Crear cuenta",
          subTitle: "Regístrate con tu cuenta preferida")
        
        Spacer()
        
        VStack {
          GoogleSignInButton(style: .wide){
            Task {
              let new_user = await viewModel
                .handleGoogleSignIn(userData: userData)
              if new_user {
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
          Text("¿Ya tienes una cuenta?")
          Spacer()
          LinkButton("Inicia Sesión", buttonColor: .blue){
            goLogin()
          }
        }.padding(.horizontal)
        
        LinkButton("Aviso de privacidad",
                   buttonColor: .blue, action: {})
          .padding(.bottom)
      }
      
    }.foregroundColor(Color("MainText"))
  }
}

struct RegisterView_Previews: PreviewProvider {
  static var previews: some View {
    UserRegisterView(goLogin: {}, goForm: {}, goMainMenu: {})
  }
}
