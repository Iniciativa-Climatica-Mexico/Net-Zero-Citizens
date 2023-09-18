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
            // Title Bar
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
                .navigationBarBackButtonHidden(true)
                Spacer() // Esto empuja el TitleBarView hacia arriba
            }
            VStack {
                Image("Sun")
                .resizable() // Hacer que la imagen sea redimensionable
                .frame(width: 100, height: 100)
                
                HStack {
                    Text(modelUser.contentUser.firstName)
                        .foregroundColor(Color.black)
                        .font(.system(size: 16))
                        .fontWeight(.semibold)
                        .padding(.top, 10)
                        .padding(.bottom, 2)
                    Text(modelUser.contentUser.lastName)
                        .foregroundColor(Color.black)
                        .font(.system(size: 16))
                        .fontWeight(.semibold)
                        .padding(.top, 10)
                        .padding(.bottom, 2)
                }
                

                NavigationLink("Cerrar Sesión", destination: Example2View())
                    .foregroundColor(TitleBarColor.TitleBarColor)
                    .font(.system(size: 13))
                    .fontWeight(.bold)
                    .padding(.top, 4)

                // Aquí están los dos nuevos botones
                HStack {
                    Button(action: {
                        // Acción del primer botón
                    }) {
                        Text("Mis Favoritos")
                            .foregroundColor(.white)
                            .padding(.vertical, 16)
                            .padding(.horizontal)
                            .frame(maxWidth: .infinity)
                            .background(TitleBarColor.TitleBarColor)
                            .cornerRadius(8)
                    }
                    .padding(.trailing, 4)
                    Button(action: {
                        // Acción del segundo botón
                    }) {

                        NavigationLink(destination:  ProfileInformationView(modelUser: UserViewModel())) {
                               Text("Mis Datos")
                                .foregroundColor(.white)
                                .padding(.vertical, 16)
                                .padding(.horizontal)
                                .frame(maxWidth: .infinity)
                                .background(TitleBarColor.TitleBarColor)
                                .cornerRadius(8)
                           }
                    }
                    .padding(.leading, 4) // Añade padding para crear espacio entre los botones
                }
                .padding(.horizontal, 40) // Añade padding horizontal para que los botones no lleguen hasta el borde de la vista
                .padding(.top, 24) // Reduciendo el padding top para acercar los botones

                Spacer()
            }
            .padding(.top, 70)
            .onAppear {
                Task {
                    await modelUser.fetchUserById(idUser: "abcd-1234-efgh-5679")
                }
            }
    }
        .onAppear {
            Task {
                // Realizar una nueva solicitud para obtener los datos actualizados del usuario
                do {
                    await modelUser.fetchUserById(idUser: "abcd-1234-efgh-5679")
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
