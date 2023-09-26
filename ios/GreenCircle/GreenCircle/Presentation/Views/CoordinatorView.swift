//
//  CoordinatorView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import FlowStacks
import SwiftUI

struct CoordinatorView: View {
  @StateObject var viewModel = CoordinatorViewModel()
  @State var hasPendingSurvey: Bool = false
  
  enum Screens {
    case splashScreen
    case login
    case userRegister
    case userRegisterForm
    case companyRegister
    case companyRegisterForm
    case mainMenuView
    case pendingCompany
    case survey
  }
  
  @State var routes: Routes<Screens> = [.root(.splashScreen)]
  
  var body: some View {
    Router($routes) { screen, _ in
      switch screen {
      case .splashScreen:
        SplashScreenView(goLogin: goLogin)
        
      case .login:
        LoginView(goUserRegister: goUserRegister,
                  goForm: goUserForm,
                  goMainMenu: goMainMenu,
                  goCompanyRegister: goCompanyRegister)
        
      case .userRegister:
        UserRegisterView(goLogin: goLogin,
                         goForm: goUserForm,
                         goMainMenu: goMainMenu)
        
      case .userRegisterForm:
        UserRegisterFormView(goMainMenu: goMainMenu)
        
      case .companyRegister:
        CompanyRegisterView(goLogin: goLogin,
                            goForm: goCompanyForm,
                            goMainMenu: goMainMenu)
        
      case .companyRegisterForm:
        CompanyRegisterFormView(goPending: goPending)
        
      case .mainMenuView:
        TabBarView()
        
      case .pendingCompany:
        PendingCompanyView()
        
      case .survey:
        SurveyView(hasPendingPendingSurvey: $hasPendingSurvey,
                   goMainMenu: goMainMenu)
          .applyNavBarTheme()
      }
    }
    .onAppear {
      Task {
        let res = await viewModel.handleSignIn()
        
        switch res {
        case .newUser:
          goUserForm()
        case .success:
          goMainMenu()
        case .fail:
          goLogin()
        }
      }
    }
  }
  
  private func goLogin() {
    routes.presentCover(.login)
  }
  
  private func goUserRegister() {
    routes.presentCover(.userRegister)
  }
  
  private func goUserForm() {
    routes.presentCover(.userRegisterForm)
  }
  
  private func goCompanyRegister() {
    routes.presentCover(.companyRegister)
  }
  
  private func goCompanyForm() {
    routes.presentCover(.companyRegisterForm)
  }
  
  private func goMainMenu() {
    hasPendingSurvey = false
    routes.presentCover(.mainMenuView)
    
    if hasPendingSurvey {
      routes.presentCover(.survey)
    }
  }
  
  private func goSurvey() {
    routes.presentCover(.survey)
  }
  
  private func goPending() {
    routes.presentCover(.pendingCompany)
  }
}
