//
//  RegisterView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import SwiftUI
import GoogleSignInSwift

struct UserRegisterView: View {
  var goLogin: () -> Void
  
  var body: some View {
    VStack {
      VStack(alignment: .leading) {
        Image(systemName: "leaf")
          .font(.largeTitle)
          .foregroundColor(.green)
        
        Text("Crear cuenta")
          .font(.system(size: 52))
          .bold()
          .padding(.bottom)
        Text("Registrate con tu cuenta preferida")
      }
      .frame(maxWidth: .infinity, alignment: .leading)
      .padding(.horizontal)
      
      Spacer(minLength: 80)
      
      Rectangle()
        .fill(.gray)
        .opacity(0.1)
        .cornerRadius(40, corners: [.topLeft, .topRight])
        .edgesIgnoringSafeArea(.bottom)
        .overlay {
          VStack(spacing: 45) {
            GoogleSignInButton(style: .wide){}
              .padding(.horizontal, 40)
              .padding(.top, 120)
            
            Spacer()
            Divider()
              .padding(.horizontal)
            
            HStack {
              Text("¿Ya tienes una cuenta?")
              Spacer()
              LinkButton("Inicia Sesión", buttonColor: .blue){}
            }.padding(.horizontal, 30)
            
            LinkButton("Aviso de privacidad", buttonColor: .blue){}
            
          }
        }
    }
  }
}

struct RegisterView_Previews: PreviewProvider {
  static var previews: some View {
    UserRegisterView{()}
  }
}
