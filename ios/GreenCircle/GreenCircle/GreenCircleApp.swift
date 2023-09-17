//
//  GreenCircleApp.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 04/09/23.
//

import SwiftUI

@main
struct GreenCircleApp: App {

  var body: some Scene {
    WindowGroup {
      // ContentView()
      EcoInfoView()
        .applyNavBarTheme()
    }
  }
}
