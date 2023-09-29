//
//  GreenCircleApp.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 04/09/23.
//

import GoogleSignIn
import SwiftUI

@main
struct GreenCircleApp: App {
  @State var isActive = false
  
  var body: some Scene {
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

/*
class AppDelegate: NSObject, UIApplicationDelegate {
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    // Configurar la notificación local al iniciar la aplicación
    let center = UNUserNotificationCenter.current()
    center.requestAuthorization(options: [.alert, .sound]) { _, _ in }
    
    let content = UNMutableNotificationContent()
    content.title = "Notificación"
    content.body = "¿Deseas ir a la segunda vista?"
    
    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 1, repeats: false)
    let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: trigger)
    
    center.add(request)
    
    return true
  }
}
*/
