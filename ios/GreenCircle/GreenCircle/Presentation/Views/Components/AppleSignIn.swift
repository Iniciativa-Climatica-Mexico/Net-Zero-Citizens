//
//  AppleSignIn.swift
//  GreenCircle
//
//  Created by Dan FuPo on 29/09/23.
//

import AuthenticationServices
import SwiftUI

struct AppleUser: Codable {
  let userId: String
  let firstName: String
  let lastName: String
  let email: String
  
  init?(credentials: ASAuthorizationAppleIDCredential) {
    guard
      let firstName = credentials.fullName?.givenName,
      let lastName = credentials.fullName?.familyName,
      let email = credentials.email
    else { return nil }
    
    self.userId = credentials.user
    self.firstName = firstName
    self.lastName = lastName
    self.email = email
  }
}

struct AppleSignIn: View {
  @Environment(\.colorScheme) var colorScheme
  @StateObject var vm = LoginViewModel()
  
  var goForm: () -> Void
  var goMainMenu: () -> Void
  
  var body: some View {
    SignInWithAppleButton(
      .signIn,
      onRequest: configure,
      onCompletion: handle
    )
    .signInWithAppleButtonStyle(
      colorScheme == .dark ? .white : .black
    )
    .frame(height: 45)
    .padding()
  }
  
  func configure(_ request: ASAuthorizationAppleIDRequest) {
    request.requestedScopes = [.fullName, .email]
  }
  
  func handle(_ authResult: Result<ASAuthorization, Error>) {
    switch authResult {
    case .success(let auth):
      switch auth.credential {
      case let appleIdCredentials as ASAuthorizationAppleIDCredential:
        if let appleUser = AppleUser(credentials: appleIdCredentials),
           let appleUserData = try? JSONEncoder().encode(appleUser) {
          UserDefaults.standard.setValue(appleUserData, forKey: appleUser.userId)
          
          print("saved apple user", appleUser)
          
          vm.userId = appleUser.userId
          vm.email = appleUser.email
          vm.fullName = "\(appleUser.firstName) \(appleUser.lastName)"
          
          Task {
            let state = await vm.handleAppleSignIn()
            switch state {
            case .fail:
              break
            case .newUser:
              goForm()
            case .success:
              goMainMenu()
            }
          }
    
        } else {
          
          goMainMenu()
          
          guard
            let appleUserData = UserDefaults.standard.data(forKey: appleIdCredentials.user),
            let appleUser = try? JSONDecoder().decode(AppleUser.self, from: appleUserData)
          else { return }
          
          print(appleUser)
        }
        
      default:
        print(auth.credential)
      }
      
    case .failure(let error):
      print(error)
    }
  }
}

#Preview {
  AppleSignIn(goForm: {}, goMainMenu: {})
}
