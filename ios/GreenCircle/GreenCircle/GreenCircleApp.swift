//
//  GreenCircleApp.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 04/09/23.
//

import SwiftUI
import GoogleSignIn

@main
struct GreenCircleApp: App {
  
  var body: some Scene {
  @State var isActive = false
    WindowGroup {
      ZStack {
        if isActive {
          CoordinatorView()
            .environmentObject(UserData())
            .onOpenURL { url in
              GIDSignIn.sharedInstance.handle(url)
            }
            .onAppear {
              GIDSignIn.sharedInstance.restorePreviousSignIn { user, error in
                // Check if `user` exists; otherwise, do something with `error`
              }
            }
        } else {
          SplashScreenView()
        }
      }.onAppear {
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
          withAnimation {
            self.isActive = true
          }
        }
      }
    }
  }
}
