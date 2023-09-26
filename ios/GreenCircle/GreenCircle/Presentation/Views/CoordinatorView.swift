//
//  CoordinatorView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import FlowStacks
import SwiftUI

struct CoordinatorView: View {
  @State var hasPendingSurvey: Bool = false
  @State var photovoltaicToggle: Bool = false
  @State var solarToggle: Bool = false
  
  enum Screens {
    case login
    case userRegister
    case userRegisterForm
    case companyRegister
    case companyRegisterForm
    case companyRegisterDivider
    case uploadCompanyFiles
    case mainMenuView
    case pendingCompany
    case survey
  }
  
  @State var routes: Routes<Screens> = [.root(.login)]
  
  var body: some View {
    Router($routes) { screen, _ in
      switch screen {
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
          CompanyRegisterFormView(goCompanyRegisterDivider: goCompanyRegisterDivider, goPending: goPending)
      
      case .companyRegisterDivider:
          CompanyRegisterDividerView(goUploadCompanyFiles: goUploadCompanyFiles,
                                     photovoltaicToggle: $photovoltaicToggle,
                                     solarToggle: $solarToggle)
          
      case .uploadCompanyFiles:
          CompanyUploadFilesView(goPending: goPending,
                                 photovoltaicToggle: $photovoltaicToggle,
                                 solarToggle: $solarToggle)
          
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
    hasPendingSurvey = false
    routes.presentCover(.mainMenuView)
    
    if hasPendingSurvey {
      routes.presentCover(.survey)
    }
  }
  
  private func goSurvey() {
    routes.presentCover(.survey)
  }
  
  private func goCompanyRegisterDivider() {
    routes.presentCover(.companyRegisterDivider)
  }
  
  private func goUploadCompanyFiles(photovoltaicToggle: Binding<Bool>, solarToggle: Binding<Bool>) {
    routes.presentCover(.uploadCompanyFiles)
  }
  
  private func goPending() {
    routes.presentCover(.pendingCompany)
  }
}
