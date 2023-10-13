//
//  CoordinatorView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//  Modified by Daniel Gutiérrez Gómez 26/09/23

import FlowStacks
import SwiftUI

struct CoordinatorView: View {
  @StateObject var viewModel = CoordinatorViewModel()
  @StateObject var companyId: CompanyReviewViewModel = CompanyReviewViewModel()
  @StateObject var deviceLocationService = DeviceLocationService.shared
  @State var hasPendingSurvey: Bool = false
  @State var photovoltaicToggle: Bool = false
  @State var solarToggle: Bool = false
  
  enum Screens {
    case splashScreen
    case login
    case userRegister
    case userRegisterForm
    case companyAssign
    case companyRegister
    case companyRegisterForm
    case companyRegisterDivider
    case uploadCompanyFiles
    case mainMenuView
    case pendingCompany
    case survey
    case reviews
    case opinions
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
        UserRegisterView(goLogin: goBack,
                         goForm: goUserForm,
                         goMainMenu: goMainMenu)
        
      case .userRegisterForm:
        UserRegisterFormView(goMainMenu: goMainMenu)
        
      case .companyAssign:
        AssignCompanyView(goForm: goCompanyForm,
                          goMainMenu: goMainMenu)
        
      case .companyRegister:
        CompanyRegisterView(goLogin: goBack,
                            goForm: goAssignCompany,
                            goMainMenu: goMainMenu)
        
      case .companyRegisterForm:
        CompanyRegisterFormView(goCompanyRegisterDivider: goCompanyRegisterDivider, goPending: goPending)
        
      case .companyRegisterDivider:
        CompanyRegisterDividerView(goUploadCompanyFiles: goUploadCompanyFiles,
                                   photovoltaicToggle: $photovoltaicToggle,
                                   solarToggle: $solarToggle)
        
      case .uploadCompanyFiles:
        CompanyUploadFilesView(goPending: goPending,
                               goBack: goBack,
                               photovoltaicToggle: $photovoltaicToggle,
                               solarToggle: $solarToggle)
        
      case .mainMenuView:
              TabBarView(goSurvey: goSurvey, goLogin: goLogin, goReviews: goReviews, goOpinions: goOpinions, goScrollRating: goReviews)
                  .environmentObject(companyId)
                  .onAppear {
                    deviceLocationService.requestLocationUpdates()
                  }
        
      case .pendingCompany:
        PendingCompanyView()
        
      case .survey:
        SurveyView(goBack: goBack)
          .applyNavBarTheme()
          
      case .reviews:
        ScrollViewRating(goOpinions: goOpinions, goScrollRating: goBack).environmentObject(companyId)
        
      case .opinions:
        OpinionsView(goReviews: goBack, goOpinions: goOpinions).environmentObject(companyId)
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
    routes.presentCover(.mainMenuView)
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
  
  private func goAssignCompany() {
    routes.presentCover(.companyAssign)
  }
  
  private func goBack() {
    routes.goBack()
  }
    
  private func goReviews() {
    routes.presentCover(.reviews)
  }
    
  private func goOpinions() {
    routes.presentCover(.opinions)
  }
}
