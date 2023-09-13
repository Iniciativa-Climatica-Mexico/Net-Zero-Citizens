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
  
  var body: some View {
    VStack {
      VStack(alignment: .leading) {
        Image(systemName: "leaf")
          .font(.largeTitle)
          .foregroundColor(.green)
        Text("Inicia sesión con tu cuenta")
          .font(.system(size: 52))
        Text("Nos da gusto verte de nuevo")
      }
      .padding(.horizontal)
      
      Spacer(minLength: 80)

      Rectangle()
        .fill(.gray)
        .opacity(0.1)
        .cornerRadius(40, corners: [.topLeft, .topRight])
        .edgesIgnoringSafeArea(.bottom)
        .overlay {
          VStack(spacing: 45) {
            Spacer()
            GoogleSignInButton(style: .wide){}
              .padding(.horizontal, 40)
            
            Spacer()
            Divider().padding(.horizontal)
            
            HStack {
              Text("¿No tienes una cuenta?")
              Spacer()
              Button("Regístrate") {
                goUserRegister()
              }.buttonStyle(LinkButtonConfig())
            }.padding(.horizontal, 30)
            
            Button() {
            } label: {
              Text("Soy proveedor")
                .foregroundColor(.green)
            }
            .buttonStyle(LinkButtonConfig())
            .padding(.bottom)
          }
        }
    }
  }
}

struct LoginView_Previews: PreviewProvider {
  static var previews: some View {
    LoginView{()}
  }
}
