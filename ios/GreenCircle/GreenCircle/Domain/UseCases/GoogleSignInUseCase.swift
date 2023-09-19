//
//  GoogleSignInUseCase.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation
import SwiftUI
import GoogleSignIn

class GoogleSignInUseCase {
  let repository = UserRepository.shared
  static let shared = GoogleSignInUseCase()
  
  @MainActor
  func handleSignInButton() async -> AuthResponse? {
    guard let presentingViewController = (UIApplication.shared.connectedScenes.first as? UIWindowScene)?.windows.first?.rootViewController else {return nil}
    
    do {
      let res = try await GIDSignIn.sharedInstance.signIn(withPresenting: presentingViewController)
      
      print(res.user.idToken!.tokenString)
      
      return await repository
        .postGoogleLogin(googleToken: res.user.idToken!.tokenString)
    } catch {
      return nil
    }
  }
}
