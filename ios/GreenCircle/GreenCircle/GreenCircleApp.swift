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
    WindowGroup {
      CoordinatorView()
        .onOpenURL { url in
          GIDSignIn.sharedInstance.handle(url)
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
