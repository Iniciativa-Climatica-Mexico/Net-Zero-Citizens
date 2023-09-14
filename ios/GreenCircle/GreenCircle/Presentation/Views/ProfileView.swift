//
//  ProfileView.swift
//  GreenCircle
//
//  Created by ITESM on 07/09/23.
//

import SwiftUI

struct ProfileView: View {
    
    @ObservedObject var modelUser: UserViewModel
    
    
    var body: some View {
        ZStack {
            
            //Title Bar
            VStack {
                TitleBarView(
                    title: "Mi Perfil",
                    leftIcon: nil,
                    rightIcon: "person.fill",
                    leftDestination: {  },
                    rightDestination: { ProfileInformationView(modelUser: UserViewModel()) }
                )
                .frame(height: 10)
                .offset(y: -60)
                
                Spacer() // Esto empuja el TitleBarView hacia arriba
            }

            
            VStack {
                HStack {
                    Text(modelUser.contentUser.firstName)
                        .foregroundColor(Color.black)
                        .font(.system(size: 16))
                        .bold()
                        .padding(.top, 12)
                    
                    Text(modelUser.contentUser.lastName)
                        .foregroundColor(Color.black)
                        .font(.system(size: 16))
                        .fontWeight(.semibold)
                        .padding(.top, 12)
                        .padding(.bottom, 2)
                }
                .padding(.top, 15) // Añade padding para mover el texto hacia abajo un poco

                NavigationLink("Cerrar Sesión", destination: Example2View()) //Esto va a ser con flowstacks
                    .foregroundColor(TitleBarColor.TitleBarColor)
                    .font(.system(size: 13))
                    .fontWeight(.bold)
                    .padding(.top, 8) // Añade padding para separar el botón del texto
                
                Spacer()
                
            }
            .padding(.top, 150)
            .onAppear {
                Task {
                    await modelUser.fetchUserById(idUser: "1")
                }
            }
    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView(modelUser: UserViewModel())
    }
}

}
