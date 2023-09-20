//
//  GoogleSignInUseCase.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 17/09/23.
//

import Foundation
import SwiftUI
import GoogleSignIn

/// Caso de uso de iniciar sesión con Google
class GoogleSignInUseCase {
  let repository = UserRepository.shared
  static let shared = GoogleSignInUseCase()
  
  
  /// La función se encarga de hacer un request a la API de Google, para después hacer un post a nuestro backend, creando un usuario con la información proporcionada por google
  /// - Returns: Una response de autenticación con los tokens y el usuario o nil si falla
  @MainActor
  func handleSignInButton() async -> AuthResponse? {
    guard let presentingViewController = (UIApplication.shared.connectedScenes.first as? UIWindowScene)?.windows.first?.rootViewController else {return nil}
    
    do {
      let res = try await GIDSignIn.sharedInstance.signIn(withPresenting: presentingViewController)
      
      return await repository
        .postGoogleLogin(googleToken: res.user.idToken!.tokenString)
    } catch {
      return nil
    }
  }
}
