//
//  TabBarTheme.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 19/09/23.
//

import Foundation
import SwiftUI

struct TabBarTheme: ViewModifier {
  @Environment(\.colorScheme) var colorScheme

  /// Apply the TabBar appearance when on appear of a view
  /// Usage:
  /// applyTabBarTheme()
  /// - Returns: View of standard TabBarTheme
  func body(content: Content) -> some View {
    content.onAppear {
      let appearance = UITabBarAppearance()
      appearance.shadowColor = .white

      UITabBar.appearance().scrollEdgeAppearance = appearance
    }
  }
}

extension View {
  func applyTabBarTheme() -> some View {
    self.modifier(TabBarTheme())
  }
}
