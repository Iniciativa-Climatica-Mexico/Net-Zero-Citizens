//
//  RegisterView.swift
//  GreenCircle
//
//  Created by Ricardo Adolfo Fernández Alvarado on 12/09/23.
//

import SwiftUI
import GoogleSignInSwift

struct UserRegisterView: View {
    @EnvironmentObject var userData: UserData
    @ObservedObject var viewModel = UserRegisterViewModel()
    var goLogin: () -> Void
    var goForm: () -> Void
    var goMainMenu: () -> Void
    
    @State private var isPopoverPresented = false // Add this line
    
    var body: some View {
        ZStack {
            BackgroundView()
            
            VStack(spacing: 40) {
                HeaderView(
                    title: "Crear cuenta",
                    subTitle: "Regístrate con tu cuenta preferida")
                
                Spacer()
                
                VStack {
                    GoogleSignInButton(style: .wide) {
                        Task {
                            let state = await viewModel.handleGoogleSignIn(userData: userData)
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
                    Text("¿Ya tienes una cuenta?")
                    Spacer()
                    LinkButton("Inicia Sesión", buttonColor: .blue) {
                        goLogin()
                    }
                }.padding(.horizontal)
                
                LinkButton("Aviso de privacidad", buttonColor: .blue) {
                    isPopoverPresented.toggle() // Add this line
                }
                .padding(.bottom)
            }
            
            // Popover
            .popover(isPresented: $isPopoverPresented, content: {
                VStack {
                    Text("Aviso de Privacidad")
                        .font(.title)
                        .padding(.bottom)
                    
                    Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula sem vitae urna rhoncus, in efficitur nulla mattis. Sed placerat tortor sit amet dui efficitur, sed vulputate odio euismod. Phasellus in orci sit amet ante volutpat semper. Nunc congue felis non vestibulum. Integer nec tellus nec arcu pellentesque fermentum. Vivamus at bibendum leo. Sed vestibulum hendrerit urna, vel suscipit libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin nec lorem at nisi mattis tincidunt. Maecenas sed facilisis ligula, at tincidunt neque.")
                        .padding()
                    
                    Button("Cerrar", action: {
                        isPopoverPresented.toggle()
                    })
                    .padding(.top)
                }
                .padding()
            })
        }
        .foregroundColor(Color("MainText"))
    }
}

struct RegisterView_Previews: PreviewProvider {
    static var previews: some View {
        UserRegisterView(goLogin: {}, goForm: {}, goMainMenu: {})
    }
}
