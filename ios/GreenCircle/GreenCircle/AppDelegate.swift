//
//  AppDelegate.swift
//  GreenCircle
//
//  Created by Daniel Hurtado on 18/09/23.
//

import Foundation
import UIKit
import UserNotifications
import UserNotificationsUI

/*
 class AppDelegate: NSObject, UIApplicationDelegate, UNUserNotificationCenterDelegate {
    /// Function to get device token
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        let tokenParts = deviceToken.map { data in String(format: "%02.2hhx", data) }
        let token = tokenParts.joined()
        print("Device Token: \(token)")
    }
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        let center = UNUserNotificationCenter.current()
        center.delegate = self
        application.registerForRemoteNotifications()
        return true
    }
    
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("Failed to register for remote notifications with error: \(error)")
    }
}
*/

class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Called when the app finishes launching
        
        // Request permission to send notifications
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { (granted, error) in
            if granted {
                // User granted permission
                self.showPermissionGrantedMessage()
            } else {
                // User denied permission or an error occurred
                self.showPermissionDeniedMessage()
            }
        }
        
        let center = UNUserNotificationCenter.current()
        center.delegate = self
        // Register for remote notifications
        application.registerForRemoteNotifications()
        
        return true
    }
    
    func showPermissionGrantedMessage() {
        // Display a message indicating that the user granted permission
        
        // Create an alert controller with a title and message
        let alertController = UIAlertController(title: "Permission Granted", message: "You can now receive notifications.", preferredStyle: .alert)
        
        // Add an "OK" action to the alert
        let okAction = UIAlertAction(title: "OK", style: .default, handler: nil)
        alertController.addAction(okAction)
        
        // Present the alert on the root view controller
        if let rootViewController = self.window?.rootViewController {
            rootViewController.present(alertController, animated: true, completion: nil)
        }
    }
    
    func showPermissionDeniedMessage() {
        // Display a message indicating that the user denied permission
        
        // Create an alert controller with a title and message
        let alertController = UIAlertController(title: "Permission Denied", message: "You have denied permission to receive notifications. You can change this in the device settings.", preferredStyle: .alert)
        
        // Add an "Open Settings" action to the alert
        let settingsAction = UIAlertAction(title: "Open Settings", style: .default) { (action) in
            if let settingsURL = URL(string: UIApplication.openSettingsURLString) {
                UIApplication.shared.open(settingsURL, options: [:], completionHandler: nil)
            }
        }
        
        // Add a "Cancel" action to the alert
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: nil)
        alertController.addAction(settingsAction)
        alertController.addAction(cancelAction)
        
        // Present the alert on the root view controller
        if let rootViewController = self.window?.rootViewController {
            rootViewController.present(alertController, animated: true, completion: nil)
        }
    }


}
