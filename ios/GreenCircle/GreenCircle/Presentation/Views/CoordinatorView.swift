//
//  CoordinatorView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import FlowStacks
import SwiftUI

struct CoordinatorView: View {
  
  enum Screens {
    case login
    case userRegister
    //    case companyRegister
  }
  
  @State var routes: Routes<Screens> = [.root(.login)]
  
  var body: some View {
    Router($routes) { screen, _ in
      switch screen {
      case .login:
        LoginView(goUserRegister: {routes.presentCover(.userRegister)})
        
      case .userRegister:
        UserRegisterView(goLogin: {routes.goBackToRoot()})
      }
    }
  }
}
