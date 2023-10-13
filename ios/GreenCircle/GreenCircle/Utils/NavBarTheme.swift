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
      appearance.backgroundColor = colorScheme == .light ? UIColor(Color("Primary")) : UIColor(Color("Primary"))
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



//
//  NavBarTheme.swift
//  GreenCircle
//
//  Created by Frida Bailleres González on 19/09/23.
//

import Foundation
import SwiftUI

class Theme {
    static func navigationBarColors(background: UIColor?, titleColor: UIColor? = nil, tintColor: UIColor? = nil) {
        
        let navigationAppearance = UINavigationBarAppearance()
        navigationAppearance.configureWithOpaqueBackground()
        navigationAppearance.backgroundColor = background ?? .clear
        
        navigationAppearance.titleTextAttributes = [.foregroundColor: titleColor ?? .black]
        navigationAppearance.largeTitleTextAttributes = [.foregroundColor: titleColor ?? .black]
       
        UINavigationBar.appearance().standardAppearance = navigationAppearance
        UINavigationBar.appearance().compactAppearance = navigationAppearance
        UINavigationBar.appearance().scrollEdgeAppearance = navigationAppearance

        UINavigationBar.appearance().tintColor = tintColor ?? titleColor ?? .black
    }
}
