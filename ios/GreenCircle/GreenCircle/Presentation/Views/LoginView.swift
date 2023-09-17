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
      result.user.profile!.name,
      result.user.profile!.email
    )
  }
}

struct LoginView: View {
  var goUserRegister: () -> Void
  var goForm: () -> Void
  
  @State var name = ""
  
  var body: some View {
    ZStack{
      
      BackgroundView()
      
      VStack(spacing: 40) {
        HeaderView(
          title: "Inicia sesión con tu cuenta",
          subTitle: "Nos da gusto verte")
        
        Spacer()
        
        VStack {
          GoogleSignInButton(style: .wide){
            handleSignInButton()
            goForm()
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
        
        LinkButton("Soy Proveedor", buttonColor: .blue, action: {})
          .padding(.bottom)
      }.foregroundColor(Color("MainText"))
    }
  }
}


struct LoginView_Previews: PreviewProvider {
  static var previews: some View {
    LoginView(goUserRegister: {}, goForm: {})
  }
}

struct HeaderView: View {
  var title: String
  var subTitle: String = ""
  
  var body: some View {
    VStack(alignment: .leading) {
      Image(systemName: "leaf")
        .font(.largeTitle)
        .foregroundColor(.green)
      Text(title)
        .font(.system(size: 45, weight: .bold))
        .padding(.vertical)
      Text(subTitle)
        .font(.system(size: 24))
      Spacer()
    }
    .padding(.horizontal)
    .frame(maxWidth: .infinity,
           maxHeight: 250,
           alignment: .leading)
  }
}

struct BackgroundView: View {
  var body: some View {
    Rectangle()
      .fill(.gray)
      .opacity(0.1)
      .cornerRadius(40, corners: [.topLeft, .topRight])
      .edgesIgnoringSafeArea(.bottom)
      .padding(.top, 300)
  }
}
