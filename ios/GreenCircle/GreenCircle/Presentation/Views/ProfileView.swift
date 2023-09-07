//
//  ProfileView.swift
//  GreenCircle
//
//  Created by ITESM on 07/09/23.
//

import SwiftUI

struct ProfileView: View {
        @State private var firstName: String = "Nombre"
        @State private var lastName: String = "Apellido"
        @State private var profilePicture: Image = Image("profile_placeholder")
    
    var body: some View {
        
        VStack {
            // TitleBarView (No forma parte del ScrollView)
            TitleBarView(
                title: "Mi perfil",
                leftIcon: nil,  // Nombre SF Symbol para ícono izquierdo
                rightIcon: "person.fill",            // Nombre SF Symbol para ícono derecho
                leftDestination: {  },  // View a la que se navegará con el ícono izquierdo
                rightDestination: { Example2View()}                 // View a la que se navegará con el ícono derecho
            )
            .frame(height: 55)  // Espacio entre el titel bar y el contenido
            .navigationBarBackButtonHidden(true)  // Ocultar botón "back" predeterminado
            .offset(y: -60)  // Ajustar TitleBar a la altura correcta
            
            VStack {
                        profilePicture
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: 103, height: 103)
                            .clipShape(Circle())
                            .overlay(Circle().stroke(TitleBarColor.TitleBarColor, lineWidth: 1))
                        
                HStack{
                            Text(firstName)
                                .foregroundColor(Color.black)
                                .font(.system(size: 16))
                                .bold()
                                .padding(.top, 12)
                    
                            Text(lastName)
                                .foregroundColor(Color.black)
                                .font(.system(size: 16))
                                .fontWeight(.semibold)
                                .padding(.top, 12)
                                .padding(.bottom, 2)
                    
                        }
                
                        NavigationLink("Cerrar Sesión",destination: Example2View())
                                .foregroundColor(TitleBarColor.TitleBarColor)
                                .font(.system(size: 13))
                                .fontWeight(.bold)
                            

                    }
                    .onAppear {
                        // Aquí tendrías que reemplazar "Nombre Apellido" y "profile_placeholder" con la información real del usuario loggeado
                        // Suponiendo que tienes una función 'fetchUserProfile' que establece los valores de 'userName' y 'userImage' con los datos del usuario
                        // fetchUserProfile()
                    }
            
            
            
            
            // ScrollView (Esta parte sí se desplaza)
            ScrollView {
                VStack {
                    // Contenido desplazable
                    
                    
                }
            }
        }

    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView()
    }
}
