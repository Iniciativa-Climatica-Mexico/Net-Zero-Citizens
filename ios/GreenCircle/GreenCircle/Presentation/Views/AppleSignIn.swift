//
//  AppleSignIn.swift
//  GreenCircle
//
//  Created by Dan FuPo on 29/09/23.
//

import AuthenticationServices
import SwiftUI

struct AppleSignIn: View {
  @Environment(\.colorScheme) var colorScheme
  
  @AppStorage("email") var email: String = ""
  @AppStorage("firstName") var firstName: String = ""
  @AppStorage("lastName") var lastName: String = ""
  @AppStorage("userId") var userId: String = ""
  
  var body: some View {
    SignInWithAppleButton(.continue) { request in
      
      request.requestedScopes = [.email, .fullName]
      
    } onCompletion: { result in
      
      switch result {
      case .success(let auth):
        
        switch auth.credential {
        case let credential as ASAuthorizationAppleIDCredential:
          
          let userId = credential.user
          
          let email = credential.email
          let firstName = credential.fullName?.givenName
          let lastName = credential.fullName?.familyName
          
          self.email = email ?? ""
          self.firstName = firstName ?? ""
          self.lastName = lastName ?? ""
          self.userId = userId

        default:
          break
        }
        
      case .failure(let error):
        print(error)
      }
      
    }
    .signInWithAppleButtonStyle(
      colorScheme == .dark ? .white : .black
    )
    .frame(height: 50)
    .padding()
    .cornerRadius(8)
  }
}

#Preview {
  AppleSignIn()
}
