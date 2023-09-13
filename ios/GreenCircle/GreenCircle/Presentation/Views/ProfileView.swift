//
//  ProfileView.swift
//  GreenCircle
//
//  Created by ITESM on 07/09/23.
//

import SwiftUI
struct ProfileView: View {
    
    @StateObject private var viewModel: ProfileViewModel
    
    init() {
        let apiService = APIService()
        let userRepository: UserRepository = apiService
        let useCase = FetchUserDataUseCase(userRepository: userRepository)
        _viewModel = StateObject(wrappedValue: ProfileViewModel(fetchUserDataUseCase: useCase))
    }
    
    var body: some View {
        ZStack {
            VStack {
                Spacer()
                    .frame(height: 55) // Espacio para el TitleBar
                
                if let user = viewModel.user {
                    // Aquí es donde deberías poner tu imagen, una vez que tengas una URL para cargar
                    // Por ahora, está comentado

                    VStack {
                        HStack {
                            Text("\(user.firstName)")
                                .foregroundColor(Color.black)
                                .font(.system(size: 16))
                                .bold()
                                .padding(.top, 12)
                            
                            Text("\(user.lastName)")
                                .foregroundColor(Color.black)
                                .font(.system(size: 16))
                                .fontWeight(.semibold)
                                .padding(.top, 12)
                                .padding(.bottom, 2)
                        }
                        .padding(.top, 15) // Añade padding para mover el texto hacia abajo un poco

                        NavigationLink("Cerrar Sesión", destination: Example2View())
                            .foregroundColor(TitleBarColor.TitleBarColor)
                            .font(.system(size: 13))
                            .fontWeight(.bold)
                            .padding(.top, 12) // Añade padding para separar el botón del texto
                    }

                } else {
                    // Placeholder para cuando los datos están cargando
                    Text("Loading...")
                        .padding(.top, 16)
                }

                Spacer() // Esto empujará todo hacia arriba
            }
            .padding(.top, 60) // Espacio adicional para el TitleBar

            VStack {
                TitleBarView(
                    title: "Mi Perfil",
                    leftIcon: nil,
                    rightIcon: "person.fill",
                    leftDestination: {  },
                    rightDestination: { ProfileInformationView() }
                )
                .frame(height: 55)
                .offset(y: -60)
                
                Spacer() // Esto empuja el TitleBarView hacia arriba
            }
        }
        .onAppear {
            viewModel.fetchUserData()
        }
    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView()
    }
}
