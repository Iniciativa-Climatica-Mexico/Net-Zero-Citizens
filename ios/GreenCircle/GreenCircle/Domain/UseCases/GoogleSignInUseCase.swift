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
  func handleSignInButton() {
    guard let presentingViewController = (UIApplication.shared.connectedScenes.first as? UIWindowScene)?.windows.first?.rootViewController else {return}
    
    GIDSignIn.sharedInstance.signIn(withPresenting: presentingViewController) { signInResult, error in
      guard let result = signInResult else {
        // Inspect error
        return
      }
      // If sign in succeeded, display the app's main content View.
      print(result)
      return
    }
  }
}
