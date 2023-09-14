//
//  LoginView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import GoogleSignInSwift
import GoogleSignIn
import SwiftUI

func handleSignInButton() {
  guard let presentingViewController = (UIApplication.shared.connectedScenes.first as? UIWindowScene)?.windows.first?.rootViewController else {return}
  
  GIDSignIn.sharedInstance.signIn(withPresenting: presentingViewController) { signInResult, error in
    guard let result = signInResult else {
      // Inspect error
      return
    }
    // If sign in succeeded, display the app's main content View.
    print(
      result.user.profile!.name
    )
  }
}

struct LoginView: View {
  var goUserRegister: () -> Void
  var goForm: () -> Void
  
  @State var name = ""
  
  var body: some View {
    VStack {
      VStack(alignment: .leading) {
        Image(systemName: "leaf")
          .font(.largeTitle)
          .foregroundColor(.green)
        Text("Inicia sesión con tu cuenta")
          .font(.system(size: 52))
          .bold()
          .padding(.bottom)
        Text("Nos da gusto verte de nuevo")
      }
      .padding(.horizontal)
      .frame(alignment: .leading)
      
      Spacer(minLength: 80)
      
      Rectangle()
        .fill(.gray)
        .opacity(0.1)
        .cornerRadius(40, corners: [.topLeft, .topRight])
        .edgesIgnoringSafeArea(.bottom)
        .overlay {
          VStack(spacing: 45) {
            Spacer()
            GoogleSignInButton(style: .wide){
              handleSignInButton()
              goForm()
            }
            .padding(.horizontal)
            
            Spacer()
            Divider().padding(.horizontal)
            
            HStack {
              Text("¿No tienes una cuenta?")
              Spacer()
              LinkButton("Regístrate", buttonColor: .blue){}
            }.padding(.horizontal)
            
            LinkButton("Soy Proveedor", buttonColor: .blue, action: {})
              .padding(.bottom)
          }
        }
    }
  }
}

struct LoginView_Previews: PreviewProvider {
  static var previews: some View {
    LoginView(goUserRegister: {}, goForm: {})
  }
}


