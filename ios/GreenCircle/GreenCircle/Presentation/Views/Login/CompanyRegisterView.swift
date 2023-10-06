//
//  RegisterCompanyView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 19/09/23.
//

import SwiftUI
import GoogleSignInSwift

struct CompanyRegisterView: View {
  var goLogin: () -> Void
  var goForm: () -> Void
  var goTutorial: () -> Void

  @StateObject var viewModel = LoginViewModel()
  @EnvironmentObject var user: UserData
  @State private var isPrivacyPolicyVisible = false
  private let privacyPolicyTextView = PrivacyPolicyTextView(dismiss: .constant(false))
    
  var body: some View {
    ZStack {

      BackgroundView()

      VStack(spacing: 40) {
        HeaderView(
          title: "Crear cuenta de empresa",
          subTitle: "Registrate con tu cuenta preferida")

        Spacer()

        VStack {
          GoogleSignInButton(style: .wide) {
            Task {
              let state = await viewModel
                .handleGoogleSignIn()
              switch state {
              case .newUser:
                goForm()
              case .success:
                goTutorial()
              case .fail:
                break
              }
                        }
                    }
                    .alert("Algo salió mal", isPresented: $viewModel.showAlert) {
                        Button("Entendido", role: .cancel) {}
                    } message: {
                        Text("Intenta de nuevo por favor")
                    }
                    .padding(.horizontal)
                }

                Spacer()

                Divider().padding(.horizontal)

                HStack {
                    Text("¿No eres un proveedor?")
                    Spacer()
                    LinkButton("Inicia Sesión", buttonColor: .blue) {
                        goLogin()
                    }
                }
                .padding(.horizontal)

                LinkButton("Aviso de privacidad", buttonColor: .blue) {
                    isPrivacyPolicyVisible.toggle()
                }
                .padding(.bottom)
                
            }
            .foregroundColor(Color("MainText"))
        }
    .sheet(isPresented: $isPrivacyPolicyVisible) {
            PrivacyPolicyTextView(dismiss: $isPrivacyPolicyVisible) // Pass the boolean as a binding
        }
    }
}

