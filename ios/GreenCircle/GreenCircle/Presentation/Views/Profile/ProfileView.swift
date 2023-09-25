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
        
        
      NavigationView {
        ZStack {
          // Title Bar
          VStack {
            
            TitleBarView(
              title: "Mi Perfil",
              leftIcon: nil,
              rightIcon: "person.fill",
              leftDestination: {  },
              rightDestination: { EditProfileView(modelUser: UserViewModel()) }
            )
            .frame(height: 10)
            .offset(y: -60)
            .navigationBarBackButtonHidden(true)
            Spacer() // Esto empuja el TitleBarView hacia arriba
          }
          //----------------------Perfil-------------------------------
          VStack {
            
            //Imagen provicional
            Image("Sun")
              .resizable() // Hacer que la imagen sea redimensionable
              .frame(width: 100, height: 100)
            
            HStack {
              //Nombre del usuario
              Text(modelUser.contentUser.firstName)
                .foregroundColor(Color.black)
                .font(.system(size: 16))
                .fontWeight(.semibold)
                .padding(.top, 10)
                .padding(.bottom, 2)
              //Apellido del Usuario
              Text(modelUser.contentUser.lastName)
                .foregroundColor(Color.black)
                .font(.system(size: 16))
                .fontWeight(.semibold)
                .padding(.top, 10)
                .padding(.bottom, 2)
            }
            
            //Bot{on cerrar sesión con navegaci{on provicional
            NavigationLink("Cerrar Sesión", destination: Example2View())
              .foregroundColor(TitleBarColor.TitleBarColor)
              .font(.system(size: 13))
              .fontWeight(.bold)
              .padding(.top, 4)
            
            //----------------------Botones------------------------------
            HStack {
              Button(action: {
                // Implementación futura
              }) {
                Text("Mis Favoritos")
                  .foregroundColor(.white)
                  .padding(.vertical, 12)
                  .padding(.horizontal)
                  .frame(maxWidth: .infinity)
                  .background(TitleBarColor.TitleBarColor)
                  .cornerRadius(8)
              }
              .padding(.trailing, 10)
              
              NavigationLink(destination:  EditProfileView(modelUser: UserViewModel())) {
                Text("Editar perfil")
                  .foregroundColor(.white)
                  .padding(.vertical, 12)
                  .padding(.horizontal)
                  .frame(maxWidth: .infinity)
                  .background(TitleBarColor.TitleBarColor)
                  .cornerRadius(8)
              }.padding(.leading,10) // Añade padding para crear espacio entre los botones
              
              
            }
            .padding(.horizontal, 40) // Añade padding horizontal para que los botones no lleguen hasta el borde de la vista
            .padding(.top, 24) // Reduciendo el padding top para acercar los botones
            
            Spacer()
            
            //--------------------Seccón de Reseñas-----------------------------------------
            Text("Reseñas Escritas (0)")
              .font(.system(size: 20))
              .fontWeight(.bold)
              .padding(.top, 32)
              .padding(.leading)
              .foregroundColor(.black)
              .frame(maxWidth: .infinity, alignment: .leading)
            ScrollView{
              //Aquí irán las tarjetas de reseñas
            }
          }
          .padding(.top, 70)
          .onAppear {
            Task {
              await modelUser.fetchUserById(idUser: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b8")
            }
          }
          
          
        }
        
        
        
        
        .onAppear {
          Task {
            // Nueva solicitud para obtener los datos actualizados del usuario
            do {
              await modelUser.fetchUserById(idUser: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b8")
            }
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
