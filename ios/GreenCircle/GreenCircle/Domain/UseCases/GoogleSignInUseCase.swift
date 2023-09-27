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
  func handleSignInButton() async -> SignInState {
    guard let presentingViewController =
            (UIApplication.shared.connectedScenes.first
             as? UIWindowScene)?.windows.first?
      .rootViewController else {return .fail}
    
    do {
      let res = try await GIDSignIn.sharedInstance
        .signIn(withPresenting: presentingViewController)
      
      guard let authResponse = await repository
        .postGoogleLogin(googleToken: res.user.idToken!.tokenString)
      else { return .fail }
      
      NetworkAPIService.shared
        .setAuthTokens(authResponse.tokens.authToken)
      repository.saveAuthData(authData: authResponse)
      
      if authResponse.user.roles == "new_user" {
        return .newUser
      } else {
        return .success
      }
      
    } catch {
      return .fail
    }
  }
  
  func handleBackgroundSignIn() async -> SignInState {
    do {
      let user = try await GIDSignIn.sharedInstance.restorePreviousSignIn()
      
      guard let authResponse = await repository
        .postGoogleLogin(googleToken: user.idToken!.tokenString)
      else { return .fail }
      
      NetworkAPIService.shared
        .setAuthTokens(authResponse.tokens.authToken)
      repository.saveAuthData(authData: authResponse)
      
      if authResponse.user.roles == "new_user" {
        return .newUser
      } else {
        return .success
      }
      
    } catch {
      return .fail
    }
  }
}
