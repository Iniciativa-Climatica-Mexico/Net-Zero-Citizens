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
    var goMainMenu: () -> Void

    @StateObject var viewModel = LoginViewModel()
    @EnvironmentObject var user: UserData

    @State private var isPopoverPresented = false // Add this line

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
                                .handleGoogleSignIn(userData: user)
                            switch state {
                            case .newUser:
                                goForm()
                            case .success:
                                goMainMenu()
                            case .fail:
                                break
                            }
                        }
                    }.alert("Algo salió mal",
                            isPresented: $viewModel.showAlert) {
                        Button("Entendido", role: .cancel) {}
                    } message: {
                        Text("Intenta de nuevo por favor")
                    }
                }
                .padding(.horizontal)

                Spacer()

                Divider().padding(.horizontal)

                HStack {
                    Text("¿No eres un proveedor?")
                    Spacer()
                    LinkButton("Inicia Sesión",
                               buttonColor: .blue) {
                        goLogin()
                    }
                }.padding(.horizontal)

                LinkButton("Aviso de privacidad", buttonColor: .blue) {
                    isPopoverPresented.toggle() // Add this line
                }
                .padding(.bottom)
            }.foregroundColor(Color("MainText"))
        }
        
        // Popover
        .popover(isPresented: $isPopoverPresented, content: {
            VStack {
                Text("Aviso de Privacidad")
                    .font(.title)
                    .padding(.bottom)
                
                Text("LOREM IPSUM")
                    .padding()
                
                Button("Cerrar", action: {
                    isPopoverPresented.toggle()
                })
                .padding(.top)
            }
            .padding()
        })
    }
}


struct CompanyRegisterView_Previews: PreviewProvider {
    static var previews: some View {
      CompanyRegisterView(goLogin: {}, goForm: {}, goMainMenu: {})
    }
}
