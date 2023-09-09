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
        VStack {
            // TitleBarView (No forma parte del ScrollView)
            TitleBarView(
                title: "Mi Perfil",
                leftIcon: nil,  // Nombre SF Symbol para ícono izquierdo
                rightIcon: "person.fill",            // Nombre SF Symbol para ícono derecho
                leftDestination: {  },  // View a la que se navegará con el ícono izquierdo
                rightDestination: { ProfileInformationView()}                 // View a la que se navegará con el ícono derecho
            )
            .frame(height: 55)  // Espacio entre el titel bar y el contenido
            .navigationBarBackButtonHidden(true)  // Ocultar botón "back" predeterminado
            .offset(y: -60)  // Ajustar TitleBar a la altura correcta
            
            VStack {
                if let user = viewModel.user{
                //profilePicture
                // .resizable()
                // .aspectRatio(contentMode: .fill)
                // .frame(width: 103, height: 103)
                //.clipShape(Circle())
                // .overlay(Circle().stroke(TitleBarColor.TitleBarColor, lineWidth: 1))
                
                HStack{
                    
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
                }
                

                
                NavigationLink("Cerrar Sesión",destination: Example2View())
                    .foregroundColor(TitleBarColor.TitleBarColor)
                    .font(.system(size: 13))
                    .fontWeight(.bold)
                
                
            }
            .onAppear {
                viewModel.fetchUserData()
            }
        }
    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView()
    }
}
