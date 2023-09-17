//
//  NavBarTheme.swift
//  GreenCircle
//
//  Created by Dani Gutiérrez on 16/09/23.
//

import Foundation
import SwiftUI

class MyNavigationController: UINavigationController {
  override var preferredStatusBarStyle: UIStatusBarStyle {
    return .lightContent
  }
}
class ViewController: UIViewController {
  override var preferredStatusBarStyle: UIStatusBarStyle {
    return .lightContent
  }
}

class RootViewController: UIViewController {
  override var childForStatusBarStyle: UIViewController? {
    return self.children.first
  }
  override var preferredStatusBarStyle: UIStatusBarStyle {
    return .lightContent
  }
}

struct NavigationConfigurator: UIViewControllerRepresentable {
  var configure: (UINavigationController) -> Void = { _ in }
  var statusBarStyle: UIColor

  init(statusBarStyle: UIColor, configure: @escaping (UINavigationController) -> Void = { _ in }) {
    self.statusBarStyle = statusBarStyle
    self.configure = configure
  }
  func makeUIViewController(context:
                            UIViewControllerRepresentableContext<NavigationConfigurator>) -> UIViewController {
  let controller = UIViewController()

    DispatchQueue.main.async {
      if let nconf = controller.navigationController {
        self.configure(nconf)
      }
    }
    return controller
  }
  func updateUIViewController(_ uiViewController: UIViewController,
                              context: UIViewControllerRepresentableContext<NavigationConfigurator>) {
  self.configure(uiViewController.navigationController ?? UINavigationController())
  }
}
