//
//  NavBarTheme.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 16/09/23.
//

import Foundation
import SwiftUI

struct NavBarTheme: ViewModifier {
  @Environment(\.colorScheme) var colorScheme

  /// Apply the NavBar appearance when on appear of a view
  /// Usage: AnyView().
  /// applyNavBarTheme()
  /// - Returns: View of standard NavBar
  func body(content: Content) -> some View {
    content.onAppear {
      let appearance = UINavigationBarAppearance()
      appearance.backgroundColor = colorScheme == .light ? UIColor(Color("BlueCustom")) : UIColor(Color("BlueCustom"))
      appearance.titleTextAttributes = [.foregroundColor: UIColor.white]
      appearance.largeTitleTextAttributes = [.foregroundColor: UIColor.white]

      UINavigationBar.appearance().scrollEdgeAppearance = appearance
      UINavigationBar.appearance().standardAppearance = appearance
    }
  }
}

extension View {
  func applyNavBarTheme() -> some View {
    self.modifier(NavBarTheme())
  }
}
