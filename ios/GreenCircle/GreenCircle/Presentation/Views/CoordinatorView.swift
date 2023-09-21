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
    case userRegisterForm
    case companyRegister
    case companyRegisterForm
    case mainMenuView
    case pendingCompany
    case survey
    // case companyRegister
  }
  
  @State var routes: Routes<Screens> = [.root(.login)]
  
  var body: some View {
    Router($routes) { screen, _ in
      switch screen {
      case .login:
        LoginView(goUserRegister: goUserRegister,
                  goForm: goUserForm,
                  goSurvey: goSurvey,
                  goCompanyRegister: goCompanyRegister)
        
      case .userRegister:
        UserRegisterView(goLogin: goLogin,
                         goForm: goUserForm,
                         goSurvey: goSurvey)
        
      case .userRegisterForm:
        UserRegisterFormView(goSurvey: goSurvey)
        
      case .companyRegister:
        CompanyRegisterView(goLogin: goLogin,
                            goForm: goCompanyForm,
                            goSurvey: goSurvey)
        
      case .companyRegisterForm:
        CompanyRegisterFormView(goPending: goPending)
        
      case .mainMenuView:
        TabBarView()
        
      case .pendingCompany:
        PendingCompanyView()
        
      case .survey:
        SurveyView()
          .applyNavBarTheme()
      }
    }
  }
  
  private func goLogin() {
    routes.goBackToRoot()
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
    routes.presentCover(.mainMenuView)
  }
  
  private func goSurvey() {
    routes.presentCover(.survey)
  }
  
  private func goPending() {
    routes.presentCover(.pendingCompany)
  }
}
